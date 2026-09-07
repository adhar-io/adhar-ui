import type { Preview } from '@storybook/react-vite';
import React from 'react';
// Storybook's own hook — works inside decorators (React's hooks do not, since a
// decorator body is not a component render, which throws a null-dispatcher error).
import { useEffect } from 'storybook/preview-api';
import '../src/globals.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: 'centered',
    backgrounds: { disabled: true },
    options: {
      storySort: {
        order: [
          'Components',
          [
            'Form Controls',
            'Display',
            'Layout & Feedback',
            'Navigation',
            'Overlay',
            'Composite',
            'Enterprise',
            'AI',
          ],
          'Blocks',
        ],
      },
    },
  },
  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Global theme',
      toolbar: {
        icon: 'circlehollow',
        items: [
          { value: 'light', icon: 'sun', title: 'Light' },
          { value: 'dark', icon: 'moon', title: 'Dark' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: 'light',
  },
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme || 'light';
      const isDark = theme === 'dark';

      // Apply theme to document for global CSS variables
      useEffect(() => {
        document.documentElement.classList.toggle('dark', isDark);
        document.body.style.backgroundColor = isDark ? 'hsl(240 10% 3.9%)' : 'hsl(0 0% 100%)';
        document.body.style.color = isDark ? 'hsl(0 0% 98%)' : 'hsl(240 10% 3.9%)';
      }, [isDark]);

      return React.createElement(
        'div',
        {
          className: `${isDark ? 'dark' : ''} min-h-[200px] flex items-center justify-center p-6`,
          style: {
            backgroundColor: isDark ? 'hsl(240, 10%, 3.9%)' : 'hsl(0, 0%, 100%)',
            color: isDark ? 'hsl(0, 0%, 98%)' : 'hsl(240, 10%, 3.9%)',
            borderRadius: '8px',
          },
        },
        React.createElement(Story),
      );
    },
  ],
};

export default preview;
