<template>
  <div class="min-h-screen bg-gray-900">
    <div class="max-w-6xl mx-auto px-4 py-8">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold text-white mb-4">Mi Carrito</h1>
        <p class="text-gray-400 text-lg">Revisa tus productos antes de finalizar la compra</p>
      </div>

      <!-- Estado de carga -->
      <div v-if="isLoading" class="space-y-4">
        <div v-for="n in 3" :key="n" class="bg-gray-800 border border-gray-700 rounded-xl p-6 animate-pulse">
          <div class="flex items-center gap-4">
            <div class="w-20 h-20 bg-gray-700 rounded-lg"></div>
            <div class="flex-1 space-y-3">
              <div class="bg-gray-700 h-5 w-3/4 rounded"></div>
              <div class="bg-gray-700 h-4 w-1/2 rounded"></div>
            </div>
            <div class="bg-gray-700 h-10 w-24 rounded"></div>
          </div>
        </div>
      </div>

      <!-- Estado vacío -->
      <div v-else-if="!cart.cart || cart.cart.items?.length === 0" class="text-center py-16">
        <div class="bg-gray-800 border border-gray-700 rounded-xl p-12 max-w-md mx-auto">
          <div class="w-20 h-20 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg class="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.293 2.293A1 1 0 004 16v0a1 1 0 001 1h12M16 16a3 3 0 11-6 0 3 3 0 016 0zm-9 3a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <h3 class="text-2xl font-bold text-white mb-3">Tu carrito está vacío</h3>
          <p class="text-gray-400 mb-6 leading-relaxed">
            Agrega algunos productos increíbles a tu carrito y regresa aquí para finalizar tu compra.
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

      <!-- Carrito con productos -->
      <div v-else>
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Lista de productos -->
          <div class="lg:col-span-2 space-y-4">
            <div class="bg-gray-800 border border-gray-700 rounded-xl p-2">
              <h2 class="text-xl font-bold text-white mb-4 px-4 pt-4">
                Productos ({{ cart.cart.items.length }})
              </h2>

              <div class="space-y-4">
                <div
                  v-for="item in cart.cart.items"
                  :key="item.id"
                  class="bg-gray-700/50 rounded-lg p-4 hover:bg-gray-700/70 transition-all group">

                  <div class="flex items-center gap-4">
                    <!-- Imagen del producto -->
                    <div class="w-20 h-20 bg-gray-600 rounded-lg overflow-hidden flex-shrink-0 group-hover:scale-105 transition-transform">
                      <img
                        :src="item.product.images?.[0]?.url || 'https://via.placeholder.com/80x80?text=No+Image'"
                        :alt="item.product.name"
                        class="w-full h-full object-cover"
                        @error="$event.target.src = 'https://via.placeholder.com/80x80?text=Error'"
                      />
                    </div>

                    <!-- Información del producto -->
                    <div class="flex-1 min-w-0">
                      <h3 class="font-semibold text-white mb-1 truncate group-hover:text-blue-400 transition-colors">
                        {{ item.product.name }}
                      </h3>
                      <p class="text-sm text-gray-400 mb-2">
                        Precio unitario: <span class="text-blue-400 font-medium">${{ item.unit_price }}</span>
                      </p>
                      <div class="text-lg font-bold text-green-400">
                        ${{ (item.unit_price * item.quantity).toFixed(2) }}
                      </div>
                    </div>

                    <!-- Controles de cantidad -->
                    <div class="flex flex-col items-center gap-3">
                      <div class="flex items-center bg-gray-600 rounded-lg overflow-hidden">
                        <button
                          @click="onQty(item, item.quantity - 1)"
                          :disabled="item.quantity <= 1"
                          class="px-3 py-2 hover:bg-gray-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                          <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
                          </svg>
                        </button>

                        <input
                          type="number"
                          min="1"
                          :value="item.quantity"
                          @change="onQty(item, $event.target.value)"
                          class="w-16 text-center bg-gray-600 text-white py-2 focus:outline-none focus:bg-gray-500 transition-colors"
                        />

                        <button
                          @click="onQty(item, item.quantity + 1)"
                          class="px-3 py-2 hover:bg-gray-500 transition-colors">
                          <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                          </svg>
                        </button>
                      </div>

                      <button
                        @click="remove(item.id)"
                        class="px-3 py-1 bg-red-600/20 text-red-400 hover:bg-red-600 hover:text-white rounded-lg transition-all text-sm border border-red-600/30">
                        Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Resumen del pedido -->
          <div class="lg:col-span-1">
            <div class="bg-gray-800 border border-gray-700 rounded-xl p-6 sticky top-8">
              <h2 class="text-xl font-bold text-white mb-6">Resumen del Pedido</h2>

              <div class="space-y-4 mb-6">
                <div class="flex justify-between text-gray-300">
                  <span>Subtotal</span>
                  <span>${{ total }}</span>
                </div>
                <div class="flex justify-between text-gray-300">
                  <span>Envío</span>
                  <span class="text-green-400">Gratis</span>
                </div>
                <div class="flex justify-between text-gray-300">
                  <span>Impuestos</span>
                  <span>$0.00</span>
                </div>
                <hr class="border-gray-600">
                <div class="flex justify-between text-xl font-bold">
                  <span class="text-white">Total</span>
                  <span class="text-blue-400">${{ total }}</span>
                </div>
              </div>

              <div class="space-y-3">
                <router-link
                  to="/checkout"
                  class="w-full px-6 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-all transform hover:scale-105 text-center block">
                  Proceder al Checkout
                </router-link>

                <router-link
                  to="/catalog"
                  class="w-full px-6 py-3 bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white font-medium rounded-lg transition-all text-center block border border-gray-600">
                  Seguir Comprando
                </router-link>
              </div>

              <!-- Información adicional -->
              <div class="mt-6 p-4 bg-blue-900/20 border border-blue-700/30 rounded-lg">
                <div class="flex items-start gap-3">
                  <svg class="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <h4 class="text-blue-400 font-medium text-sm">Entrega Rápida</h4>
                    <p class="text-gray-400 text-xs mt-1">Recibe tu pedido en 24-48 horas</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useCartStore } from '../stores/cart'

const cart = useCartStore()
const isLoading = ref(true)

onMounted(async () => {
  try {
    await cart.fetch()
  } catch (error) {
    console.error('Error loading cart:', error)
  } finally {
    isLoading.value = false
  }
})

const onQty = async (item, value) => {
  const quantity = parseInt(value || '1', 10)
  if (quantity < 1) return

  try {
    await cart.updateItem(item.id, quantity)
  } catch (error) {
    console.error('Error updating quantity:', error)
  }
}

const remove = async (id) => {
  try {
    await cart.removeItem(id)
  } catch (error) {
    console.error('Error removing item:', error)
  }
}

const total = computed(() =>
  (cart.cart?.items || [])
    .reduce((sum, item) => sum + item.quantity * Number(item.unit_price), 0)
    .toFixed(2)
)
</script>

