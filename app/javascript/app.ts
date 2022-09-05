import requireTransform from 'vite-plugin-require-transform'

export const App = {
    data() {

    },
    template: requireTransform('@/views/layouts/app.pug')
}