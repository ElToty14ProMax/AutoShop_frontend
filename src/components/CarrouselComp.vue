<template>
  <div class="relative w-full">
    <!-- Container principal del carrusel -->
    <div class="relative overflow-hidden rounded-xl bg-gray-800 shadow-2xl" :style="{ height: height }">
      <!-- Imágenes -->
      <div
        class="flex transition-transform duration-500 ease-in-out h-full"
        :style="{ transform: `translateX(-${currentIndex * 100}%)` }">
        <div
          v-for="(image, index) in images"
          :key="index"
          class="w-full h-full flex-shrink-0 relative">
          <img
            :src="image.src"
            :alt="image.alt || `Imagen ${index + 1}`"
            class="w-full h-full object-cover" />
          <!-- Overlay con gradiente opcional -->
          <div v-if="showOverlay" class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <!-- Título opcional -->
          <div v-if="image.title && showTitles" class="absolute bottom-6 left-6 right-6 text-white">
            <h3 class="text-2xl font-bold mb-2 drop-shadow-lg">{{ image.title }}</h3>
            <p v-if="image.description" class="text-gray-200 text-lg drop-shadow-md">{{ image.description }}</p>
          </div>
        </div>
      </div>

      <!-- Botones de navegación -->
      <div v-if="showArrows && images.length > 1" class="absolute inset-y-0 left-0 flex items-center">
        <button
          @click="prevSlide"
          class="ml-4 p-3 bg-black/30 hover:bg-black/50 text-white rounded-full transition-all backdrop-blur-sm hover:scale-110">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      </div>

      <div v-if="showArrows && images.length > 1" class="absolute inset-y-0 right-0 flex items-center">
        <button
          @click="nextSlide"
          class="mr-4 p-3 bg-black/30 hover:bg-black/50 text-white rounded-full transition-all backdrop-blur-sm hover:scale-110">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Indicadores (bolitas) -->
    <div v-if="showIndicators && images.length > 1" class="flex justify-center mt-6 gap-3">
      <button
        v-for="(image, index) in images"
        :key="`indicator-${index}`"
        @click="goToSlide(index)"
        class="w-3 h-3 rounded-full transition-all duration-300 hover:scale-125"
        :class="[
          currentIndex === index
            ? 'bg-blue-500 scale-110 shadow-lg'
            : 'bg-gray-500 hover:bg-gray-400'
        ]">
      </button>
    </div>

    <!-- Contador -->
    <div v-if="showCounter" class="absolute top-4 right-4 bg-black/50 text-white px-3 py-2 rounded-full text-sm backdrop-blur-sm border border-white/20">
      {{ currentIndex + 1 }} / {{ images.length }}
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// Props
const props = defineProps({
  images: {
    type: Array,
    required: true,
    validator: (value) => value.every(img => img.src)
  },
  height: {
    type: String,
    default: '400px'
  },
  autoPlay: {
    type: Boolean,
    default: false
  },
  autoPlayInterval: {
    type: Number,
    default: 3000
  },
  showArrows: {
    type: Boolean,
    default: true
  },
  showIndicators: {
    type: Boolean,
    default: true
  },
  showCounter: {
    type: Boolean,
    default: false
  },
  showOverlay: {
    type: Boolean,
    default: false
  },
  showTitles: {
    type: Boolean,
    default: false
  }
})

// Emisiones
const emit = defineEmits(['slide-change'])

// Estado reactivo
const currentIndex = ref(0)
let autoPlayTimer = null

// Métodos
const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % props.images.length
  emit('slide-change', currentIndex.value)
}

const prevSlide = () => {
  currentIndex.value = currentIndex.value === 0
    ? props.images.length - 1
    : currentIndex.value - 1
  emit('slide-change', currentIndex.value)
}

const goToSlide = (index) => {
  currentIndex.value = index
  emit('slide-change', currentIndex.value)
}

const startAutoPlay = () => {
  if (props.autoPlay && props.images.length > 1) {
    autoPlayTimer = setInterval(nextSlide, props.autoPlayInterval)
  }
}

const stopAutoPlay = () => {
  if (autoPlayTimer) {
    clearInterval(autoPlayTimer)
    autoPlayTimer = null
  }
}

// Lifecycle
onMounted(() => {
  startAutoPlay()
})

onUnmounted(() => {
  stopAutoPlay()
})

// Exponer métodos para uso externo
defineExpose({
  nextSlide,
  prevSlide,
  goToSlide,
  getCurrentIndex: () => currentIndex.value
})
</script>
