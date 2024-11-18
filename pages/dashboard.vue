<script setup lang="ts">
  import { useDisplay } from 'vuetify';
  import type { Product, ProductsResponse } from '~/interfaces';

  definePageMeta({ middleware: 'auth' });

  const authStore = useAuthStore();
  const { smAndUp } = useDisplay();
  const headers = ref([
    { title: 'Id', align: 'start' as const, key: 'id' },
    { title: 'Título', key: 'title' },
    { title: 'Category', key: 'category' },
    { title: 'Brand', key: 'brand' },
    { title: 'Price', key: 'price' },
    { title: 'Stock', key: 'stock' },
    { title: 'Actions', sortable: false, key: 'actions' }
  ]);
  const products = ref<Product[]>([]);
  const error = ref('');

  const initialize = async () => {
    const { data, error: responseError } = await useFetch<ProductsResponse>(
      `${BASE_API_URL}/products`,
      {
        headers: {
          Authorization: `Bearer ${authStore.token}`
        }
      }
    );

    if (responseError.value || !data.value) {
      console.error(error);
      error.value =
        'Ha ocurrido un error al cargar los productos. Por favor, intentalo de nuevo más tarde.';
      return;
    }

    products.value = data.value.products;
  };

  const editItem = (item: Product) => {};

  const deleteItem = (item: Product) => {};

  const logout = () => {
    authStore.logout();
    navigateTo('/');
  };

  initialize();
</script>

<template>
  <NuxtLayout>
    <h1>Dashboard</h1>
    <v-btn @click="logout">Logout</v-btn>

    <!-- <pre>{{ authStore.user ?? 'null' }}</pre> -->
    <!-- <br /> -->
    <!-- <span>{{ authStore.token }}</span> -->

    <main>
      <v-data-table
        :headers="headers"
        :items="products"
        :sort-by="[{ key: 'id', order: 'asc' }]"
        items-per-page="10"
      >
        <template #top>
          <div class="d-flex justify-space-between align-center ga-4">
            <v-text-field
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
              <v-btn
                v-if="smAndUp"
                color="primary"
                size="large"
                variant="elevated"
                prepend-icon="mdi-swap-vertical"
              >
                Ordenar
              </v-btn>
              <v-btn
                v-else
                color="primary"
                variant="elevated"
                rounded="lg"
                icon="mdi-swap-vertical"
              ></v-btn>

              <v-dialog max-width="500px">
                <template #activator="{ props }">
                  <v-btn
                    v-if="smAndUp"
                    color="primary"
                    size="large"
                    variant="elevated"
                    v-bind="props"
                    prepend-icon="mdi-plus"
                  >
                    Añadir
                  </v-btn>
                  <v-btn
                    v-else
                    color="primary"
                    variant="elevated"
                    rounded="lg"
                    v-bind="props"
                    icon="mdi-plus"
                  ></v-btn>
                </template>
              </v-dialog>
            </div>
          </div>
        </template>

        <template #[`item.actions`]="{ item }">
          <div class="d-flex">
            <v-btn
              color="primary"
              variant="text"
              density="comfortable"
              rounded="lg"
              icon="mdi-pencil"
              @click="editItem(item)"
            >
            </v-btn>
            <v-btn
              color="error"
              variant="text"
              density="comfortable"
              rounded="lg"
              icon="mdi-delete"
              @click="deleteItem(item)"
            >
            </v-btn>
          </div>
        </template>
      </v-data-table>
    </main>
  </NuxtLayout>
</template>
