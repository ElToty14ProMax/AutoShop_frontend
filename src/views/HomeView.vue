<template>
  <div>
    <!-- Hero Section con Carrusel -->
    <section class="relative overflow-hidden">
      <CarrouselComp
        :images="heroImages"
        height="600px"
        :auto-play="true"
        :auto-play-interval="5000"
        :show-overlay="true"
        :show-titles="true" />

      <!-- Overlay con contenido hero -->
      <div class="absolute inset-0 bg-black/40 flex items-center justify-center">
        <div class="text-center text-white max-w-4xl px-4">
          <h1 class="text-4xl md:text-6xl font-extrabold leading-tight mb-6 drop-shadow-lg">
            Encuentra las mejores
            <span class="text-blue-400">piezas</span>
            para tu carro
          </h1>
          <p class="text-xl md:text-2xl mb-8 drop-shadow-lg text-gray-200">
            Catálogo actualizado, marcas confiables y precios que te harán sonreír.
            Envíos rápidos en todo el país.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <router-link
              to="/catalog"
              class="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-all transform hover:scale-105 shadow-lg">
              Explorar catálogo
            </router-link>
            <router-link
              to="/contact"
              class="px-8 py-4 bg-transparent border-2 border-white text-white hover:bg-white hover:text-gray-900 font-bold rounded-lg transition-all">
              Contáctanos
            </router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- Estadísticas -->
    <section class="py-16 bg-gray-800 border-y border-gray-700">
      <div class="max-w-6xl mx-auto px-4">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div class="space-y-2">
            <div class="text-3xl font-bold text-blue-400">10K+</div>
            <div class="text-gray-300">Productos</div>
          </div>
          <div class="space-y-2">
            <div class="text-3xl font-bold text-green-400">5K+</div>
            <div class="text-gray-300">Clientes Felices</div>
          </div>
          <div class="space-y-2">
            <div class="text-3xl font-bold text-yellow-400">15+</div>
            <div class="text-gray-300">Años de Experiencia</div>
          </div>
          <div class="space-y-2">
            <div class="text-3xl font-bold text-purple-400">24h</div>
            <div class="text-gray-300">Entrega Rápida</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Productos Destacados -->
    <section class="py-16 bg-gray-900">
      <div class="max-w-6xl mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="text-4xl font-bold text-white mb-4">Productos Destacados</h2>
          <p class="text-gray-400 text-lg">Los productos más populares y de mejor calidad</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            v-for="(product, index) in featuredProducts"
            :key="index"
            class="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-blue-500 transition-all group hover:shadow-2xl">

            <!-- Carrusel de producto -->
            <CarrouselComp
              :images="product.images"
              height="250px"
              :show-arrows="false"
              :show-counter="true"
              :show-indicators="true" />

            <div class="p-6">
              <h3 class="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                {{ product.name }}
              </h3>
              <p class="text-gray-400 text-sm mb-4 leading-relaxed">
                {{ product.description }}
              </p>
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <span class="text-2xl font-bold text-blue-400">${{ product.price }}</span>
                  <span v-if="product.oldPrice" class="text-gray-500 line-through text-sm">
                    ${{ product.oldPrice }}
                  </span>
                </div>
                <button
                  @click="addToCart(product)"
                  class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all transform hover:scale-105 font-medium">
                  Agregar
                </button>
              </div>

              <!-- Rating -->
              <div class="flex items-center gap-1 mt-3">
                <div class="flex text-yellow-400">
                  <svg v-for="star in 5" :key="star" class="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                  </svg>
                </div>
                <span class="text-gray-400 text-sm ml-2">({{ product.reviews }} reviews)</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Botón ver más productos -->
        <div class="text-center mt-12">
          <router-link
            to="/catalog"
            class="inline-flex items-center gap-2 px-8 py-3 bg-transparent border-2 border-blue-600 text-blue-400 hover:bg-blue-600 hover:text-white rounded-lg transition-all font-medium">
            Ver Todos los Productos
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
          </router-link>
        </div>
      </div>
    </section>

    <!-- Categorías Principales -->
    <section class="py-16 bg-gray-800">
      <div class="max-w-6xl mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="text-4xl font-bold text-white mb-4">Categorías Principales</h2>
          <p class="text-gray-400 text-lg">Encuentra lo que necesitas por categoría</p>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <div
            v-for="(category, index) in categories"
            :key="index"
            @click="goToCategory(category.slug)"
            class="bg-gray-900 hover:bg-gray-700 rounded-xl p-6 text-center transition-all cursor-pointer group border border-gray-700 hover:border-blue-500">
            <div class="text-4xl mb-3">{{ category.icon }}</div>
            <h3 class="text-white font-medium group-hover:text-blue-400 transition-colors">
              {{ category.name }}
            </h3>
            <p class="text-gray-500 text-sm mt-1">{{ category.count }}+ productos</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonios -->
    <section class="py-16 bg-gray-900">
      <div class="max-w-4xl mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="text-4xl font-bold text-white mb-4">Lo que dicen nuestros clientes</h2>
          <p class="text-gray-400 text-lg">Testimonios reales de clientes satisfechos</p>
        </div>

        <CarrouselComp
          :images="testimonialImages"
          height="350px"
          :auto-play="true"
          :auto-play-interval="6000"
          :show-titles="true"
          :show-overlay="true" />
      </div>
    </section>

    <!-- Call to Action Final -->
    <section class="py-16 bg-gradient-to-r from-blue-900 to-blue-700">
      <div class="max-w-4xl mx-auto px-4 text-center">
        <h2 class="text-4xl font-bold text-white mb-4">
          ¿Listo para mejorar tu vehículo?
        </h2>
        <p class="text-blue-100 text-lg mb-8">
          Descubre nuestra amplia gama de autopartes y accesorios de primera calidad
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <router-link
            to="/register"
            class="px-8 py-4 bg-white text-blue-900 font-bold rounded-lg hover:bg-gray-100 transition-all transform hover:scale-105">
            Crear Cuenta Gratis
          </router-link>
          <router-link
            to="/catalog"
            class="px-8 py-4 bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-900 font-bold rounded-lg transition-all">
            Explorar Catálogo
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import CarrouselComp from '../components/CarrouselComp.vue'

const router = useRouter()

// Imágenes del carrusel principal (hero)
const heroImages = reactive([
  {
    src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=600&fit=crop',
    alt: 'Autopartes de calidad premium',
    title: 'Calidad Premium Garantizada',
    description: 'Los mejores repuestos para tu vehículo con garantía de por vida'
  },
  {
    src: 'https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?w=1200&h=600&fit=crop',
    alt: 'Auto deportivo de alta gama',
    title: 'Para Todos los Modelos',
    description: 'Encuentra piezas para cualquier marca y modelo de vehículo'
  },
  {
    src: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=1200&h=600&fit=crop',
    alt: 'Servicio técnico especializado',
    title: 'Instalación Profesional',
    description: 'Servicio técnico especializado incluido con cada compra'
  },
  {
    src: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1200&h=600&fit=crop',
    alt: 'Entrega rápida garantizada',
    title: 'Entrega en 24 Horas',
    description: 'Envío rápido y seguro a toda Cuba'
  }
])

// Productos destacados
const featuredProducts = reactive([
  {
    name: 'Kit de Frenos Premium Brembo',
    description: 'Sistema completo de frenos con pastillas cerámicas y discos ventilados para máxima seguridad y rendimiento.',
    price: 299.99,
    oldPrice: 349.99,
    reviews: 127,
    images: [
      { src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop', alt: 'Kit de frenos vista frontal' },
      { src: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=300&fit=crop', alt: 'Kit de frenos instalado' },
      { src: 'https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=400&h=300&fit=crop', alt: 'Detalles del kit' }
    ]
  },
  {
    name: 'Batería AGM 75Ah Bosch',
    description: 'Batería de tecnología AGM con 3 años de garantía. Ideal para vehículos modernos con sistemas eléctricos avanzados.',
    price: 189.99,
    oldPrice: null,
    reviews: 89,
    images: [
      { src: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop', alt: 'Batería AGM Bosch' },
      { src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop', alt: 'Instalación de batería' }
    ]
  },
  {
    name: 'Filtro de Aire K&N Deportivo',
    description: 'Filtro de alto flujo que mejora la respuesta del motor y aumenta la potencia hasta un 5%.',
    price: 79.99,
    oldPrice: 95.99,
    reviews: 203,
    images: [
      { src: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=300&fit=crop', alt: 'Filtro K&N deportivo' },
      { src: 'https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=400&h=300&fit=crop', alt: 'Comparación filtros' },
      { src: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop', alt: 'Instalación filtro' }
    ]
  }
])

// Categorías principales
const categories = reactive([
  { name: 'Frenos', icon: '🛑', count: 1250, slug: 'frenos' },
  { name: 'Motor', icon: '⚙️', count: 2100, slug: 'motor' },
  { name: 'Suspensión', icon: '🔧', count: 890, slug: 'suspension' },
  { name: 'Eléctrico', icon: '⚡', count: 1560, slug: 'electrico' },
  { name: 'Filtros', icon: '🔄', count: 750, slug: 'filtros' },
  { name: 'Aceites', icon: '🛢️', count: 420, slug: 'aceites' }
])

// Testimonios
const testimonialImages = reactive([
  {
    src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop',
    alt: 'Testimonio Carlos Martínez',
    title: 'Carlos M. - La Habana',
    description: '"Excelente servicio y productos de calidad. Mi auto quedó como nuevo después de cambiar las piezas aquí. 100% recomendado."'
  },
  {
    src: 'https://images.unsplash.com/photo-1494790108755-2616b612b5bb?w=600&h=400&fit=crop',
    alt: 'Testimonio María Rodríguez',
    title: 'María R. - Santiago de Cuba',
    description: '"La atención al cliente es excepcional. Encontré exactamente lo que necesitaba para mi vehículo y el precio fue muy justo."'
  },
  {
    src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&h=400&fit=crop',
    alt: 'Testimonio José López',
    title: 'José L. - Villa Clara',
    description: '"Precios justos y entrega rápida. La instalación fue perfecta. Definitivamente mi tienda de autopartes de confianza."'
  }
])

// Funciones
const addToCart = (product) => {
  console.log('Agregando al carrito:', product.name)
  // Aquí implementarías la lógica del carrito
  // Ejemplo: cartStore.addItem(product)
}

const goToCategory = (categorySlug) => {
  router.push(`/catalog?category=${categorySlug}`)
}
</script>
