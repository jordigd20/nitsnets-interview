<script setup lang="ts">
  import { useEmail } from '~/composables/auth';

  const { email, emailRules } = useEmail();
  const valid = ref(false);
  const isLoading = ref(false);

  const handleSubmit = async () => {
    console.log({ valid: valid.value, email: email.value });

    if (!valid.value) {
      return;
    }

    isLoading.value = true;
    //TODO: Call the recover endpoint
    isLoading.value = false;
  };
</script>

<template>
  <NuxtLayout name="auth">
    <h1>Recuperar contraseña</h1>

    <v-form v-model="valid" class="auth-form" @submit.prevent="handleSubmit">
      <v-text-field
        v-model.trim="email"
        label="Correo electrónico"
        type="email"
        :rules="emailRules"
        required
        variant="outlined"
      ></v-text-field>

      <v-btn type="submit" color="primary" :loading="isLoading" block> Recuperar </v-btn>
    </v-form>

    <footer class="auth-footer">
      <NuxtLink to="/"> Iniciar sesión </NuxtLink>
    </footer>
  </NuxtLayout>
</template>
