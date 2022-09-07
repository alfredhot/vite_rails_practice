import { defineConfig } from 'vite'
import RubyPlugin from 'vite-plugin-ruby'
import vue from '@vitejs/plugin-vue'
import tsconfigPaths from 'vite-tsconfig-paths'
import pug from 'rollup-plugin-pug'
import requireTransform from 'vite-plugin-require-transform'
import vuePugPlugin from 'vite-plugin-pug'
import { createHtmlPlugin } from 'vite-plugin-html'
import vitePluginRequire from 'vite-plugin-require'


const path = require('path')
export default defineConfig({
    plugins: [
        RubyPlugin(),
        pug({}),
        vue(
            {
                template: {
                    preprocessOptions: { // 'preprocessOptions' is passed through to the pug compiler
                        plugins: [{
                            preCodeGen: vuePugPlugin
                        }]
                    }
                }
            }
        ),
        vitePluginRequire({fileRegex: /.ts$|.tsx$|.js$|.pug$/}),
        // requireTransform({fileRegex: /.ts$|.tsx$|.js$|.jsx$|.pug$/}),

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
            "require": 'vite-plugin-require-transform/dist/index.js'
        }
    }
})
