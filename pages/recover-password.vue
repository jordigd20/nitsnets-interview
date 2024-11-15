<script setup lang="ts">
  import { useEmail } from '~/composables';

  const { email, emailRules } = useEmail();
  const valid = ref(false);
  const isLoading = ref(false);
  const error = ref('');

  const handleSubmit = async () => {
    if (!valid.value) return;

    isLoading.value = true;

    try {
      const response = await useFetchData<{ url: string }>('/recover-password', 'POST', {
        email: email.value
      });

      if (!response) throw new Error('Error al recuperar contraseña.');

      console.log(response);
    } catch (err) {
      console.error(err);
      error.value = 'Error al recuperar contraseña.';
    }

    isLoading.value = false;
  };
</script>

<template>
  <NuxtLayout name="auth">
    <h1>Recuperar contraseña</h1>

    <v-form v-model="valid" class="auth-form" @submit.prevent="handleSubmit">
      <v-text-field
        v-model.trim="email"
        label="* Correo electrónico"
        type="email"
        :rules="emailRules"
        required
        variant="outlined"
      ></v-text-field>

      <p
        v-if="error"
        class="alert-error pa-3 text-body-2 border-sm border-error border-opacity-100 rounded mb-4"
      >
        {{ error }}
      </p>

      <v-btn type="submit" color="primary" :loading="isLoading" block> Recuperar </v-btn>
    </v-form>

    <footer class="auth-footer">
      <NuxtLink to="/"> Iniciar sesión </NuxtLink>
    </footer>
  </NuxtLayout>
</template>
