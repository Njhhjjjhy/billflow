import { create } from 'storybook/theming';

export default create({
  base: 'light',

  // Brand
  brandTitle: 'Billflow Design System',
  brandUrl: '/',
  brandTarget: '_self',

  // Typography
  fontBase: '"Space Grotesk", "Noto Sans TC", system-ui, sans-serif',
  fontCode: '"Space Mono", monospace',

  // Colors - Neo-brutalist palette
  colorPrimary: '#2563EB',
  colorSecondary: '#0F172A',

  // UI
  appBg: '#F8FAFC',
  appContentBg: '#FFFFFF',
  appPreviewBg: '#FFFFFF',
  appBorderColor: '#000000',
  appBorderRadius: 12,

  // Text colors
  textColor: '#0F172A',
  textInverseColor: '#FFFFFF',
  textMutedColor: '#475569',

  // Toolbar
  barTextColor: '#475569',
  barSelectedColor: '#2563EB',
  barHoverColor: '#2563EB',
  barBg: '#FFFFFF',

  // Form colors
  inputBg: '#FFFFFF',
  inputBorder: '#000000',
  inputTextColor: '#0F172A',
  inputBorderRadius: 8,

  // Button
  buttonBg: '#2563EB',
  buttonBorder: '#000000',

  // Boolean
  booleanBg: '#F1F5F9',
  booleanSelectedBg: '#2563EB',
});
