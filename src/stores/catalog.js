import { defineStore } from 'pinia'
import axios from 'axios'

export const useCatalogStore = defineStore('catalog', {
  state: () => ({
    categories: [],
    brands: [],
    products: {
      data: [],
      meta: {
        current_page: 1,
        last_page: 1,
        total: 0
      }
    },
    loading: false,
    error: null,
  }),

  actions: {
    async fetchCategories() {
      try {
        this.error = null
        const response = await axios.get('/api/categories')
        this.categories = response.data
        console.log('Categories loaded:', this.categories)
      } catch (error) {
        console.error('Error fetching categories:', error)
        this.error = 'Error al cargar categorías'
        // Fallback data
        this.categories = [
          { id: 1, name: 'Filtros' },
          { id: 2, name: 'Frenos' },
          { id: 3, name: 'Aceites' }
        ]
      }
    },

    async fetchBrands() {
      try {
        this.error = null
        const response = await axios.get('/api/brands')
        this.brands = response.data
        console.log('Brands loaded:', this.brands)
      } catch (error) {
        console.error('Error fetching brands:', error)
        this.error = 'Error al cargar marcas'
        // Fallback data
        this.brands = [
          { id: 1, name: 'AutoMax' },
          { id: 2, name: 'RoadPro' },
          { id: 3, name: 'CarParts' }
        ]
      }
    },

    async fetchProducts(params = {}) {
      this.loading = true
      this.error = null

      try {
        console.log('Fetching products with params:', params)
        const response = await axios.get('/api/products', { params })
        this.products = response.data
        console.log('Products loaded:', this.products)
      } catch (error) {
        console.error('Error fetching products:', error)
        this.error = 'Error al cargar productos'

        // Fallback mock data
        this.products = {
          data: Array.from({ length: 12 }).map((_, i) => ({
            id: i + 1,
            name: `Producto ${i + 1}`,
            description: `Descripción del producto ${i + 1}`,
            sku: `SKU${1000 + i}`,
            price: (25 + i * 5).toFixed(2),
            discount_price: i % 3 === 0 ? (20 + i * 5).toFixed(2) : null,
            stock: Math.floor(Math.random() * 100) + 1,
            category_id: (i % 3) + 1,
            brand_id: (i % 3) + 1,
            images: [{
              id: i + 1,
              url: `https://picsum.photos/seed/product${i}/400/300`,
              alt: `Producto ${i + 1}`
            }]
          })),
          meta: {
            current_page: 1,
            last_page: 2,
            total: 12,
            per_page: 12,
            from: 1,
            to: 12
          }
        }
      } finally {
        this.loading = false
      }
    },

    clearError() {
      this.error = null
    }
  },

  getters: {
    hasError: (state) => !!state.error,
    totalProducts: (state) => state.products.meta?.total || 0,
    currentPage: (state) => state.products.meta?.current_page || 1,
    lastPage: (state) => state.products.meta?.last_page || 1,
  }
})
