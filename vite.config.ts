import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import commonjs from 'vite-plugin-commonjs'
import Icons from 'unplugin-icons/vite'

export default defineConfig({
	plugins: [
        sveltekit(),
        commonjs(),
        Icons({
            compiler: 'svelte',
        }),
    ],
});
