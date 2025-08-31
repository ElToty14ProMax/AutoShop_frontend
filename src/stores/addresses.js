import { defineStore } from 'pinia'
import axios from 'axios'

export const useAddressesStore = defineStore('addresses', {
  state: () => ({ list: [], loading: false }),
  actions: {
    async fetch(){
      this.loading = true
      try { this.list = (await axios.get('/api/addresses')).data }
      finally { this.loading = false }
    },
    async create(payload){
      const { data } = await axios.post('/api/addresses', payload)
      this.list.push(data)
      return data
    },
    async update(addressId, payload){
      const { data } = await axios.put(`/api/addresses/${addressId}`, payload)
      const idx = this.list.findIndex(a => a.id === addressId)
      if (idx !== -1) this.list[idx] = data
      return data
    },
    async remove(addressId){
      await axios.delete(`/api/addresses/${addressId}`)
      this.list = this.list.filter(a => a.id !== addressId)
    }
  }
})





