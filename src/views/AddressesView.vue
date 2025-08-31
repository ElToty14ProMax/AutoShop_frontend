<!-- AddressesView.vue -->
<template>
  <div class="max-w-4xl mx-auto p-4 space-y-4">
    <h2 class="text-2xl font-bold">Mis Direcciones</h2>

    <!-- Lista de direcciones -->
    <div class="grid gap-3">
      <div v-for="address in addresses.list" :key="address.id" class="card">
        <div class="flex items-start gap-4">
          <div class="flex-1">
            <div class="flex items-center gap-2 mb-2">
              <span class="font-semibold">{{ address.full_name }}</span>
              <span v-if="address.is_default" class="badge-success">Predeterminada</span>
            </div>
            <div class="text-sm text-gray-600 space-y-1">
              <div>{{ address.line1 }}</div>
              <div>{{ address.city }}, {{ address.state }} {{ address.postal_code }}</div>
              <div v-if="address.phone">Tel: {{ address.phone }}</div>
            </div>
          </div>

          <div class="flex gap-2">
            <button
              v-if="!address.is_default"
              class="btn-outline"
              @click="setDefault(address)"
            >
              Hacer predeterminada
            </button>
            <button class="btn-outline text-red-600 hover:bg-red-50" @click="remove(address.id)">
              Eliminar
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Formulario nueva dirección -->
    <form class="card grid gap-3" @submit.prevent="create">
      <h3 class="font-semibold">Nueva dirección</h3>
      <div class="grid md:grid-cols-2 gap-3">
        <input v-model="form.full_name" placeholder="Nombre completo" class="input" required/>
        <input v-model="form.phone" placeholder="Teléfono" class="input"/>
      </div>
      <input v-model="form.line1" placeholder="Dirección completa" class="input" required/>
      <div class="grid md:grid-cols-3 gap-3">
        <input v-model="form.city" placeholder="Ciudad" class="input" required/>
        <input v-model="form.state" placeholder="Estado" class="input" required/>
        <input v-model="form.postal_code" placeholder="Código Postal" class="input"/>
      </div>
      <button class="btn-primary w-max">Guardar dirección</button>
    </form>
  </div>
</template>

<script setup>
import { reactive, onMounted } from 'vue'
import { useAddressesStore } from '../stores/addresses'

const addresses = useAddressesStore()

const form = reactive({
  full_name: '',
  phone: '',
  line1: '',
  city: '',
  state: '',
  postal_code: '',
  country: 'VE'
})

onMounted(() => addresses.fetch())

const create = async () => {
  try {
    await addresses.create(form)
    // Limpiar formulario
    Object.keys(form).forEach(key => {
      form[key] = key === 'country' ? 'VE' : ''
    })
  } catch (error) {
    console.error('Error creating address:', error)
  }
}

const remove = async (id) => {
  if (confirm('¿Seguro que quieres eliminar esta dirección?')) {
    try {
      await addresses.remove(id)
    } catch (error) {
      console.error('Error removing address:', error)
    }
  }
}

const setDefault = async (address) => {
  try {
    await addresses.update(address.id, { is_default: true })
  } catch (error) {
    console.error('Error setting default address:', error)
  }
}
</script>

