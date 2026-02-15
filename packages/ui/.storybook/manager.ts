import { addons } from 'storybook/manager-api';
import theme from './theme';

addons.setConfig({
  theme,
  title: 'Billflow Design System',
  showOnboarding: false,
  sidebar: {
    showRoots: true,
    collapsedRoots: [],
    renderLabel: (item) => {
      return item.name;
    },
  },
  toolbar: {
    zoom: { hidden: false },
    eject: { hidden: false },
    copy: { hidden: false },
    fullscreen: { hidden: false },
  },
});
