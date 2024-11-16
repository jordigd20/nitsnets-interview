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

    <v-alert v-if="error" class="mb-4" type="error" variant="tonal" density="compact">
      {{ error }}
    </v-alert>

    <v-btn type="submit" color="primary" :loading="isLoading" block> Enviar </v-btn>
  </v-form>
</template>
