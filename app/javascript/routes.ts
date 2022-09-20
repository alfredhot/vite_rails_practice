import { MainIndex } from '@/javascript/components/main'
import { AdminMenuIndex } from '@/javascript/components/admin/menu'
import { AdminProfileIndex } from '@/javascript/components/admin/profile'
import { DevIndex } from '@/javascript/components/dev'

export const routes = [
    { path: '/', component: MainIndex },
    { path: '/admin/profile', component: AdminProfileIndex },
    { path: '/admin/menu', component: AdminMenuIndex },
    { path: '/dev', component: DevIndex }
]