import { resolve } from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';
import del from 'rollup-plugin-delete';
import copy from 'rollup-plugin-copy';

export default defineConfig({
  optimizeDeps: {
    exclude: ['vue'],
  },
  build: {
    minify: false,
    sourcemap: false,
    outDir: 'dist',
    lib: {
      entry: 'src/index.ts',
      formats: ['es'],
    },
    rollupOptions: {
      external: ['vue', 'path', 'nuxt', 'nuxt/app', '#app', '@nuxt/kit'],
      input: {
        'vue-yandex-maps': resolve(__dirname, 'src/index.ts'),
        'plugins/nuxt2-module': resolve(__dirname, 'src/plugins/nuxt2-module'),
        'plugins/nuxt3-module': resolve(__dirname, 'src/plugins/nuxt3-module'),
        'plugins/nuxt3-plugin': resolve(__dirname, 'src/plugins/nuxt3-plugin'),
      },
      output: {
        format: 'es',
        esModule: true,
        globals: {
          vue: 'Vue',
        },
        entryFileNames: '[name].js',
      },
    },
  },
  plugins: [
    del({ targets: 'dist/*' }),
    vue(),
    dts(),
    copy({
      targets: [
        {
          src: ['../../README.md', '../../CHANGELOG.md', '../../LICENSE'],
          dest: './',
        },
        {
          src: ['./src/plugins/nuxt2-plugin.js'],
          dest: './dist/plugins',
        },
      ],
      hook: 'writeBundle',
    }),
  ],
});
