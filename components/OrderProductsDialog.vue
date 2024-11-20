<script setup lang="ts">
  import draggable from 'vuedraggable';
  import type { Product } from '~/interfaces';

  const productsStore = useProductsStore();
  const { products, isLoading } = defineProps<{
    products: Product[];
    isLoading: boolean;
    error: string | null;
  }>();
  const emit = defineEmits<{
    confirm: [{ isDialogActive: Ref<boolean, boolean>; products: Product[] }];
  }>();

  const dragOptions = ref({
    animation: 200,
    group: 'description',
    disabled: false,
    ghostClass: 'ghost'
  });

  const productsList = ref(products.map((product) => ({ id: product.id, name: product.title })));

  watch(productsStore.products, (updatedProducts) => {
    console.log('updatedProducts', updatedProducts);
    productsList.value = updatedProducts.map((product) => ({
      id: product.id,
      name: product.title
    }));
  });

  const handleReorderProducts = (isActive: Ref<boolean, boolean>) => {
    const reorderedProducts = productsList.value.map((product) => {
      const foundProduct = productsStore.getProductById(product.id);
      return foundProduct as Product;
    });

    emit('confirm', { isDialogActive: isActive, products: reorderedProducts });
  };

  const dragging = ref(false);
</script>

<template>
  <v-dialog max-width="600px">
    <template #activator="{ props }">
      <slot name="activator" :props="props" />
    </template>

    <template #default="{ isActive }">
      <v-card>
        <v-card-title class="pt-6">
          <h3 class="text-h5 ps-6">Ordenar productos</h3>
        </v-card-title>

        <v-card-text>
          <draggable
            v-model="productsList"
            item-key="id"
            class="list-group"
            v-bind="dragOptions"
            @start="dragging = true"
            @end="dragging = false"
          >
            <template #item="{ element }">
              <div class="list-group-item">{{ element.id }}. {{ element.name }}</div>
            </template>
          </draggable>

          <v-alert v-if="error" class="mt-4" type="error" variant="tonal" density="compact">
            {{ error || 'Ha ocurrido un error' }}
          </v-alert>

          <div class="mt-4 d-flex justify-end ga-2">
            <v-btn variant="text" size="large" @click="isActive.value = false"> Cancelar </v-btn>
            <v-btn
              :loading="isLoading"
              size="large"
              color="primary"
              @click="handleReorderProducts(isActive)"
            >
              Confirmar
            </v-btn>
          </div>
        </v-card-text>
      </v-card>
    </template>
  </v-dialog>
</template>

<style scoped>
  .list-group {
    border: 1px solid #ccc;
    margin: 0 auto;
    border-radius: 5px;
  }

  .list-group-item {
    padding: 10px;
    border-bottom: 1px solid #ccc;
    cursor: move;
  }

  .list-group-item:last-child {
    border-bottom: none;
  }

  .ghost {
    opacity: 0.5;
    background: #dcedff;
  }

  .flip-list-move {
    transition: transform 0.5s;
  }

  .no-move {
    transition: transform 0s;
  }
</style>
