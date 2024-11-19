<script setup lang="ts">
  const { title, confirmText, isDestructive, isLoading } = defineProps<{
    title: string;
    confirmText: string;
    isDestructive: boolean;
    isLoading: boolean;
  }>();
  const emit = defineEmits<{
    confirm: [Ref<boolean, boolean>];
  }>();
</script>

<template>
  <v-dialog max-width="500px">
    <template #activator="{ props }">
      <slot name="confirmActivator" :props="props" />
    </template>

    <template #default="{ isActive }">
      <v-card class="pa-6">
        <h3>{{ title }}</h3>
        <slot name="description" />

        <div class="mt-3 d-flex justify-center ga-2">
          <v-btn variant="text" size="large" @click="isActive.value = false"> Cancelar </v-btn>
          <v-btn
            size="large"
            :color="isDestructive ? 'error' : 'primary'"
            :loading="isLoading"
            @click="() => emit('confirm', isActive)"
          >
            {{ confirmText }}
          </v-btn>
        </div>
      </v-card>
    </template>
  </v-dialog>
</template>
