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
  const dragging = ref(false);
  const hasConfirmed = ref(false);
  const initialList = ref<{ id: number; name: string }[]>(
    products.map((product) => ({ id: product.id, name: product.title }))
  );
  const productsList = ref<{ id: number; name: string }[]>(initialList.value);

  watch(
    () => productsStore.products,
    (updatedProducts) => {
      initialList.value = updatedProducts.map((product) => ({
        id: product.id,
        name: product.title
      }));
    },
    { deep: true }
  );

  const handleReorderProducts = (isActive: Ref<boolean, boolean>) => {
    const reorderedProducts = productsList.value.map((product) => {
      const foundProduct = productsStore.getProductById(product.id);
      return foundProduct as Product;
    });

    hasConfirmed.value = true;
    emit('confirm', { isDialogActive: isActive, products: reorderedProducts });
  };

  const onAfterEnter = () => {
    productsList.value = initialList.value;
  };

  const onAfterLeave = () => {
    if (hasConfirmed.value) return;

    productsList.value = initialList.value;
    hasConfirmed.value = false;
  };
</script>

<template>
  <v-dialog max-width="600px" @after-enter="onAfterEnter" @after-leave="onAfterLeave">
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
    background: #e3f2fd;
  }

  .flip-list-move {
    transition: transform 0.5s;
  }

  .no-move {
    transition: transform 0s;
  }
</style>
