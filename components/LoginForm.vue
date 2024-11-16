<script setup lang="ts">
  import type { LoginForm } from '~/interfaces';

  const authStore = useAuthStore();
  const { email, emailRules } = useEmail();
  const { password, passwordRules } = usePassword();
  const valid = ref(false);

  const rules = {
    email: emailRules,
    password: passwordRules
  };

  const emit = defineEmits<{
    submit: [data: LoginForm];
  }>();
</script>

<template>
  <v-form
    v-model="valid"
    class="auth-form"
    @submit.prevent="() => emit('submit', { valid, email, password })"
  >
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

    <v-alert v-if="authStore.error" class="mb-4" type="error" variant="tonal" density="compact">
      {{ authStore.error }}
    </v-alert>

    <v-btn type="submit" color="primary" :loading="authStore.isLoading" block>
      Iniciar sesión
    </v-btn>
  </v-form>
</template>
