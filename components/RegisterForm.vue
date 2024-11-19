<script setup lang="ts">
  type Props = {
    isLoading: boolean;
    alert: {
      display: boolean;
      type: 'error' | 'success' | 'info' | 'warning';
      message: string;
    };
  };
  const { alert, isLoading } = defineProps<Props>();
  const emit = defineEmits<{
    submit: [
      {
        valid: boolean;
        name: string;
        email: string;
        nif: string;
        password: string;
        confirmPassword: string;
      }
    ];
  }>();

  const { email, emailRules } = useEmail();
  const { password, passwordRules } = usePassword();
  const { nif, nifRules } = useNif();
  const { confirmPassword, confirmPasswordRules } = useConfirmPassword(password);
  const name = ref('');
  const valid = ref(false);

  const rules = {
    name: [(v: string) => v.length <= 30 || 'El nombre debe tener menos de 30 caracteres'],
    email: emailRules,
    nif: nifRules,
    password: passwordRules,
    confirmPassword: confirmPasswordRules
  };
</script>

<template>
  <v-form
    v-model="valid"
    class="auth-form"
    @submit.prevent="() => emit('submit', { valid, name, email, nif, password, confirmPassword })"
  >
    <v-text-field
      v-model.trim="name"
      :rules="rules.name"
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

    <v-alert v-if="alert.display" class="mb-4" :type="alert.type" variant="tonal" density="compact">
      {{ alert.message }}
    </v-alert>

    <v-btn type="submit" color="primary" :loading="isLoading" block> Crear cuenta </v-btn>
  </v-form>
</template>
