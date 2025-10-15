import { createRouter, createWebHistory } from 'vue-router'
import Programmation from "@/components/Programmation.vue";

const routes = [
    {
        path: '/user/programation',
        name: 'programmation',
        component: Programmation
    }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
})

export default router
