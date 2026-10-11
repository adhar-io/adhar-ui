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
    deno run -A npm:@builder.io/mitosis-cli@0.14.0 compile -t "$target" --force --out-dir "$OUT_DIR" --

  # Post-process: add @ts-nocheck to all generated files.
  #
  # No `sed -i`. GNU sed takes the suffix ATTACHED (`-i.bak`) and BSD/macOS sed
  # takes it as a SEPARATE argument (`-i ''`), so the macOS form handed to GNU
  # makes the empty string the script and the real script a filename. That is
  # exactly how this failed in CI while working on a developer's Mac:
  #   sed: can't read 1s|^|// @ts-nocheck\n|: No such file or directory
  # Rewriting through a temp file needs no dialect at all, and `printf` + `cat`
  # says "prepend a line" more plainly than a sed address ever did.
  #
  # `\( -o \)` is parenthesised: `-name A -o -name B` without them binds the
  # implicit action to only part of the expression on some find implementations.
  # `-print0`/`read -r -d ''` so a path containing a space or backslash survives.
  find "$OUT_DIR" \( -name '*.tsx' -o -name '*.ts' \) -print0 | while IFS= read -r -d '' f; do
    if ! head -1 "$f" | grep -q '@ts-nocheck'; then
      { printf '// @ts-nocheck\n'; cat "$f"; } > "$f.tmp" && mv "$f.tmp" "$f"
    fi
  done

  # React: inject useLocalProxy import for stateful components
  if [ "$target" = "react" ]; then
    grep -rl 'useLocalProxy' "$OUT_DIR" | while IFS= read -r f; do
      if ! grep -q 'import.*useLocalProxy.*runtime' "$f"; then
        # runtime.ts lives at <target>/src/runtime.ts; OUT_DIR is <target>/src/generated.
        # Count directory levels the file sits below OUT_DIR, then add one more
        # to climb from OUT_DIR up to <target>/src.
        REL="${f#"$OUT_DIR"/}"
        REL_DIR="$(dirname "$REL")"
        # `dirname` of a bare filename is ".", which `tr | wc -l` counts as ONE
        # directory level — so a component generated at the root of OUT_DIR got
        # `../../runtime.ts` and reached a directory above the package. Dormant
        # only because Mitosis writes into per-component subdirectories today.
        DIRS=0
        if [ "$REL_DIR" != "." ]; then
          DIRS=$(printf '%s\n' "$REL_DIR" | tr '/' '\n' | wc -l | tr -d ' ')
        fi
        REL_PREFIX=""
        for ((i=0; i<DIRS+1; i++)); do REL_PREFIX="../$REL_PREFIX"; done
        # Insert at line 2, after the @ts-nocheck line prepended above. Same
        # dialect-free rewrite as before: head/printf/tail instead of `sed -i`.
        { head -1 "$f"
          printf 'import { useLocalProxy } from "%sruntime.ts";\n' "$REL_PREFIX"
          tail -n +2 "$f"
        } > "$f.tmp" && mv "$f.tmp" "$f"
      fi
    done
  fi

  COUNT=$(find "$OUT_DIR" -type f | wc -l | tr -d ' ')
  echo "  -> $COUNT files"
done

echo "All frameworks compiled successfully."
