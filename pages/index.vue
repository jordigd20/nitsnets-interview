<script setup lang="ts">
  import { useEmail, usePassword } from '~/composables';

  const authStore = useAuthStore();
  const { email, emailRules } = useEmail();
  const { password, passwordRules } = usePassword();
  const valid = ref(false);

  const rules = {
    email: emailRules,
    password: passwordRules
  };

  const handleSubmit = async () => {
    if (!valid.value) return;

    await authStore.login(email.value, password.value);
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
        v-if="authStore.error"
        class="alert-error pa-3 text-body-2 border-sm border-error border-opacity-100 rounded mb-4"
      >
        {{ authStore.error }}
      </p>

      <v-btn type="submit" color="primary" :loading="authStore.isLoading" block>
        Iniciar sesión
      </v-btn>
    </v-form>

    <footer class="auth-footer">
      <NuxtLink to="/register"> Regístrate </NuxtLink>
      <NuxtLink to="/recover-password"> Recordar contraseña </NuxtLink>
    </footer>
  </NuxtLayout>
</template>
