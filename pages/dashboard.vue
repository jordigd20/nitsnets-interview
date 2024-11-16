<script setup lang="ts">
  definePageMeta({ middleware: 'auth' });

  const authStore = useAuthStore();

  const logout = () => {
    authStore.logout();
    navigateTo('/');
  };
</script>

<template>
  <NuxtLayout>
    <h1>Dashboard</h1>
    <v-btn @click="logout">Logout</v-btn>

    <pre>{{ authStore.user ?? 'null' }}</pre>
    <br />
    <pre>{{ authStore.token }}</pre>
  </NuxtLayout>
</template>
