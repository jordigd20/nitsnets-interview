<script setup lang="ts">
  const authStore = useAuthStore();
  const isLoading = ref(false);
  const error = ref('');
  const isEmailSent = ref(false);

  const handleSubmit = async ({ valid, email }: { valid: boolean; email: string }) => {
    if (!valid) return;

    isLoading.value = true;

    try {
      await authStore.forgotPassword(email);

      isEmailSent.value = true;
    } catch (err) {
      console.error(err);
      error.value = (err as Error).message;
    }

    isLoading.value = false;
  };
</script>

<template>
  <NuxtLayout name="auth">
    <h1>{{ !isEmailSent ? '¿Has olvidado tu contraseña?' : 'Correo enviado' }}</h1>

    <ForgotPasswordForm
      v-if="!isEmailSent"
      :error="error"
      :is-loading="isLoading"
      @submit="handleSubmit"
    />
    <EmailSent v-else />

    <footer class="auth-footer">
      <NuxtLink to="/"> Iniciar sesión </NuxtLink>
    </footer>
  </NuxtLayout>
</template>
