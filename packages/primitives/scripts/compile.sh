#!/bin/bash
# Compile Mitosis primitives to all framework targets.
# Usage: deno task build (from packages/primitives)
#
# Uses `mitosis build` with mitosis.config.cjs, which emits each framework's
# native file type (.tsx / .vue / .svelte / .ts) into
# packages/<target>/src/generated and copies the plain .ts files (CVA styles,
# _internal helpers) next to them. The older per-file `mitosis compile` path
# kept the .lite.tsx extension for every target, so Vue and Svelte output was
# unusable.

set -e
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PRIMITIVES_DIR="$(dirname "$SCRIPT_DIR")"
PACKAGES_DIR="$(dirname "$PRIMITIVES_DIR")"

cd "$PRIMITIVES_DIR"

TARGETS=("react" "vue" "solid" "svelte" "angular")

for target in "${TARGETS[@]}"; do
  rm -rf "$PACKAGES_DIR/$target/src/generated"
done

deno run -A npm:@builder.io/mitosis-cli@0.14.0 build --config mitosis.config.cjs

for target in "${TARGETS[@]}"; do
  OUT_DIR="$PACKAGES_DIR/$target/src/generated"

  # Post-process: add @ts-nocheck to generated TypeScript files for the
  # non-React targets. Their output is not type-checked here (no Vue / Svelte /
  # Angular compiler in this workspace) and Mitosis drops some type
  # information. React output is left checked: `deno task check` type-checks
  # it through packages/react/src/index.ts, which catches real codegen bugs
  # such as a store method shadowed by a local of the same name.
  #
  # No `sed -i`. GNU sed takes the suffix ATTACHED (`-i.bak`) and BSD/macOS sed
  # takes it as a SEPARATE argument (`-i ''`), so the macOS form handed to GNU
  # makes the empty string the script and the real script a filename. That is
  # exactly how this failed in CI while working on a developer's Mac:
  #   sed: can't read 1s|^|// @ts-nocheck\n|: No such file or directory
  # Rewriting through a temp file needs no dialect at all, and `printf` + `cat`
  # says "prepend a line" more plainly than a sed address ever did.
  #
  # Only .ts/.tsx: a comment before <template> or <script> would corrupt a
  # .vue or .svelte file.
  #
  # `\( -o \)` is parenthesised: `-name A -o -name B` without them binds the
  # implicit action to only part of the expression on some find implementations.
  # `-print0`/`read -r -d ''` so a path containing a space or backslash survives.
  [ "$target" = "react" ] || find "$OUT_DIR" \( -name '*.tsx' -o -name '*.ts' \) -print0 | while IFS= read -r -d '' f; do
    if ! head -1 "$f" | grep -q '@ts-nocheck'; then
      { printf '// @ts-nocheck\n'; cat "$f"; } > "$f.tmp" && mv "$f.tmp" "$f"
    fi
  done

  # React: its onFocus / onBlur already bubble (they are built on focusin /
  # focusout) and it has no onFocusIn / onFocusOut props. The sources use the
  # bubbling names because Vue, Svelte, Angular and Solid need them to see
  # focus moving inside a wrapper, so map them back for React only.
  if [ "$target" = "react" ]; then
    grep -rlE 'onFocus(In|Out)=' "$OUT_DIR" | while IFS= read -r f; do
      sed -e 's/onFocusIn=/onFocus=/g' -e 's/onFocusOut=/onBlur=/g' "$f" > "$f.tmp" && mv "$f.tmp" "$f"
    done
  fi

  COUNT=$(find "$OUT_DIR" -type f | wc -l | tr -d ' ')
  echo "  $target -> $COUNT files"
done

echo "All frameworks compiled successfully."
