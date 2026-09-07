import { addons } from 'storybook/manager-api';
import { create } from 'storybook/theming';

const adharTheme = create({
  base: 'light',
  brandTitle: 'Adhar UI',
  brandUrl: 'https://www.adhar.io',
  brandImage: './branding/adhar-logo-horizontal.svg',
  brandTarget: '_self',

  // Brand palette — Blue → Indigo → Violet
  colorPrimary: '#6366F1',
  colorSecondary: '#8B5CF6',
});

addons.setConfig({
  theme: adharTheme,
});
