<template>
  <div class="card flex flex-col gap-3 group overflow-hidden transition hover:-translate-y-1 hover:shadow-lg">
    <div class="relative">
      <img :src="image" alt="" class="w-full h-44 object-cover rounded-md"/>
      <span v-if="product.discount_price" class="badge-success absolute top-2 left-2">
        -{{ discountPercent }}%
      </span>
    </div>
    <div>
      <h3 class="font-semibold text-lg leading-tight group-hover:text-blue-700 transition">
        {{ product.name }}
      </h3>
      <p class="text-xs text-gray-500">SKU: {{ product.sku }}</p>
    </div>
    <div class="mt-auto flex items-center gap-2">
      <span class="text-blue-700 font-extrabold text-lg">${{ displayPrice }}</span>
      <span v-if="product.discount_price" class="text-xs text-gray-400 line-through">
        ${{ product.price }}
      </span>
      <button class="btn-primary ml-auto" @click="$emit('add')">
        <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5 6m0 0h9M7 19h9" />
        </svg>
        Agregar
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

defineEmits(['add'])

const image = computed(() =>
  props.product.images?.[0]?.url || `https://picsum.photos/seed/${props.product.id}/400/300`
)

const displayPrice = computed(() =>
  props.product.discount_price || props.product.price
)

const discountPercent = computed(() =>
  props.product.discount_price ?
    Math.round((1 - (props.product.discount_price / props.product.price)) * 100) :
    0
)
</script>
