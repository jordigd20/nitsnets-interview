<script setup lang="ts">
  import { useDisplay } from 'vuetify';
  import type { Category, Product } from '~/interfaces';

  type ProductWithOptionalCategory = Omit<Product, 'category'> & { category?: Category };

  const { product: productProp } = defineProps<{
    product: Product | null;
  }>();
  const emit = defineEmits<{
    closeDialog: [];
    submit: [{ product: Product; type: 'add' | 'edit' }];
  }>();
  const { name } = useDisplay();

  const defaultProduct: ProductWithOptionalCategory = {
    id: 0,
    title: '',
    description: '',
    category: undefined,
    price: 0,
    stock: 0,
    sizes: [],
    gender: 'Hombre',
    isNewCollection: false
  };
  const selectedProduct = ref<ProductWithOptionalCategory>(
    productProp ? { ...productProp } : defaultProduct
  );
  const valid = ref(false);

  const rules = {
    title: [
      (v: string) => !!v || 'El título es obligatorio',
      (v: string) => v.length <= 100 || 'El título debe tener menos de 100 caracteres'
    ],
    category: [
      (v: string) => !!v || 'La categoría es obligatoria',
      (v: string) => (CATEGORIES as readonly string[]).includes(v) || 'La categoría no es válida'
    ],
    price: [
      (v: number) => !!v || 'El precio es obligatorio',
      (v: number) => v >= 0 || 'El precio debe ser mayor o igual a 0'
    ],
    stock: [
      (v: number) => !!v || 'El stock es obligatorio',
      (v: number) => v >= 0 || 'El stock debe ser mayor o igual a 0'
    ]
  };
  const buttonSizes = {
    xs: 'x-small',
    sm: 'small',
    md: undefined,
    lg: undefined,
    xl: undefined,
    xxl: undefined
  };

  const onSubmit = () => {
    if (!valid.value) return;

    const newProduct: Product = {
      ...defaultProduct,
      ...selectedProduct.value,
      category: selectedProduct.value.category!
    };

    if (productProp) {
      emit('submit', { product: newProduct, type: 'edit' });
      return;
    }

    emit('submit', { product: newProduct, type: 'add' });
  };
</script>

<template>
  <v-card>
    <v-card-title class="pt-6">
      <h3 class="text-h5 ps-6">{{ productProp ? 'Editar' : 'Añadir' }} producto</h3>
    </v-card-title>

    <v-card-text>
      <v-form v-model="valid" @submit.prevent="onSubmit">
        <v-container class="pb-0">
          <v-row class="px-3 pb-3">
            <v-text-field
              v-model.trim="selectedProduct.title"
              label="* Título"
              :rules="rules.title"
              variant="outlined"
              required
            ></v-text-field>
          </v-row>

          <v-row class="px-3 pb-3">
            <v-textarea
              v-model.trim="selectedProduct.description"
              class="text-body-2"
              label="Descripción"
              variant="outlined"
              rows="4"
            ></v-textarea>
          </v-row>

          <v-row class="px-3 pb-3">
            <v-autocomplete
              v-model.trim="selectedProduct.category"
              label="* Categoría"
              :items="CATEGORIES"
              :rules="rules.category"
              no-data-text="No se encontraron resultados"
              variant="outlined"
              clearable
              required
            ></v-autocomplete>
          </v-row>

          <v-row>
            <v-col>
              <v-text-field
                v-model.trim="selectedProduct.price"
                label="* Precio"
                type="number"
                :rules="rules.price"
                variant="outlined"
                required
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                v-model.trim="selectedProduct.stock"
                label="* Stock"
                type="number"
                :rules="rules.stock"
                variant="outlined"
                required
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row class="px-3">
            <div class="d-flex align-center flex-wrap ga-2">
              <span>Tallas</span>
              <v-btn-toggle
                v-model="selectedProduct.sizes"
                color="primary"
                variant="outlined"
                multiple
                divided
              >
                <v-btn :size="buttonSizes[name]" value="XS">XS</v-btn>
                <v-btn :size="buttonSizes[name]" value="S">S</v-btn>
                <v-btn :size="buttonSizes[name]" value="M">M</v-btn>
                <v-btn :size="buttonSizes[name]" value="L">L</v-btn>
                <v-btn :size="buttonSizes[name]" value="XL">XL</v-btn>
                <v-btn :size="buttonSizes[name]" value="2XL">2XL</v-btn>
              </v-btn-toggle>
            </div>
          </v-row>

          <v-row class="px-1 mt-5">
            <v-checkbox
              v-model="selectedProduct.isNewCollection"
              class="on-sale-checkbox"
              label="Nueva coleccion"
              color="primary"
              density="comfortable"
              hide-details="auto"
            ></v-checkbox>
          </v-row>

          <v-row class="pt-3">
            <v-radio-group
              v-model="selectedProduct.gender"
              class="gender-radio"
              label="* Género"
              inline
              hide-details="auto"
            >
              <v-radio label="Hombre" color="primary" value="Hombre"> </v-radio>
              <v-radio label="Mujer" color="primary" value="Mujer"> </v-radio>
              <v-radio label="Unisex" color="primary" value="Unisex"> </v-radio>
            </v-radio-group>
          </v-row>

          <v-row class="mt-6">
            <p>Los campos marcados con un (*) son obligatorios.</p>
          </v-row>

          <v-row class="justify-end ga-2 py-2">
            <v-btn size="large" variant="text" @click="() => emit('closeDialog')"> Cancelar </v-btn>
            <v-btn type="submit" size="large" class="text-none" color="primary" variant="flat">
              Guardar
            </v-btn>
          </v-row>
        </v-container>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<style>
  .gender-radio label,
  .on-sale-checkbox label {
    opacity: 1;
  }

  .gender-radio .v-selection-control-group {
    margin-top: 0 !important;
  }
</style>
