<script setup lang="ts">
  /* eslint-disable no-useless-escape */
  const email = ref('');
  const password = ref('');
  const valid = ref(false);
  const isLoading = ref(false);

  // https://github.com/colinhacks/zod/blob/40e72f9eaf576985f876d1afc2dbc22f73abc1ba/src/types.ts#L595
  const emailRegex =
    /^(?!\.)(?!.*\.\.)([A-Z0-9_'+\-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i;

  const rules = {
    email: [
      (value: string) => !!value || 'El correo electrónico es obligatorio',
      (value: string) => emailRegex.test(value) || 'El correo electrónico debe ser válido'
    ],
    password: [(value: string) => !!value || 'La contraseña es obligatoria']
  };

  const handleSubmit = async (e: Event) => {
    console.log(e, 'Form submitted');
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
        label="Correo electrónico"
        type="email"
        :v-model="email"
        :rules="rules.email"
        required
        variant="outlined"
      ></v-text-field>

      <v-text-field
        label="Contraseña"
        type="password"
        :v-model="password"
        :rules="rules.password"
        required
        variant="outlined"
      ></v-text-field>

      <v-btn type="submit" color="primary" block :loading="isLoading"> Iniciar sesión </v-btn>
    </v-form>

    <footer class="auth-footer">
      <NuxtLink to="/register"> Regístrate </NuxtLink>
      <NuxtLink to="/recover-password"> Recordar contraseña </NuxtLink>
    </footer>
  </NuxtLayout>
</template>

<style scoped>
  .auth-form .v-input {
    margin-bottom: 1rem;
  }
</style>
