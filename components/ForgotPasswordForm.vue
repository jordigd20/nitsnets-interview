<script setup lang="ts">
  type Props = {
    error: string;
    isLoading: boolean;
  };

  const { error, isLoading } = defineProps<Props>();
  const emit = defineEmits<{
    submit: [data: { valid: boolean; email: string }];
  }>();
  const { email, emailRules } = useEmail();
  const valid = ref(false);
</script>

<template>
  <v-form
    v-model="valid"
    class="auth-form"
    @submit.prevent="() => emit('submit', { valid, email })"
  >
    <p class="text-body-2 mb-4">
      Introduce tu correo electrónico y te enviaremos un enlace para reestablecer tu contraseña.
    </p>
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

    <v-btn type="submit" color="primary" :loading="isLoading" block> Enviar </v-btn>
  </v-form>
</template>
