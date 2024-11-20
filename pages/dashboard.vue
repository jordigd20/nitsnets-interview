<script setup lang="ts">
  import type { Product } from '~/interfaces';

  type SortItem = {
    key: string;
    order?: boolean | 'asc' | 'desc';
  };

  definePageMeta({ middleware: 'auth' });

  const authStore = useAuthStore();
  const productsStore = useProductsStore();

  const headers = ref([
    { title: 'Id', align: 'start' as const, key: 'id' },
    { title: 'Título', key: 'title' },
    { title: 'Categoría', key: 'category' },
    { title: 'Género', key: 'gender' },
    { title: 'Tallas', key: 'sizes' },
    { title: 'Nueva colección', key: 'isNewCollection' },
    { title: 'Precio', key: 'price' },
    { title: 'Stock', key: 'stock' },
    { title: 'Acciones', sortable: false, key: 'actions' }
  ]);
  const editedProduct = ref<Product | null>(null);
  const dialog = ref(false);
  const search = ref('');
  const sortBy = ref<SortItem[]>([{ key: 'id', order: 'asc' }]);

  if (authStore.token) {
    productsStore.fetchProducts(authStore.token);
  }

  const handleProductForm = ({ product, type }: { product: Product; type: 'add' | 'edit' }) => {
    if (type === 'edit') {
      editProduct(product);
      return;
    }

    addNewProduct(product);
  };

  const editProduct = async (product: Product) => {
    try {
      await productsStore.editProduct(product);
      dialog.value = false;
    } catch (error) {
      console.error(error);
      productsStore.setIsLoading(false);
      productsStore.setError('Ha ocurrido un error al editar el producto');
    }
  };

  const addNewProduct = async (product: Product) => {
    try {
      await productsStore.addProduct(product);
      dialog.value = false;
    } catch (error) {
      console.error(error);
      productsStore.setIsLoading(false);
      productsStore.setError('Ha ocurrido un error al añadir el producto');
    }
  };

  const deleteProduct = async (isDialogActive: Ref<boolean, boolean>, product: Product) => {
    try {
      await productsStore.deleteProduct(product.id);
      isDialogActive.value = false;
    } catch (error) {
      console.error(error);
      productsStore.setIsLoading(false);
      productsStore.setError('Ha ocurrido un error al eliminar el producto');
    }
  };

  const reorderProducts = async ({
    isDialogActive,
    products
  }: {
    isDialogActive: Ref<boolean, boolean>;
    products: Product[];
  }) => {
    try {
      await productsStore.reorderProducts(products);
      sortBy.value = [];
      isDialogActive.value = false;
    } catch (error) {
      console.error(error);
      productsStore.setIsLoading(false);
      productsStore.setError('Ha ocurrido un error al reordenar los productos');
    }
  };

  const resetDialog = () => {
    editedProduct.value = null;
    productsStore.error = null;
  };

  const openEditDialog = (product: Product) => {
    editedProduct.value = product;
    dialog.value = true;
  };
</script>

<template>
  <NuxtLayout>
    <h1 class="mb-6">Lista de productos</h1>

    <main>
      <div class="d-flex justify-space-between align-center ga-4 flex-wrap">
        <v-text-field
          v-model.trim="search"
          label="Buscar"
          placeholder="Buscar"
          variant="outlined"
          prepend-inner-icon="mdi-magnify"
          hide-details="auto"
          density="comfortable"
          max-width="650px"
          single-line
          clearable
        ></v-text-field>

        <div class="d-flex align-center ga-2 ga-sm-4">
          <OrderProductsDialog
            :products="productsStore.products"
            :is-loading="productsStore.isLoading"
            :error="productsStore.error"
            @confirm="reorderProducts"
          >
            <template #activator="{ props }">
              <v-btn
                color="primary"
                size="large"
                variant="elevated"
                prepend-icon="mdi-swap-vertical"
                v-bind="props"
              >
                Ordenar
              </v-btn>
            </template>
          </OrderProductsDialog>

          <v-dialog v-model="dialog" max-width="600px" @after-leave="resetDialog">
            <template #activator="{ props }">
              <v-btn
                color="primary"
                size="large"
                variant="elevated"
                v-bind="props"
                prepend-icon="mdi-plus"
              >
                Añadir
              </v-btn>
            </template>

            <ProductForm
              :product="editedProduct"
              :is-loading="productsStore.isLoading"
              :error="productsStore.error"
              @close-dialog="dialog = false"
              @submit="handleProductForm"
            />
          </v-dialog>
        </div>
      </div>

      <v-data-table
        :headers="headers"
        :items="productsStore.products"
        :sort-by="sortBy"
        :loading="productsStore.isLoading"
        :search="search"
        items-per-page="10"
        no-data-text="No se encontraron productos"
      >
        <template #[`item.isNewCollection`]="{ item }">
          <v-chip :color="item.isNewCollection ? 'green' : 'red'" size="small" label>{{
            item.isNewCollection
          }}</v-chip>
        </template>

        <template #[`item.actions`]="{ item }">
          <div class="d-flex">
            <v-btn
              color="primary"
              variant="text"
              density="comfortable"
              rounded="lg"
              icon="mdi-pencil"
              @click="openEditDialog(item)"
            ></v-btn>

            <ConfirmDialog
              title="Eliminar producto"
              confirm-text="Eliminar"
              :is-destructive="true"
              :is-loading="productsStore.isLoading"
              @confirm="deleteProduct($event, item)"
            >
              <template #confirmActivator="{ props }">
                <v-btn
                  color="error"
                  variant="text"
                  density="comfortable"
                  rounded="lg"
                  icon="mdi-delete"
                  v-bind="props"
                ></v-btn>
              </template>
              <template #description>
                <div>
                  <span class="opacity-90">¿Estás seguro de que quieres eliminar </span>
                  <strong>{{ item.title }}</strong
                  ><span class="opacity-90">?</span>
                </div>
              </template>
            </ConfirmDialog>
          </div>
        </template>
      </v-data-table>
    </main>
  </NuxtLayout>
</template>
