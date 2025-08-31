<template>
  <div class="min-h-screen bg-gray-900">
    <!-- Navbar fijo en la parte superior -->
    <NavBar />

    <!-- Contenido principal sin container para que el footer tome todo el ancho -->
    <main>
      <RouterView />
    </main>

    <!-- Footer que toma todo el ancho -->
    <FooterComp />
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue'
import FooterComp from './components/FooterComp.vue'
</script>

<style scoped>
/* Asegurar que el footer esté siempre al final */
.min-h-screen {
  display: flex;
  flex-direction: column;
}

main {
  flex: 1;
}
</style>
