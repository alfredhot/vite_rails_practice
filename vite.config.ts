import { defineConfig } from 'vite'
import RubyPlugin from 'vite-plugin-ruby'
import vue from '@vitejs/plugin-vue'
import tsconfigPaths from 'vite-tsconfig-paths'
import pug from 'rollup-plugin-pug'
import requireTransform from 'vite-plugin-require-transform'
import { createHtmlPlugin } from 'vite-plugin-html'


const path = require('path')
export default defineConfig({
    plugins: [
        RubyPlugin(),
        pug({ staticPattern: /\b/ }),
        vue(),
        requireTransform({fileRegex: /.ts$|.tsx$|.js$|.jsx$|.pug$/}),
        tsconfigPaths(),
        createHtmlPlugin({
            minify: true
        }),
    ],
    resolve: {
        extensions: ['.css', '.sass', '.scss', '.html', '.tsx', '.ts', '.js', '.pug', 'ttf', 'woff'],
        alias: {
            'vue': 'vue/dist/vue.esm-bundler.js',
            "@": path.resolve(__dirname, 'app/'),
            "@vendor": path.resolve(__dirname, 'vendor/'),
            '$': 'jquery',
        }
    },
    server: {
        strictPort: true
    }
})
