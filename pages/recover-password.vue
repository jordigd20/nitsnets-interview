<script setup lang="ts">
  const email = ref('');
  const valid = ref(false);
  const isLoading = ref(false);

  const rules = [
    (value: string) => !!value || 'El correo electrónico es obligatorio',
    (value: string) => isValidEmail(value) || 'El correo electrónico debe ser válido'
  ];

  const handleSubmit = async (e: Event) => {
    console.log(e, 'Form submitted');
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
        :rules="rules"
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
