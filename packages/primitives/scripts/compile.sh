#!/bin/bash
# Compile Mitosis primitives to all framework targets
# Usage: deno task build (from packages/primitives)

set -e
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PRIMITIVES_DIR="$(dirname "$SCRIPT_DIR")"
PACKAGES_DIR="$(dirname "$PRIMITIVES_DIR")"

cd "$PRIMITIVES_DIR"

TARGETS=("react" "vue" "solid" "svelte" "angular")

for target in "${TARGETS[@]}"; do
  OUT_DIR="$PACKAGES_DIR/$target/src/generated"
  echo "Compiling to $target..."
  rm -rf "$OUT_DIR"
  find src/components -name '*.lite.tsx' -print0 | xargs -0 \
    deno run -A npm:@builder.io/mitosis-cli compile -t "$target" --force --out-dir "$OUT_DIR" --

  # Post-process: add @ts-nocheck to all generated files
  find "$OUT_DIR" -name '*.tsx' -o -name '*.ts' | while read f; do
    if ! head -1 "$f" | grep -q '@ts-nocheck'; then
      sed -i '' '1s|^|// @ts-nocheck\n|' "$f"
    fi
  done

  # React: inject useLocalProxy import for stateful components
  if [ "$target" = "react" ]; then
    grep -rl 'useLocalProxy' "$OUT_DIR" | while read f; do
      if ! grep -q 'import.*useLocalProxy.*runtime' "$f"; then
        # Calculate relative path to runtime.ts from the file
        DEPTH=$(echo "$f" | sed "s|$OUT_DIR/||" | tr '/' '\n' | wc -l)
        REL_PREFIX=""
        for ((i=0; i<DEPTH; i++)); do REL_PREFIX="../$REL_PREFIX"; done
        sed -i '' "2s|^|import { useLocalProxy } from \"${REL_PREFIX}../../runtime.ts\";\n|" "$f"
      fi
    done
  fi

  COUNT=$(find "$OUT_DIR" -type f | wc -l | tr -d ' ')
  echo "  -> $COUNT files"
done

echo "All frameworks compiled successfully."
