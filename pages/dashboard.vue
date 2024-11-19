<script setup lang="ts">
  import type { Product } from '~/interfaces';

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

  const editProduct = (product: Product) => {
    productsStore.editProduct(product);
    dialog.value = false;
  };

  const addNewProduct = (product: Product) => {
    const lastId = productsStore.products.reduce(
      (acc, product) => (product.id > acc ? product.id : acc),
      0
    );

    productsStore.addProduct({
      ...product,
      id: lastId + 1
    });
    dialog.value = false;
  };

  const deleteProduct = (isActive: Ref<boolean, boolean>, product: Product) => {
    productsStore.deleteProduct(product.id);
    isActive.value = false;
  };

  const resetDialog = () => {
    editedProduct.value = null;
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
        ></v-text-field>

        <div class="d-flex align-center ga-2 ga-sm-4">
          <v-btn color="primary" size="large" variant="elevated" prepend-icon="mdi-swap-vertical">
            Ordenar
          </v-btn>

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
              @close-dialog="dialog = false"
              @submit="handleProductForm"
            />
          </v-dialog>
        </div>
      </div>

      <v-data-table
        :headers="headers"
        :items="productsStore.products"
        :sort-by="[{ key: 'id', order: 'asc' }]"
        :loading="productsStore.isLoading"
        :search="search"
        items-per-page="10"
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
