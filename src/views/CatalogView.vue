<template>
  <div class="min-h-screen bg-gray-900">
    <div class="max-w-7xl mx-auto px-4 py-8">

      <!-- Header del catálogo -->
      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold text-white mb-4">Catálogo de Productos</h1>
        <p class="text-gray-400 text-lg">Encuentra las mejores autopartes para tu vehículo</p>
      </div>

      <!-- Mensaje de error -->
      <div v-if="catalog.error" class="bg-red-900/50 border border-red-700 rounded-lg p-4 mb-6">
        <div class="flex items-center gap-3">
          <svg class="w-5 h-5 text-red-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p class="text-red-300">{{ catalog.error }}</p>
          <button @click="catalog.clearError()" class="ml-auto px-3 py-1 bg-red-800 text-red-200 rounded hover:bg-red-700 transition-colors">
            Cerrar
          </button>
        </div>
      </div>

      <!-- Filtros -->
      <div class="bg-gray-800 border border-gray-700 rounded-xl p-6 mb-8 shadow-xl">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">

          <!-- Búsqueda -->
          <div class="lg:col-span-2">
            <label class="block text-sm font-medium text-gray-300 mb-2">
              Buscar productos
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                v-model="q"
                placeholder="Buscar por nombre, marca, modelo..."
                class="block w-full pl-10 pr-3 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                @keypress.enter="applyFilters"
              />
            </div>
          </div>

          <!-- Categoría -->
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">
              Categoría
            </label>
            <select
              v-model="category"
              @change="applyFilters"
              class="block w-full px-3 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors">
              <option value="">Todas las categorías</option>
              <option v-for="c in catalog.categories" :key="c.id" :value="c.id">
                {{ c.name }}
              </option>
            </select>
          </div>

          <!-- Marca -->
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">
              Marca
            </label>
            <select
              v-model="brand"
              @change="applyFilters"
              class="block w-full px-3 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors">
              <option value="">Todas las marcas</option>
              <option v-for="b in catalog.brands" :key="b.id" :value="b.id">
                {{ b.name }}
              </option>
            </select>
          </div>
        </div>

        <!-- Botones de acción -->
        <div class="flex flex-wrap items-center justify-between mt-6 gap-4">
          <div class="flex gap-3">
            <button
              @click="applyFilters"
              class="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <svg class="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.707A1 1 0 013 7V4z" />
              </svg>
              Filtrar
            </button>
            <button
              @click="resetFilters"
              class="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white font-medium rounded-lg transition-all border border-gray-600">
              <svg class="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Limpiar
            </button>
          </div>

          <!-- Información de resultados -->
          <div class="text-sm text-gray-400 bg-gray-700 px-4 py-2 rounded-lg">
            <span class="font-medium text-white">{{ catalog.totalProducts }}</span> productos encontrados
            <span class="mx-2">•</span>
            Página <span class="font-medium text-white">{{ catalog.currentPage }}</span>
            de <span class="font-medium text-white">{{ catalog.lastPage }}</span>
          </div>
        </div>
      </div>

      <!-- Estado de carga -->
      <div v-if="catalog.loading" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div v-for="n in 8" :key="n" class="bg-gray-800 border border-gray-700 rounded-xl overflow-hidden animate-pulse">
          <div class="bg-gray-700 h-48"></div>
          <div class="p-4 space-y-3">
            <div class="bg-gray-700 h-4 rounded"></div>
            <div class="bg-gray-700 h-4 w-3/4 rounded"></div>
            <div class="bg-gray-700 h-6 w-1/2 rounded"></div>
          </div>
        </div>
      </div>

      <!-- Sin resultados -->
      <div v-else-if="catalog.products.data.length === 0" class="text-center py-16">
        <div class="bg-gray-800 border border-gray-700 rounded-xl p-8 max-w-md mx-auto">
          <svg class="w-16 h-16 text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 20.4a7.962 7.962 0 01-5-1.709m0 0V15a2 2 0 00-2-2H3a2 2 0 00-2 2v3a2 2 0 002 2h2a2 2 0 002-2zm10 0V15a2 2 0 012-2h2a2 2 0 012 2v3a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          <h3 class="text-xl font-semibold text-white mb-2">No se encontraron productos</h3>
          <p class="text-gray-400 mb-4">
            Intenta cambiar los filtros o usar términos de búsqueda diferentes.
          </p>
          <button
            @click="resetFilters"
            class="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all transform hover:scale-105">
            Limpiar filtros
          </button>
        </div>
      </div>

      <!-- Grid de productos -->
      <div v-else>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <ProductCard
            v-for="p in catalog.products.data"
            :key="p.id"
            :product="p"
            @add="addToCart(p)"
            class="transform hover:scale-105 transition-all duration-300"
          />
        </div>

        <!-- Paginación -->
        <div v-if="catalog.lastPage > 1" class="flex justify-center mt-12">
          <nav class="flex items-center gap-2">
            <button
              :disabled="catalog.currentPage === 1"
              @click="goToPage(catalog.currentPage - 1)"
              class="px-3 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <div class="flex gap-1">
              <button
                v-for="page in visiblePages"
                :key="page"
                @click="goToPage(page)"
                :class="[
                  'px-3 py-2 rounded-lg transition-colors',
                  page === catalog.currentPage
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white'
                ]">
                {{ page }}
              </button>
            </div>

            <button
              :disabled="catalog.currentPage === catalog.lastPage"
              @click="goToPage(catalog.currentPage + 1)"
              class="px-3 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useCatalogStore } from '../stores/catalog'
import { useCartStore } from '../stores/cart'
import ProductCard from '../components/ProductCard.vue'

const catalog = useCatalogStore()
const cart = useCartStore()

const q = ref('')
const category = ref('')
const brand = ref('')

// Páginas visibles en la paginación
const visiblePages = computed(() => {
  const current = catalog.currentPage
  const total = catalog.lastPage
  const delta = 2 // Número de páginas a mostrar a cada lado de la actual

  let start = Math.max(1, current - delta)
  let end = Math.min(total, current + delta)

  // Ajustar para mostrar siempre la misma cantidad de páginas si es posible
  if (end - start < delta * 2) {
    if (start === 1) {
      end = Math.min(total, start + delta * 2)
    } else if (end === total) {
      start = Math.max(1, end - delta * 2)
    }
  }

  const pages = []
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }

  return pages
})

const applyFilters = () => {
  catalog.fetchProducts({
    q: q.value || undefined,
    category_id: category.value || undefined,
    brand_id: brand.value || undefined,
    page: 1 // Resetear a la primera página cuando se aplican filtros
  })
}

const resetFilters = () => {
  q.value = ''
  category.value = ''
  brand.value = ''
  catalog.fetchProducts({ page: 1 })
}

const goToPage = (page) => {
  catalog.fetchProducts({
    q: q.value || undefined,
    category_id: category.value || undefined,
    brand_id: brand.value || undefined,
    page
  })
}

onMounted(async () => {
  console.log('Catalog component mounted')
  try {
    // Cargar datos en paralelo
    await Promise.all([
      catalog.fetchCategories(),
      catalog.fetchBrands(),
      catalog.fetchProducts()
    ])
    console.log('All data loaded successfully')
  } catch (e) {
    console.error('Error during initialization:', e)
  }
})

const addToCart = async (product) => {
  try {
    await cart.addItem(product.id, 1)
    // Mostrar notificación de éxito (opcional)
    console.log(`${product.name} agregado al carrito`)
  } catch (e) {
    console.error('Error adding to cart:', e)
    // Mostrar notificación de error (opcional)
  }
}
</script>
