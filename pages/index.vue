<script setup lang="ts">
  import { useEmail, usePassword } from '~/composables';
  import type { User } from '~/interfaces/user.interface';

  const { email, emailRules } = useEmail();
  const { password, passwordRules } = usePassword();
  const valid = ref(false);
  const isLoading = ref(false);
  const error = ref('');

  const rules = {
    email: emailRules,
    password: passwordRules
  };

  const handleSubmit = async () => {
    if (!valid.value) return;

    isLoading.value = true;

    try {
      const response = await useFetchData<{ user: User; token: string }>('/login', 'POST', {
        email: email.value,
        password: password.value
      });

      if (!response) throw new Error('Error al iniciar sesión.');

      console.log(response);
      await navigateTo('/dashboard');
    } catch (err) {
      console.error(err);
      error.value = 'Error al iniciar sesión.';
    }

    isLoading.value = false;
  };
</script>

<template>
  <NuxtLayout name="auth">
    <h1>Iniciar sesión</h1>

    <v-form v-model="valid" class="auth-form" @submit.prevent="handleSubmit">
      <v-text-field
        v-model.trim="email"
        label="* Correo electrónico"
        type="email"
        :rules="rules.email"
        required
        variant="outlined"
      ></v-text-field>

      <v-text-field
        v-model.trim="password"
        label="* Contraseña"
        type="password"
        :rules="rules.password"
        required
        variant="outlined"
      ></v-text-field>

      <p
        v-if="error"
        class="alert-error pa-3 text-body-2 border-sm border-error border-opacity-100 rounded mb-4"
      >
        {{ error }}
      </p>

      <v-btn type="submit" color="primary" :loading="isLoading" block> Iniciar sesión </v-btn>
    </v-form>

    <footer class="auth-footer">
      <NuxtLink to="/register"> Regístrate </NuxtLink>
      <NuxtLink to="/recover-password"> Recordar contraseña </NuxtLink>
    </footer>
  </NuxtLayout>
</template>
