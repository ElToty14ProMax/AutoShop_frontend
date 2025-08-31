<template>
  <div class="min-h-screen bg-gray-900">
    <div class="max-w-6xl mx-auto px-4 py-8">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold text-white mb-4">Mis Órdenes</h1>
        <p class="text-gray-400 text-lg">Historial completo de tus compras</p>
      </div>

      <!-- Estado de carga -->
      <div v-if="isLoading" class="space-y-4">
        <div v-for="n in 3" :key="n" class="bg-gray-800 border border-gray-700 rounded-xl p-6 animate-pulse">
          <div class="flex justify-between items-start">
            <div class="flex-1 space-y-3">
              <div class="bg-gray-700 h-6 w-32 rounded"></div>
              <div class="bg-gray-700 h-4 w-48 rounded"></div>
              <div class="bg-gray-700 h-4 w-40 rounded"></div>
            </div>
            <div class="bg-gray-700 h-10 w-24 rounded"></div>
          </div>
        </div>
      </div>

      <!-- Estado vacío -->
      <div v-else-if="orders.list.data?.length === 0" class="text-center py-16">
        <div class="bg-gray-800 border border-gray-700 rounded-xl p-12 max-w-md mx-auto">
          <div class="w-20 h-20 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg class="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <h3 class="text-2xl font-bold text-white mb-3">No tienes órdenes</h3>
          <p class="text-gray-400 mb-6 leading-relaxed">
            Cuando realices tu primera compra, aparecerá aquí tu historial de órdenes.
          </p>
          <router-link
            to="/catalog"
            class="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all transform hover:scale-105">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            Explorar Catálogo
          </router-link>
        </div>
      </div>

      <!-- Lista de órdenes -->
      <div v-else class="space-y-6">
        <div
          v-for="order in orders.list.data"
          :key="order.id"
          class="bg-gray-800 border border-gray-700 rounded-xl overflow-hidden hover:border-blue-500 transition-all group shadow-lg">

          <div class="p-6">
            <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <!-- Información principal -->
              <div class="flex-1">
                <div class="flex items-center gap-3 mb-4">
                  <span class="text-xl font-bold text-white">Orden #{{ order.id }}</span>
                  <span
                    class="px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wide"
                    :class="{
                      'bg-green-900/50 text-green-400 border border-green-700': order.status === 'completed',
                      'bg-yellow-900/50 text-yellow-400 border border-yellow-700': order.status === 'pending',
                      'bg-blue-900/50 text-blue-400 border border-blue-700': order.status === 'processing',
                      'bg-purple-900/50 text-purple-400 border border-purple-700': order.status === 'shipped',
                      'bg-red-900/50 text-red-400 border border-red-700': order.status === 'cancelled'
                    }">
                    {{ getStatusText(order.status) }}
                  </span>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div class="bg-gray-700/50 rounded-lg p-3">
                    <div class="text-gray-400 mb-1">Total</div>
                    <div class="text-xl font-bold text-blue-400">${{ order.grand_total }}</div>
                  </div>

                  <div v-if="order.created_at" class="bg-gray-700/50 rounded-lg p-3">
                    <div class="text-gray-400 mb-1">Fecha</div>
                    <div class="text-white font-medium">{{ formatDate(order.created_at) }}</div>
                  </div>

                  <div v-if="order.items_count" class="bg-gray-700/50 rounded-lg p-3">
                    <div class="text-gray-400 mb-1">Productos</div>
                    <div class="text-white font-medium">{{ order.items_count }} artículos</div>
                  </div>
                </div>
              </div>

              <!-- Acciones -->
              <div class="flex flex-col sm:flex-row gap-3">
                <router-link
                  :to="`/orders/${order.id}`"
                  class="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all transform hover:scale-105 text-center">
                  Ver Detalles
                </router-link>

                <button
                  v-if="order.status === 'completed'"
                  class="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white font-medium rounded-lg transition-all border border-gray-600">
                  Reordenar
                </button>
              </div>
            </div>
          </div>

          <!-- Barra de progreso del estado -->
          <div class="bg-gray-700 h-1">
            <div
              class="h-full transition-all duration-500"
              :class="{
                'bg-green-500 w-full': order.status === 'completed',
                'bg-yellow-500 w-1/4': order.status === 'pending',
                'bg-blue-500 w-2/4': order.status === 'processing',
                'bg-purple-500 w-3/4': order.status === 'shipped',
                'bg-red-500 w-1/4': order.status === 'cancelled'
              }">
            </div>
          </div>
        </div>
      </div>

      <!-- Paginación mejorada -->
      <div v-if="orders.list.meta && orders.list.meta.last_page > 1" class="flex justify-center mt-12">
        <nav class="flex items-center gap-2">
          <button
            :disabled="orders.list.meta.current_page === 1"
            @click="loadPage(orders.list.meta.current_page - 1)"
            class="px-3 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div class="flex gap-1">
            <button
              v-for="page in orders.list.meta.last_page"
              :key="page"
              @click="loadPage(page)"
              :class="[
                'px-3 py-2 rounded-lg transition-colors',
                page === orders.list.meta.current_page
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white'
              ]">
              {{ page }}
            </button>
          </div>

          <button
            :disabled="orders.list.meta.current_page === orders.list.meta.last_page"
            @click="loadPage(orders.list.meta.current_page + 1)"
            class="px-3 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </nav>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useOrdersStore } from '../stores/orders'

const orders = useOrdersStore()
const isLoading = ref(true)

onMounted(async () => {
  try {
    await orders.fetch()
  } catch (error) {
    console.error('Error loading orders:', error)
  } finally {
    isLoading.value = false
  }
})

const getStatusText = (status) => {
  const statusMap = {
    'pending': 'Pendiente',
    'processing': 'Procesando',
    'shipped': 'Enviado',
    'completed': 'Completado',
    'cancelled': 'Cancelado'
  }
  return statusMap[status] || status
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const loadPage = async (page) => {
  isLoading.value = true
  try {
    await orders.fetch({ page })
  } catch (error) {
    console.error('Error loading page:', error)
  } finally {
    isLoading.value = false
  }
}
</script>

