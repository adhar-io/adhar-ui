/**
 * Mitosis build config for @adhar-ui/primitives.
 *
 * Compiles every `src/components/**\/*.lite.tsx` into each framework package
 * at `packages/<target>/src/generated/src/components/...`, emitting the
 * framework's native file type (.tsx, .vue, .svelte, .ts). Plain `.ts` files
 * next to the components (CVA styles and `_internal` helpers) are copied
 * alongside so relative imports keep resolving.
 *
 * Run through `scripts/compile.sh` (`deno task build`), not directly.
 */
/** @type {import('@builder.io/mitosis').MitosisConfig} */
module.exports = {
  files: 'src/components/**',
  exclude: ['src/components/**/*.a11y.ts'],
  dest: '..',
  getTargetPath: ({ target }) => `${target}/src/generated`,
  targets: ['react', 'vue', 'solid', 'svelte', 'angular'],
  options: {
    react: { typescript: true, stylesType: 'className' },
    // Options API: Mitosis 0.14's Composition API output shadows Vue's `ref`
    // import with same-named template refs and assigns to non-ref locals.
    vue: { typescript: true },
    solid: { typescript: true, stylesType: 'className' },
    svelte: { typescript: true },
    angular: { typescript: true, standalone: true },
  },
};
