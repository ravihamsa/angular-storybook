import type { Preview } from '@storybook/angular';
import '!style-loader!css-loader!sass-loader!../src/styles.css';
import '!style-loader!css-loader!sass-loader!../public/assets/icon-font.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
