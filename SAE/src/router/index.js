import { createRouter, createWebHistory } from 'vue-router'
import Programmation from "@/components/Programmation.vue";
import Billetterie  from "@/components/Billetterie.vue";

const routes = [
    {
        path: '/user/programation',
        name: 'programmation',
        component: Programmation
    },
    {
        path: '/shop/billetterie',
        name: 'billetterie',
        component: Billetterie
    }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
})

export default router
