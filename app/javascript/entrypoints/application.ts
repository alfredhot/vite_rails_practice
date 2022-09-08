import { createApp } from 'vue'
import { createRouter,createWebHistory } from 'vue-router'
import { routes } from '@/javascript/routes'
import { Header } from '@/javascript/components/layouts/header'
import { Side } from '@/javascript/components/layouts/side'
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
