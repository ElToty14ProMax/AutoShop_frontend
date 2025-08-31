<template>
  <nav class="bg-gray-900 shadow-lg border-b border-gray-700 sticky top-0 z-50">
    <div class="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
      <!-- Logo y nombre -->
      <div class="flex items-center gap-3">
        <div class="bg-blue-600 p-2 rounded-lg shadow-lg">
          <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <RouterLink
          class="font-bold text-xl text-white hover:text-blue-400 transition-colors"
          to="/">
          AutoParts
        </RouterLink>
      </div>

      <!-- Enlaces de navegación - Desktop -->
      <div class="hidden md:flex items-center gap-6">
        <RouterLink
          class="text-gray-300 hover:text-white transition-colors font-medium relative group"
          to="/catalog"
          active-class="text-blue-400">
          Catálogo
          <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 transition-all group-hover:w-full"></span>
        </RouterLink>
        <RouterLink
          v-if="isAuthenticated"
          class="text-gray-300 hover:text-white transition-colors font-medium relative group"
          to="/orders"
          active-class="text-blue-400">
          Mis Órdenes
          <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 transition-all group-hover:w-full"></span>
        </RouterLink>
        <RouterLink
          v-if="isAdmin"
          class="text-gray-300 hover:text-white transition-colors font-medium relative group"
          to="/admin"
          active-class="text-blue-400">
          Admin
          <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 transition-all group-hover:w-full"></span>
        </RouterLink>
      </div>

      <!-- Área derecha: Usuario, carrito y botones -->
      <div class="flex items-center gap-4">
        <!-- Carrito con icono y contador -->
        <RouterLink
          v-if="isAuthenticated"
          to="/cart"
          class="relative flex items-center justify-center w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-full transition-all duration-300 group hover:scale-110">
          <svg class="w-5 h-5 text-gray-300 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4m-2.4 0L3 3m4 10v5a2 2 0 002 2h10a2 2 0 002-2v-5m-12 0h12m-12 0a2 2 0 00-2 2v3a2 2 0 002 2m10-7v7" />
          </svg>
          <!-- Contador de productos -->
          <span v-if="cartItemsCount > 0"
                class="absolute -top-2 -right-2 bg-blue-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
            {{ cartItemsCount > 99 ? '99+' : cartItemsCount }}
          </span>
        </RouterLink>

        <!-- Información del usuario autenticado - Desktop -->
        <div v-if="isAuthenticated" class="hidden lg:flex items-center gap-3">
          <div class="text-right">
            <div class="text-sm font-medium text-white">{{ auth.user?.name }}</div>
            <div class="text-xs text-gray-400 capitalize">{{ auth.user?.role }}</div>
          </div>
          <div class="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <span class="text-white text-sm font-bold">
              {{ auth.user?.name?.charAt(0)?.toUpperCase() }}
            </span>
          </div>
        </div>

        <!-- Botones para usuarios no autenticados -->
        <div v-if="!isAuthenticated" class="flex gap-2">
          <RouterLink
            class="px-4 py-2 border border-gray-600 text-gray-300 hover:text-white hover:border-gray-500 rounded-lg transition-all font-medium hover:scale-105"
            to="/register">
            Registrarse
          </RouterLink>
          <RouterLink
            class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all font-medium hover:scale-105 shadow-lg"
            to="/login">
            Entrar
          </RouterLink>
        </div>

        <!-- Botón de cerrar sesión - Desktop -->
        <button
          v-if="isAuthenticated"
          class="hidden sm:block px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-all font-medium hover:scale-105 shadow-lg"
          @click="logout">
          Salir
        </button>

        <!-- Menú hamburguesa - Mobile -->
        <button
          @click="toggleMobileMenu"
          class="md:hidden p-2 text-gray-300 hover:text-white transition-colors">
          <svg v-if="!showMobileMenu" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Menú móvil -->
    <div v-show="showMobileMenu" class="md:hidden bg-gray-800 border-t border-gray-700">
      <div class="px-4 py-3 space-y-3">
        <!-- Enlaces de navegación móvil -->
        <RouterLink
          @click="closeMobileMenu"
          class="block text-gray-300 hover:text-white transition-colors text-sm font-medium py-2"
          to="/catalog">
          Catálogo
        </RouterLink>
        <RouterLink
          v-if="isAuthenticated"
          @click="closeMobileMenu"
          class="block text-gray-300 hover:text-white transition-colors text-sm font-medium py-2"
          to="/orders">
          Mis Órdenes
        </RouterLink>
        <RouterLink
          v-if="isAdmin"
          @click="closeMobileMenu"
          class="block text-gray-300 hover:text-white transition-colors text-sm font-medium py-2"
          to="/admin">
          Administración
        </RouterLink>

        <!-- Carrito en móvil -->
        <RouterLink
          v-if="isAuthenticated"
          @click="closeMobileMenu"
          class="flex items-center gap-3 text-gray-300 hover:text-white transition-colors text-sm font-medium py-2"
          to="/cart">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4m-2.4 0L3 3m4 10v5a2 2 0 002 2h10a2 2 0 002-2v-5m-12 0h12m-12 0a2 2 0 00-2 2v3a2 2 0 002 2m10-7v7" />
          </svg>
          <span>Carrito</span>
          <span v-if="cartItemsCount > 0" class="bg-blue-600 text-white text-xs font-bold rounded-full px-2 py-1 ml-auto">
            {{ cartItemsCount }}
          </span>
        </RouterLink>

        <!-- Usuario autenticado en móvil -->
        <div v-if="isAuthenticated" class="border-t border-gray-700 pt-3 mt-3">
          <div class="flex items-center gap-3 mb-3">
            <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <span class="text-white font-bold">
                {{ auth.user?.name?.charAt(0)?.toUpperCase() }}
              </span>
            </div>
            <div>
              <div class="text-sm font-medium text-white">{{ auth.user?.name }}</div>
              <div class="text-xs text-gray-400 capitalize">{{ auth.user?.role }}</div>
            </div>
          </div>
          <button
            @click="logout"
            class="w-full px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors font-medium">
            Cerrar Sesión
          </button>
        </div>

        <!-- Enlaces para no autenticados en móvil -->
        <div v-else class="border-t border-gray-700 pt-3 mt-3 space-y-2">
          <RouterLink
            @click="closeMobileMenu"
            class="block w-full px-4 py-2 border border-gray-600 text-gray-300 hover:text-white hover:border-gray-500 rounded-lg transition-all font-medium text-center"
            to="/register">
            Registrarse
          </RouterLink>
          <RouterLink
            @click="closeMobileMenu"
            class="block w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all font-medium text-center"
            to="/login">
            Iniciar Sesión
          </RouterLink>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { useCartStore } from '../stores/cart'

const auth = useAuthStore()
const cart = useCartStore()
const router = useRouter()

// Estado para el menú móvil
const showMobileMenu = ref(false)

// Computed properties
const isAuthenticated = computed(() => !!auth.token)
const isAdmin = computed(() => auth.user?.role === 'admin')

// Contador de productos en el carrito
const cartItemsCount = computed(() => {
  if (!cart.cart || !cart.cart.items) return 0
  return cart.cart.items.reduce((total, item) => total + item.quantity, 0)
})

// Cargar carrito al montar el componente si el usuario está autenticado
onMounted(() => {
  if (isAuthenticated.value) {
    cart.fetch().catch(error => {
      console.error('Error loading cart:', error)
    })
  }
})

// Funciones
const toggleMobileMenu = () => {
  showMobileMenu.value = !showMobileMenu.value
}

const closeMobileMenu = () => {
  showMobileMenu.value = false
}

async function logout() {
  try {
    await auth.logout()
    // Limpiar el carrito al cerrar sesión
    cart.$reset()
    closeMobileMenu()
    router.push('/')
  } catch (error) {
    console.error('Error during logout:', error)
  }
}
</script>
