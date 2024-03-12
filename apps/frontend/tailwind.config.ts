import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
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
  plugins: [],
};
export default config;
