<script setup lang="ts">
  import { useEmail } from '~/composables/auth';

  const { email, emailRules } = useEmail();
  const password = ref('');
  const valid = ref(false);
  const isLoading = ref(false);

  const rules = {
    email: emailRules,
    password: [(value: string) => !!value || 'La contraseña es obligatoria']
  };

  const handleSubmit = async () => {
    console.log({ valid: valid.value, email: email.value, password: password.value });

    if (!valid.value) {
      return;
    }

    isLoading.value = true;
    //TODO: Call the login endpoint
    isLoading.value = false;
  };
</script>

<template>
  <NuxtLayout name="auth">
    <h1>Iniciar sesión</h1>

    <v-form v-model="valid" class="auth-form" @submit.prevent="handleSubmit">
      <v-text-field
        v-model.trim="email"
        label="Correo electrónico"
        type="email"
        :rules="rules.email"
        required
        variant="outlined"
      ></v-text-field>

      <v-text-field
        v-model.trim="password"
        label="Contraseña"
        type="password"
        :rules="rules.password"
        required
        variant="outlined"
      ></v-text-field>

      <v-btn type="submit" color="primary" :loading="isLoading" block> Iniciar sesión </v-btn>
    </v-form>

    <footer class="auth-footer">
      <NuxtLink to="/register"> Regístrate </NuxtLink>
      <NuxtLink to="/recover-password"> Recordar contraseña </NuxtLink>
    </footer>
  </NuxtLayout>
</template>
