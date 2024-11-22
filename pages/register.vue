<script setup lang="ts">
  import type { User } from '~/interfaces/user.interface';

  type Alert = {
    display: boolean;
    type: 'error' | 'success' | 'info' | 'warning';
    message: string;
  };

  const isLoading = ref(false);
  const alert = ref<Alert>({
    display: false,
    type: 'error',
    message: ''
  });

  const handleSubmit = async (data: {
    valid: boolean;
    name: string;
    email: string;
    nif: string;
    password: string;
    confirmPassword: string;
  }) => {
    if (!data.valid) return;
    if (data.password !== data.confirmPassword) return;

    isLoading.value = true;

    try {
      const response = await $fetch<User>(`${BASE_API_URL}/register`, {
        method: 'POST',
        body: {
          name: data.name,
          email: data.email,
          nif: data.nif,
          password: data.password
        }
      });

      if (!response) throw new Error('Error al crear la cuenta.');

      // Al utilizar un mock server, el usuario se guarda en localStorage
      localStorage.setItem(
        'user',
        JSON.stringify({ ...response, name: data.name, email: data.email, password: data.password })
      );

      alert.value = {
        display: true,
        type: 'success',
        message: 'Cuenta creada correctamente.'
      };
    } catch (err) {
      console.error(err);
      alert.value = {
        display: true,
        type: 'error',
        message: 'Error al crear la cuenta.'
      };
    }

    isLoading.value = false;
  };
</script>

<template>
  <NuxtLayout name="auth">
    <h1>Crear cuenta</h1>

    <RegisterForm :alert="alert" :is-loading="isLoading" @submit="handleSubmit" />

    <footer class="auth-footer">
      <NuxtLink to="/"> Iniciar sesión </NuxtLink>
    </footer>
  </NuxtLayout>
</template>
