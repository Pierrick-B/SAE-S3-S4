import { createRouter, createWebHistory } from 'vue-router'
import Programmation from "@/components/Programmation.vue";
import Billetterie  from "@/components/Billetterie.vue";
import Main  from "@/components/Main.vue";

const routes = [
    {
        path: '/programmation',
        name: 'programmation',
        component: Programmation,
        meta: { titleKey: 'pageTitleProgrammation' }
    },
    {
        path: '/shop/billetterie',
        name: 'billetterie',
        component: Billetterie,
        meta: { titleKey: 'pageTitleBilletterie' }
    },
    {
        path: '/',
        name: 'accueil',
        component: Main,
        meta: { titleKey: 'pageTitleAccueil' }
    }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
})

export default router
