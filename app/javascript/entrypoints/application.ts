import { createApp } from 'vue'
import { createRouter,createWebHistory } from 'vue-router'
import { routes } from '@/javascript/routes'
import { Header } from '@/javascript/components/layouts/header'
import { Side } from '@/javascript/components/layouts/side'
import '@/javascript/stylesheets/application.sass'
import '@fortawesome/fontawesome-free/css/fontawesome.min.css'
import '@fortawesome/fontawesome-free/css/brands.min.css'
import '@fortawesome/fontawesome-free/css/solid.min.css'
import '@fortawesome/fontawesome-free/css/regular.min.css'

const router = createRouter({
    history: createWebHistory(),
    routes,
})
const app = createApp({
    components: { Side, Header },
    template: require('@/views/layouts/app.pug')
})
app.use(router)
app.mount('#alfred')

console.log('Vite ⚡️ Rails')
console.log('Visit the guide for more information: ', 'https://vite-ruby.netlify.app/guide/rails')
