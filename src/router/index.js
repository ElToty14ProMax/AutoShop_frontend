import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const routes = [
  { path: '/', component: () => import('../views/HomeView.vue') },
  { path: '/catalog', component: () => import('../views/CatalogView.vue') },
  { path: '/cart', component: () => import('../views/CartView.vue'), meta: { auth: true, role: ['client','admin','manicurist'] } },
  { path: '/checkout', component: () => import('../views/CheckoutView.vue'), meta: { auth: true, role: ['client','admin','manicurist'] } },
  { path: '/orders', component: () => import('../views/OrdersView.vue'), meta: { auth: true } },
  { path: '/addresses', component: () => import('../views/AddressesView.vue'), meta: { auth: true } },
  { path: '/login', component: () => import('../views/LoginView.vue') },
  { path: '/register', component: () => import('../views/RegisterView.vue') },
  ]

const router = createRouter({ history: createWebHistory(), routes })

router.beforeEach((to) => {
  const auth = useAuthStore()
  if (to.meta?.auth && !auth.token) return { path: '/login' }
  if (to.meta?.role && !to.meta.role.includes(auth.user?.role)) return { path: '/' }
})

export default router


