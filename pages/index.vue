<script setup lang="ts">
  import type { LoginForm } from '~/interfaces';

  const authStore = useAuthStore();

  const handleSubmit = async ({ valid, email, password }: LoginForm) => {
    if (!valid) return;

    await authStore.login(email, password);
  };
</script>

<template>
  <NuxtLayout name="auth">
    <h1>Iniciar sesión</h1>

    <LoginForm @submit="handleSubmit" />

    <footer class="auth-footer">
      <NuxtLink to="/register"> Regístrate </NuxtLink>
      <NuxtLink to="/recover-password"> Recordar contraseña </NuxtLink>
    </footer>
  </NuxtLayout>
</template>
