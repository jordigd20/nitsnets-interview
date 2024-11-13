<script setup lang="ts">
  const email = ref('');
  const nif = ref('');
  const password = ref('');
  const confirmPassword = ref('');
  const valid = ref(false);
  const isLoading = ref(false);

  const rules = {
    email: [
      (value: string) => !!value || 'El correo electrónico es obligatorio',
      (value: string) => isValidEmail(value) || 'El correo electrónico debe ser válido'
    ],
    nif: [
      (value: string) => !!value || 'El NIF es obligatorio',
      (value: string) => isValidNif(value) || 'El NIF debe ser válido'
    ],
    password: [
      (value: string) => !!value || 'La contraseña es obligatoria',
      (value: string) =>
        isValidPassword(value) ||
        'La contraseña debe tener mínimo una mayúscula, un número y un carácter especial'
    ],
    confirmPassword: [
      (value: string) => !!value || 'La confirmación de la contraseña es obligatoria',
      (value: string) => value === password.value || 'Las contraseñas no coinciden'
    ]
  };

  const handleSubmit = async (e: Event) => {
    console.log(e, 'Form submitted');
    console.log({
      valid: valid.value,
      email: email.value,
      nif: nif.value,
      password: password.value,
      confirmPassword: confirmPassword.value
    });

    if (!valid.value) {
      return;
    }

    isLoading.value = true;
    //TODO: Call the register endpoint
    isLoading.value = false;
  };
</script>

<template>
  <NuxtLayout name="auth">
    <h1>Crear cuenta</h1>

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
        v-model.trim="nif"
        label="NIF"
        type="text"
        :rules="rules.nif"
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

      <v-text-field
        v-model.trim="confirmPassword"
        label="Confirmar contraseña"
        type="password"
        :rules="rules.confirmPassword"
        required
        variant="outlined"
      ></v-text-field>

      <v-btn type="submit" color="primary" :loading="isLoading" block> Crear cuenta </v-btn>
    </v-form>

    <footer class="auth-footer">
      <NuxtLink to="/"> Iniciar sesión </NuxtLink>
    </footer>
  </NuxtLayout>
</template>
