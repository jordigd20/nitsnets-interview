<script setup lang="ts">
  import { useDisplay } from 'vuetify';

  const { lgAndUp } = useDisplay();
  const sidebarStore = useSidebarStore();
  const route = useRoute();

  const navigationLinks = ref([{ title: 'Productos', icon: 'mdi-shopping', to: '/dashboard' }]);

  if (lgAndUp.value) {
    sidebarStore.open();
  }
</script>

<template>
  <v-navigation-drawer v-model="sidebarStore.isOpen">
    <template #prepend>
      <v-list-item lines="two" color="primary" title="Dashboard">
        <template #prepend>
          <v-icon
            class="opacity-100"
            color="primary"
            size="large"
            icon="mdi-view-dashboard"
          ></v-icon>
        </template>
        <template #title>
          <v-list-item-title class="text-h5 font-weight-bold"> Dashboard </v-list-item-title>
        </template>
      </v-list-item>
    </template>

    <v-divider></v-divider>

    <v-list density="compact" nav>
      <v-list-item
        v-for="(item, i) in navigationLinks"
        :key="i"
        :value="item.title"
        :active="route.path === item.to"
        color="primary"
        link
        @click="navigateTo(item.to)"
      >
        <template #prepend>
          <v-icon :icon="item.icon"></v-icon>
        </template>

        <v-list-item-title class="text-body-2">
          {{ item.title }}
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
