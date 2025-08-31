<!-- CheckoutView.vue -->
<template>
  <div class="max-w-4xl mx-auto p-4 space-y-4">
    <h2 class="text-2xl font-bold">Checkout</h2>

    <!-- Dirección -->
    <div class="card">
      <h3 class="font-semibold mb-2">Dirección de entrega</h3>
      <div class="flex gap-3 items-end">
        <select v-model="addressId" class="input flex-1">
          <option value="">Selecciona una dirección</option>
          <option v-for="address in addresses.list" :key="address.id" :value="address.id">
            {{ address.full_name }} - {{ address.line1 }}
          </option>
        </select>
        <router-link to="/addresses" class="btn-outline">
          Gestionar direcciones
        </router-link>
      </div>
    </div>

    <!-- Método de pago -->
    <div class="card">
      <h3 class="font-semibold mb-2">Método de pago</h3>
      <select v-model="paymentMethod" class="input">
        <option value="cash">Efectivo contra entrega</option>
        <option value="card">Tarjeta de crédito</option>
        <option value="transfer">Transferencia bancaria</option>
      </select>
    </div>

    <!-- Resumen -->
    <div class="card">
      <h3 class="font-semibold mb-3">Resumen del pedido</h3>
      <div v-if="cart.cart?.items" class="space-y-2 mb-4">
        <div v-for="item in cart.cart.items" :key="item.id" class="flex justify-between text-sm">
          <span>{{ item.product.name }} x{{ item.quantity }}</span>
          <span>${{ (item.unit_price * item.quantity).toFixed(2) }}</span>
        </div>
      </div>
      <div class="border-t pt-3 flex justify-between font-bold text-lg">
        <span>Total:</span>
        <span class="text-blue-700">${{ total }}</span>
      </div>
    </div>

    <!-- Botón de confirmar -->
    <button
      class="btn-primary w-full"
      @click="doCheckout"
      :disabled="!addressId || isProcessing"
    >
      <span v-if="isProcessing">Procesando...</span>
      <span v-else>Confirmar compra</span>
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useCartStore } from '../stores/cart'
import { useAddressesStore } from '../stores/addresses'
import { useOrdersStore } from '../stores/orders'
import { useRouter } from 'vue-router'

const cart = useCartStore()
const addresses = useAddressesStore()
const orders = useOrdersStore()
const router = useRouter()

const addressId = ref('')
const paymentMethod = ref('cash')
const isProcessing = ref(false)

onMounted(async () => {
  try {
    await Promise.all([cart.fetch(), addresses.fetch()])
    const defaultAddress = addresses.list.find(a => a.is_default)
    addressId.value = defaultAddress?.id || addresses.list[0]?.id || ''
  } catch (error) {
    console.error('Error loading checkout data:', error)
  }
})

const total = computed(() =>
  (cart.cart?.items || [])
    .reduce((sum, item) => sum + item.quantity * Number(item.unit_price), 0)
    .toFixed(2)
)

const doCheckout = async () => {
  if (!addressId.value) {
    alert('Por favor selecciona una dirección')
    return
  }
  isProcessing.value = true
  try {
    await orders.checkout({  // Quita 'const order =' 
      address_id: addressId.value,
      payment_method: paymentMethod.value
    })
    router.push('/orders')
  } catch (error) {
    console.error('Error during checkout:', error)
    alert('Error al procesar la compra. Inténtalo de nuevo.')
  } finally {
    isProcessing.value = false
  }
}
</script>

