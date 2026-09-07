import { fileURLToPath } from "node:url";
import { dirname } from "node:path";
import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: [
    '../stories/**/*.mdx',
    '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  addons: [
    getAbsolutePath("@storybook/addon-a11y"),
  ],
  staticDirs: ['../public'],
  managerHead: (head) => `
    ${head}
    <link rel="icon" type="image/svg+xml" href="./favicon.svg" />
  `,
  framework: {
    name: getAbsolutePath("@storybook/react-vite"),
    options: {},
  },
  // Tailwind v4 is wired via its dedicated Vite plugin (replaces the old
  // PostCSS setup). Loaded lazily so the config stays ESM-clean.
  viteFinal: async (cfg) => {
    const { default: tailwindcss } = await import('@tailwindcss/vite');
    cfg.plugins = cfg.plugins || [];
    cfg.plugins.push(tailwindcss());
    return cfg;
  },
};

export default config;

function getAbsolutePath(value: string): any {
  return dirname(fileURLToPath(import.meta.resolve(`${value}/package.json`)));
}
