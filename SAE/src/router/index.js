import { createRouter, createWebHistory } from 'vue-router'
import Programmation from "@/components/Programmation.vue";
import Billetterie  from "@/components/Billetterie.vue";
import Main  from "@/components/Main.vue";
import Profile from "@/components/Profile.vue";
import Panier from "@/components/Panier.vue";
import Stands from "@/components/Stands.vue";
import ClassementHub from "@/components/ClassementHub.vue";
import ClassementIndividuel from "@/components/ClassementIndividuel.vue";
import ClassementEquipe from "@/components/ClassementEquipe.vue";
import ClassementLeaderboard from "@/components/ClassementLeaderboard.vue";
import Payment from "@/components/Payment.vue";
import Map from "@/components/Map.vue"
import Login from "@/components/Login.vue"
import Register from "@/components/Register.vue"
import OrganisateurStands from "@/components/OrganisateurStands.vue"
import OrganisateurDemande from "@/components/OrganisateurDemande.vue"
import GererPresta from "@/components/GererPresta.vue"
import RequestPresta from "@/components/RequestPresta.vue"
import { useUserStore } from '@/stores/user.js'

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
        path: '/payment',
        name: 'payment',
        component: Payment,
        meta: { titleKey: 'pageTitlePayment' }
    },
    {
        path: '/stands',
        name: 'stands',
        component: Stands,
        meta: { titleKey: 'pageTitleStands' }
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
        path: '/classements',
        name: 'classements',
        component: ClassementHub,
        meta: { titleKey: 'pageTitleClassements' }
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
    },
    {
        path: '/map',
        name : 'map',
        component : Map,
        meta: { titleKey: 'map' }
    }
    ,
    {
        path: '/login',
        name: 'login',
        component: Login,
        meta: { titleKey: 'login' }
    }
    ,
    {
        path: '/register',
        name: 'register',
        component: Register,
        meta: { titleKey: 'register' }
    },
    {
        path: '/organisateur',
        name: 'organisateur',
        component: OrganisateurStands,
        meta: { titleKey: 'pageTitleOrganisateur', requiresAdmin: true }
    },
    {
        path: '/organisateur/demande/:standId',
        name: 'organisateur-demande',
        component: OrganisateurDemande,
        meta: { titleKey: 'pageTitleOrganisateurDemande', requiresAdmin: true }
    },
    {
        path: '/admin/prestataires',
        name: 'gerer-presta',
        component: GererPresta,
        meta: { titleKey: 'pageTitleAdminPrestataires', requiresAdmin: true }
    },
    {
        path: '/demande-prestataire',
        name: 'demande-prestataire',
        component: RequestPresta,
        meta: { titleKey: 'pageTitleDemandePrestataire' }
    }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
})

router.beforeEach(async (to, from, next) => {
    const requiresAdmin = to.matched.some(route => route.meta?.requiresAdmin)
    if (!requiresAdmin) {
        return next()
    }

    const userStore = useUserStore()
    await userStore.hydrateSession()

    if (userStore.currentUser?.role === 'admin') {
        return next()
    }

    next({ name: 'login', query: { redirect: to.fullPath, reason: 'admin' } })
})

export default router
