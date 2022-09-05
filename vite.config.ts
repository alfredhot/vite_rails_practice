import { defineConfig } from 'vite'
import RubyPlugin from 'vite-plugin-ruby'
import vue from '@vitejs/plugin-vue'
import tsconfigPaths from 'vite-tsconfig-paths'
import pug from 'rollup-plugin-pug'
import requireTransform from 'vite-plugin-require-transform'

const path = require('path')
export default defineConfig({
    plugins: [
        RubyPlugin(),
        vue(),
        requireTransform({fileRegex: /.ts$|.tsx$|.js$|.jsx$|.pug$/}),
        tsconfigPaths(),
        pug({staticPattern: /\S/}),
    ],
    resolve: {
        extensions: ['.css', '.sass', '.scss', '.html', '.tsx', '.ts', '.js', '.pug', 'ttf', 'woff'],
        alias: {
            'vue': 'vue/dist/vue.esm-bundler.js',
            "@": path.resolve(__dirname, 'app/'),
        }
    }
})
