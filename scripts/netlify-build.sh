#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────────────
# Netlify production build for Adhar UI.
#
# Assembles a single static site into ./dist:
#   /            → docs      (apps/docs)          flagship marketing + docs
#   /builder/    → builder   (apps/builder)       visual page builder
#   /storybook/  → storybook (apps/storybook)     component workshop
#
# Runs on Netlify; also runnable locally with `bash scripts/netlify-build.sh`.
# ─────────────────────────────────────────────────────────────────────────────
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

# ── 1. Ensure Deno is available (pin version for reproducible builds) ─────────
export DENO_INSTALL="${DENO_INSTALL:-$HOME/.deno}"
export PATH="$DENO_INSTALL/bin:$PATH"
DENO_VERSION="${DENO_VERSION:-v2.6.0}"

if ! command -v deno >/dev/null 2>&1; then
  echo "→ Installing Deno $DENO_VERSION"
  curl -fsSL https://deno.land/install.sh | sh -s "$DENO_VERSION"
fi
echo "→ Using $(deno --version | head -1)"

# ── 2. Build each app ─────────────────────────────────────────────────────────
echo "→ Building docs"
( cd apps/docs && deno task build )

echo "→ Building builder"
( cd apps/builder && deno task build )

echo "→ Building storybook"
# Storybook is npm-managed. Build with npm/node directly — NOT `deno task`,
# whose npx shim resolves into the shared .deno tree and picks up a conflicting
# storybook version. `npm install` (not `ci`) lets npm resolve the correct
# platform-native rollup/esbuild binaries for the build host.
( cd apps/storybook && npm install --no-audit --no-fund && npm run build )

# ── 3. Assemble the unified publish directory ────────────────────────────────
echo "→ Assembling ./dist"
rm -rf dist
mkdir -p dist/builder dist/storybook

cp -R apps/docs/dist/.                    dist/
cp -R apps/builder/dist/.                 dist/builder/
cp -R apps/storybook/storybook-static/.   dist/storybook/

echo "✓ Build complete — publish directory: ./dist"
