import { createRouter, createWebHistory } from 'vue-router'
import Programmation from "@/components/Programmation.vue";
import Billetterie  from "@/components/Billetterie.vue";
import Main  from "@/components/Main.vue";
import Profile from "@/components/Profile.vue";
import Panier from "@/components/Panier.vue";
import ClassementIndividuel from "@/components/ClassementIndividuel.vue";
import ClassementEquipe from "@/components/ClassementEquipe.vue";
import ClassementLeaderboard from "@/components/ClassementLeaderboard.vue";

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
        path: '/panier',
        name: 'panier',
        component: Panier,
        meta: { titleKey: 'pageTitlePanier' }
    },
    {
        path: '/',
        name: 'accueil',
        component: Main,
        meta: { titleKey: 'pageTitleAccueil' }
    },
    {
        path: '/profile/:userId',
        name: 'profile',
        component: Profile,
        meta: { titleKey: 'pageTitleProfile' }
    },
    {
        path: '/classements/individuels',
        name: 'classement-individuel',
        component: ClassementIndividuel,
        meta: { titleKey: 'pageTitleClassementIndividuel' }
    },
    {
        path: '/classements/equipes',
        name: 'classement-equipe',
        component: ClassementEquipe,
        meta: { titleKey: 'pageTitleClassementEquipe' }
    },
    {
        path: '/classements/leaderboard',
        name: 'classement-leaderboard',
        component: ClassementLeaderboard,
        meta: { titleKey: 'pageTitleLeaderboard' }
    }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
})

export default router
