import { defineStore } from 'pinia'
import axios from 'axios'

export const useOrdersStore = defineStore('orders', {
  state: () => ({ list: { data: [] }, loading: false }),
  actions: {
    async fetch(){
      this.loading = true
      try { this.list = (await axios.get('/api/orders')).data }
      finally { this.loading = false }
    },
    async checkout(payload){
      const { data } = await axios.post('/api/orders/checkout', payload)
      return data
    }
  }
})





