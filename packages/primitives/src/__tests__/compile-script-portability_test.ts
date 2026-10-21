import { assertEquals } from 'jsr:@std/assert@^1.0.13';

/**
 * The build scripts must run on Linux, not only on a developer's Mac.
 *
 * `scripts/compile.sh` used BSD/macOS in-place sed:
 *
 *   sed -i '' '1s|^|// @ts-nocheck\n|' "$f"
 *
 * GNU sed takes the backup suffix ATTACHED (`-i.bak`); BSD takes it as a
 * SEPARATE argument. So the macOS form handed to GNU sed makes the empty string
 * the script and the real script a filename, and the release pipeline died with
 *
 *   sed: can't read 1s|^|// @ts-nocheck\n|: No such file or directory
 *
 * while the same script worked locally. It is deterministic, so the pipeline's
 * task retries could not help — it failed identically on every attempt.
 *
 * Asserted against the source because that is where the mistake is made, and
 * because the alternative is discovering it in CI on a Linux runner nobody has
 * in front of them.
 */
const script = await Deno.readTextFile(
  new URL('../../scripts/compile.sh', import.meta.url),
);

/** Lines with the comments stripped, so prose about `sed -i` is not a match. */
const codeLines = script
  .split('\n')
  .map((l) => l.replace(/#.*$/, ''))
  .filter((l) => l.trim() !== '');

Deno.test('compile.sh uses no BSD-only in-place sed', () => {
  // `sed -i ''` / `sed -i ""` — portable nowhere.
  const bsd = codeLines.filter((l) => /\bsed\b[^|]*-i\s+(''|"")/.test(l));
  assertEquals(
    bsd,
    [],
    "BSD-only `sed -i ''` breaks on GNU sed, which is what CI runs",
  );
});

Deno.test('compile.sh uses no bare in-place sed either', () => {
  // A bare `sed -i` is GNU-only and would break the macOS developer loop, so
  // neither dialect is acceptable: rewrite through a temp file instead.
  const gnu = codeLines.filter((l) => /\bsed\b[^|]*-i(\s|$)/.test(l));
  assertEquals(
    gnu,
    [],
    'in-place sed is not portable in either direction; write to a temp file and mv',
  );
});

Deno.test('compile.sh still performs the post-processing step', () => {
  // The portability fix must not have quietly dropped the work the sed calls
  // were doing — a script that edits nothing also contains no sed.
  assertEquals(
    script.includes('// @ts-nocheck'),
    true,
    'compile.sh must still prepend @ts-nocheck to generated TypeScript',
  );
});

Deno.test('compile.sh uses mitosis build, not per-file compile', () => {
  // `mitosis compile` emits every target with a .lite.tsx extension (Vue and
  // Svelte SFCs in .tsx files) and does not copy the styles files the
  // components import.
  const usesBuild = codeLines.some((l) => /mitosis-cli@[\d.]+ build\b/.test(l));
  const usesCompile = codeLines.some((l) => /mitosis-cli@[\d.]+ compile\b/.test(l));
  assertEquals([usesBuild, usesCompile], [true, false]);
});
