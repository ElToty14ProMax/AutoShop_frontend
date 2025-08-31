import { defineStore } from 'pinia'
import axios from 'axios'

export const useCartStore = defineStore('cart', {
  state: () => ({ cart: null, loading: false }),
  actions: {
    async fetch(){
      this.loading = true
      try { this.cart = (await axios.get('/api/cart')).data }
      finally { this.loading = false }
    },
    async addItem(product_id, quantity = 1){
      const { data } = await axios.post('/api/cart/items', { product_id, quantity })
      this.cart = data
    },
    async updateItem(itemId, quantity){
      const { data } = await axios.put(`/api/cart/items/${itemId}`, { quantity })
      this.cart = data
    },
    async removeItem(itemId){
      const { data } = await axios.delete(`/api/cart/items/${itemId}`)
      this.cart = data
    }
  }
})





