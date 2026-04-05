/** @type {import('@builder.io/mitosis').MitosisConfig} */
module.exports = {
  files: 'src/components/**/*.lite.tsx',
  targets: ['react', 'vue', 'solid', 'svelte', 'angular'],
  commonOptions: {
    typescript: true,
  },
  options: {
    react: {
      typescript: true,
      stylesType: 'className',
      stateType: 'useState',
    },
    vue: {
      typescript: true,
      api: 'composition',
      defineComponent: true,
    },
    angular: {
      typescript: true,
      standalone: true,
    },
    solid: {
      typescript: true,
      stylesType: 'className',
    },
    svelte: {
      typescript: true,
    },
  },
};
