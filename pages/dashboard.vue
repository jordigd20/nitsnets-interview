<script setup lang="ts">
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
  const search = ref('');
  const productsError = ref<string | null>(null);

  if (!authStore.token) {
    navigateTo('/');
  }

  try {
    await productsStore.fetchProducts();
  } catch (error) {
    productsError.value = (error as Error).message;
  }

  const { addNewProduct, editProduct, deleteProduct, reorderProducts } = useProductsCrud(
    authStore.token!
  );
</script>

<template>
  <NuxtLayout>
    <v-empty-state
      v-if="productsError"
      class="text-body-1"
      action-text="Reintentar"
      image="https://cdn.vuetifyjs.com/docs/images/components/v-empty-state/connection.svg"
      text="Parece que algo salió mal al cargar los productos. Por favor, intentalo de nuevo más tarde o contacta conmigo si el problema persiste."
      title="Algo salió mal..."
      @click:action="reloadNuxtApp()"
    >
    </v-empty-state>

    <div v-else>
      <h1 class="mb-6">Lista de productos</h1>

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

          <ProductDialog @submit="addNewProduct">
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
          </ProductDialog>
        </div>
      </div>

      <v-data-table
        id="products-table"
        class=""
        :headers="headers"
        :items="productsStore.products"
        :sort-by="productsStore.sortBy"
        :loading="productsStore.isLoading"
        :search="search"
        items-per-page="10"
        no-data-text="No se encontraron productos"
      >
        <template #[`item.sizes`]="{ item }">
          {{ item.sizes.length === 0 ? 'Sin tallas' : item.sizes.join(', ') }}
        </template>

        <template #[`item.isNewCollection`]="{ item }">
          <v-chip :color="item.isNewCollection ? 'green' : 'red'" size="small" label>{{
            item.isNewCollection ? 'Activo' : 'Inactivo'
          }}</v-chip>
        </template>

        <template #[`item.price`]="{ item }">
          {{ item.price.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' }) }}
        </template>

        <template #[`item.actions`]="{ item }">
          <div class="d-flex">
            <ProductDialog :edited-product="item" @submit="editProduct">
              <template #activator="{ props }">
                <v-btn
                  color="primary"
                  variant="text"
                  density="comfortable"
                  rounded="lg"
                  icon="mdi-pencil"
                  v-bind="props"
                ></v-btn>
              </template>
            </ProductDialog>

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
    </div>
  </NuxtLayout>
</template>
