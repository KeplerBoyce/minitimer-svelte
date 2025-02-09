import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],

  theme: {
    extend: {
      rotate: {
        '60': '60deg',
      },
    },
  },

  plugins: []
} satisfies Config;
