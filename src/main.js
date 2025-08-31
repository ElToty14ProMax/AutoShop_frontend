import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

// Import CSS principal (incluye Tailwind)
import './assets/main.css'

// Import FontAwesome
import '@fortawesome/fontawesome-free/css/all.css'

// Import SweetAlert2
import 'sweetalert2/dist/sweetalert2.min.css'
import Swal from 'sweetalert2'

// Import Chart.js
import Chart from 'chart.js/auto'

// Import Select2
import 'select2/dist/css/select2.css'
import $ from 'jquery'
import 'select2'

// Import Axios
import axios from 'axios'

// Crear la aplicación
const app = createApp(App)

// Configurar plugins
app.use(createPinia())
app.use(router)

// Propiedades globales
app.config.globalProperties.$axios = axios
app.config.globalProperties.$swal = Swal
app.config.globalProperties.$chart = Chart
app.config.globalProperties.$ = $
axios.defaults.baseURL = 'http://localhost:8000/' // URL de tu backend

// Montar la aplicación
app.mount('#app')