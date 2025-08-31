<template>
  <footer class="bg-gray-900 text-gray-300 border-t border-gray-700 w-full">
    <div class="max-w-6xl mx-auto px-4 py-8">
      <!-- Grid principal del footer -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">

        <!-- Columna izquierda: Logo y descripción -->
        <div class="space-y-4">
          <div class="flex items-center gap-3">
            <div class="bg-blue-600 p-2 rounded-lg">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span class="font-bold text-lg text-white">AutoParts</span>
          </div>
          <p class="text-sm text-gray-400 leading-relaxed">
            Tu tienda confiable de autopartes y accesorios. Calidad garantizada y los mejores precios del mercado cubano.
          </p>

          <!-- Ubicación en la parte inferior izquierda -->
          <div class="flex items-start gap-3 pt-4">
            <svg class="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <div class="text-sm">
              <div class="text-white font-medium">Santa Clara, Villa Clara</div>
              <div class="text-gray-400">Cuba</div>
            </div>
          </div>
        </div>

        <!-- Columna central: Enlaces útiles -->
        <div class="space-y-4">
          <h3 class="font-semibold text-white">Enlaces Útiles</h3>
          <ul class="space-y-2 text-sm">
            <li>
              <router-link to="/catalog" class="hover:text-blue-400 transition-colors">
                Catálogo de Productos
              </router-link>
            </li>
            <li>
              <router-link to="/about" class="hover:text-blue-400 transition-colors">
                Sobre Nosotros
              </router-link>
            </li>
            <li>
              <router-link to="/contact" class="hover:text-blue-400 transition-colors">
                Contacto
              </router-link>
            </li>
            <li>
              <router-link to="/shipping" class="hover:text-blue-400 transition-colors">
                Información de Envío
              </router-link>
            </li>
            <li>
              <router-link to="/warranty" class="hover:text-blue-400 transition-colors">
                Garantías
              </router-link>
            </li>
            <li>
              <router-link to="/terms" class="hover:text-blue-400 transition-colors">
                Términos y Condiciones
              </router-link>
            </li>
            <li>
              <router-link to="/privacy" class="hover:text-blue-400 transition-colors">
                Política de Privacidad
              </router-link>
            </li>
          </ul>
        </div>

        <!-- Columna derecha: Contacto y redes sociales -->
        <div class="space-y-4">
          <h3 class="font-semibold text-white">Contáctanos</h3>

          <!-- Información de contacto -->
          <div class="space-y-3 text-sm">
            <div class="flex items-center gap-3">
              <svg class="w-4 h-4 text-blue-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <a href="mailto:info@autoparts.cu" class="hover:text-blue-400 transition-colors">
                info@autoparts.cu
              </a>
            </div>

            <div class="flex items-center gap-3">
              <svg class="w-4 h-4 text-blue-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <a href="tel:+5342555123" class="hover:text-blue-400 transition-colors">
                +53 (42) 555-123
              </a>
            </div>

            <div class="flex items-center gap-3">
              <svg class="w-4 h-4 text-blue-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Lun - Vie: 8:00 AM - 6:00 PM</span>
            </div>
          </div>

          <!-- Redes sociales - Posicionadas abajo a la derecha -->
          <div class="pt-6">
            <h4 class="font-medium text-white mb-4 text-sm">Síguenos en Redes Sociales</h4>
            <div class="flex gap-3 justify-start md:justify-end">
              <a
                href="https://facebook.com/autopartscu"
                target="_blank"
                rel="noopener noreferrer"
                class="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-all duration-300 group hover:scale-110">
                <svg class="w-5 h-5 text-gray-400 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>

              <a
                href="https://instagram.com/autopartscu"
                target="_blank"
                rel="noopener noreferrer"
                class="w-10 h-10 bg-gray-800 hover:bg-gradient-to-br hover:from-purple-500 hover:to-pink-500 rounded-lg flex items-center justify-center transition-all duration-300 group hover:scale-110">
                <svg class="w-5 h-5 text-gray-400 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-2.297 0-4.161-1.864-4.161-4.161s1.864-4.161 4.161-4.161 4.161 1.864 4.161 4.161-1.864 4.161-4.161 4.161zm7.718 0c-2.297 0-4.161-1.864-4.161-4.161s1.864-4.161 4.161-4.161 4.161 1.864 4.161 4.161-1.864 4.161-4.161 4.161z"/>
                </svg>
              </a>

              <a
                href="https://twitter.com/autopartscu"
                target="_blank"
                rel="noopener noreferrer"
                class="w-10 h-10 bg-gray-800 hover:bg-blue-500 rounded-lg flex items-center justify-center transition-all duration-300 group hover:scale-110">
                <svg class="w-5 h-5 text-gray-400 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>

              <a
                href="https://wa.me/5355551234"
                target="_blank"
                rel="noopener noreferrer"
                class="w-10 h-10 bg-gray-800 hover:bg-green-500 rounded-lg flex items-center justify-center transition-all duration-300 group hover:scale-110">
                <svg class="w-5 h-5 text-gray-400 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Línea divisoria -->
      <hr class="border-gray-700 my-8">

      <!-- Copyright y enlaces adicionales -->
      <div class="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm">
        <div class="flex items-center gap-2 text-gray-400">
          <span>&copy; {{ currentYear }} AutoParts Cuba.</span>
          <span>Todos los derechos reservados.</span>
        </div>

        <div class="flex items-center gap-4 text-gray-400">
          <span class="text-xs">Hecho con</span>
          <svg class="w-3 h-3 text-red-500 animate-pulse" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
          <span class="text-xs">en Cuba 🇨🇺</span>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue'

const currentYear = computed(() => new Date().getFullYear())
</script>
