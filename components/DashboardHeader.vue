<script setup lang="ts">
  import { useDisplay } from 'vuetify';

  const sidebarStore = useSidebarStore();
  const authStore = useAuthStore();

  const { mdAndDown } = useDisplay();
  const breadcrumbs = ref([
    {
      title: 'Inicio',
      disabled: false,
      to: '/dashboard'
    },
    {
      title: 'Productos',
      disabled: true
    }
  ]);

  const logout = () => {
    authStore.logout();
    navigateTo('/');
  };
</script>

<template>
  <v-app-bar scroll-behavior="elevate" color="primary">
    <template #prepend>
      <v-app-bar-nav-icon v-if="mdAndDown" @click="sidebarStore.open"></v-app-bar-nav-icon>
    </template>

    <template #title>
      <v-breadcrumbs class="text-subtitle-1" :items="breadcrumbs">
        <template #divider>
          <v-icon icon="mdi-chevron-right"></v-icon>
        </template>
      </v-breadcrumbs>
    </template>

    <v-menu>
      <template #activator="{ props }">
        <v-btn prepend-icon="mdi-account-circle" v-bind="props" size="large">
          {{ authStore.user?.name }}
        </v-btn>
      </template>
      <v-list>
        <v-list-item
          :title="authStore.user?.name"
          :subtitle="authStore.user?.email"
          prepend-avatar="/images/no-photo.webp"
          lines="two"
          density="compact"
        >
        </v-list-item>

        <v-divider></v-divider>

        <v-list-item value="index" prepend-icon="mdi-logout" @click="logout">
          <v-list-item-title>Cerrar sesión</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>
