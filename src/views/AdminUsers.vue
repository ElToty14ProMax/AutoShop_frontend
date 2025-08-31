<template>
  <div>
    <div class="d-flex justify-content-between align-items-center mb-2">
      <h3>Usuarios (Admin)</h3>
      <span class="badge bg-warning text-dark">Crear usuario: Admin o Manicurist</span>
    </div>
    <form class="row g-2 mb-3" @submit.prevent="create">
      <div class="col-md-3"><input v-model="f.name" class="form-control" placeholder="Nombre" required /></div>
      <div class="col-md-3"><input v-model="f.email" type="email" class="form-control" placeholder="Email" required /></div>
      <div class="col-md-2"><input v-model="f.password" type="password" class="form-control" placeholder="Password" required /></div>
      <div class="col-md-2">
        <select v-model="f.role" class="form-select">
          <option value="manicurist">Manicurist</option>
          <option value="admin">Admin</option>
        </select>
      </div>
      <div class="col-md-2" v-if="f.role==='manicurist'">
        <select v-model="f.specialty" class="form-select">
          <option value="hands">Hands</option>
          <option value="feet">Feet</option>
        </select>
      </div>
      <div class="col-md-2"><button class="btn btn-primary w-100">Crear</button></div>
    </form>
  </div>
</template>

<script setup>
import axios from 'axios'
import { reactive } from 'vue'

const f = reactive({ name: '', email: '', password: '', role: 'manicurist', specialty: 'hands' })

async function create(){
  await axios.post('/api/admin/users', f)
  f.name=''; f.email=''; f.password=''; f.role='manicurist'; f.specialty='hands'
}
</script>

<style scoped>
/* Add any component-specific styles here */
</style>


