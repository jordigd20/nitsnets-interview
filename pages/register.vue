<script setup lang="ts">
  import { useEmail, usePassword, useNif, useConfirmPassword } from '~/composables/auth';

  const { email, emailRules } = useEmail();
  const { password, passwordRules } = usePassword();
  const { nif, nifRules } = useNif();
  const { confirmPassword, confirmPasswordRules } = useConfirmPassword(password);
  const name = ref('');
  const valid = ref(false);
  const isLoading = ref(false);

  const rules = {
    email: emailRules,
    nif: nifRules,
    password: passwordRules,
    confirmPassword: confirmPasswordRules
  };

  const handleSubmit = async () => {
    console.log({
      name: name.value,
      valid: valid.value,
      email: email.value,
      nif: nif.value,
      password: password.value,
      confirmPassword: confirmPassword.value
    });

    if (!valid.value) return;
    if (password.value !== confirmPassword.value) return;

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
        v-model.trim="name"
        label="Nombre"
        type="text"
        variant="outlined"
      ></v-text-field>

      <v-text-field
        v-model.trim="email"
        label="* Correo electrónico"
        type="email"
        :rules="rules.email"
        required
        variant="outlined"
      ></v-text-field>

      <v-text-field
        v-model.trim="nif"
        label="* NIF"
        type="text"
        :rules="rules.nif"
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

      <v-text-field
        v-model.trim="confirmPassword"
        label="* Confirmar contraseña"
        type="password"
        :rules="rules.confirmPassword"
        required
        variant="outlined"
      ></v-text-field>

      <p class="auth-reminder">Los campos marcados con un (*) son obligatorios.</p>

      <v-btn type="submit" color="primary" :loading="isLoading" block> Crear cuenta </v-btn>
    </v-form>

    <footer class="auth-footer">
      <NuxtLink to="/"> Iniciar sesión </NuxtLink>
    </footer>
  </NuxtLayout>
</template>
