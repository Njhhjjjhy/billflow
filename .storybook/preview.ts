import type { Preview } from '@storybook/nextjs-vite';
import '../src/app/globals.css';
import theme from './theme';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
      expanded: true,
    },
    docs: {
      toc: true,
      theme,
    },
    options: {
      storySort: {
        order: [
          'Getting Started',
          ['Introduction'],
          'Foundations',
          ['Colors', 'Typography', 'Spacing', 'Shadows'],
          'Guidelines',
          ['Philosophy', 'Accessibility'],
          'Components',
          ['Button', 'Input', 'Select', 'Checkbox', 'Textarea', 'Card', 'Badge', 'Table', 'Modal', 'Toast', 'Skeleton'],
          '*',
        ],
      },
    },
  },
};

export default preview;
