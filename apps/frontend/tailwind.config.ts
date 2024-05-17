import type { Config } from 'tailwindcss';

const plugin = require('tailwindcss/plugin');

interface TailwindPluginHelper {
  addUtilities: (utilities: any, options?: any) => void;
}

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    '../../node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        denim: '#0B60B0',
        shakespeare: '#40A2D8',
        parchment: '#F0EDCF',
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }: TailwindPluginHelper) {
      addUtilities({
        '.scrollbar-hide': {
          /* IE and Edge */
          '-ms-overflow-style': 'none',

          /* Firefox */
          'scrollbar-width': 'none',

          /* Safari and Chrome */
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        },
      });
    }),
  ],
};
export default config;
