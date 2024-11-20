<script setup lang="ts">
  import type { Product } from '~/interfaces';

  const { editedProduct } = defineProps<{
    editedProduct?: Product;
  }>();
  const emit = defineEmits<{
    submit: [
      {
        product: Product;
        isDialogActive: Ref<boolean, boolean>;
      }
    ];
  }>();

  const productsStore = useProductsStore();

  const resetDialog = () => {
    productsStore.error = null;
  };
</script>

<template>
  <v-dialog max-width="600px" @after-leave="resetDialog">
    <template #activator="{ props }">
      <slot name="activator" :props="props" />
    </template>

    <template #default="{ isActive }">
      <ProductForm
        :product="editedProduct"
        :is-loading="productsStore.isLoading"
        :error="productsStore.error"
        @close-dialog="isActive.value = false"
        @submit="({ product }) => emit('submit', { product, isDialogActive: isActive })"
      />
    </template>
  </v-dialog>
</template>
