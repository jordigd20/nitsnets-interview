import type { Product, ProductsResponse } from '~/interfaces';

export const useProductsStore = defineStore('products', () => {
  const products = ref<Product[]>([]);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  const fetchProducts = async (token: string) => {
    isLoading.value = true;

    const { data, error: responseError } = await useFetch<ProductsResponse>(
      `${BASE_API_URL}/products`,
      {
        headers: {
          Authorization: `Bearer ${token}`
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
    error.value = null;
    isLoading.value = false;
  };

  const getProductById = (productId: number) => {
    return products.value.find((product) => product.id === productId);
  };

  const addProduct = async (product: Product) => {
    isLoading.value = true;

    const response = await $fetch<Product>(`${BASE_API_URL}/products`, {
      method: 'POST',
      body: product
    });

    if (!response) {
      isLoading.value = false;
      throw new Error('Ha ocurrido un error al crear el producto');
    }

    const lastId = products.value.reduce(
      (acc, product) => (product.id > acc ? product.id : acc),
      0
    );
    products.value.push({ ...product, id: lastId + 1 });
    error.value = null;
    isLoading.value = false;
  };

  const editProduct = async (product: Product) => {
    isLoading.value = true;

    const response = await $fetch<Product>(`${BASE_API_URL}/products/${product.id}`, {
      method: 'PUT',
      body: product
    });

    if (!response) {
      isLoading.value = false;
      throw new Error('Ha ocurrido un error al editar el producto');
    }

    const index = products.value.findIndex((p) => p.id === product.id);
    products.value[index] = product;
    error.value = null;
    isLoading.value = false;
  };

  const deleteProduct = async (productId: number) => {
    isLoading.value = true;

    const response = await $fetch<{ message: string; status: string }>(
      `${BASE_API_URL}/products/${productId}`,
      { method: 'DELETE' }
    );

    if (!response) {
      isLoading.value = false;
      throw new Error('Ha ocurrido un error al eliminar el producto');
    }

    const index = products.value.findIndex((p) => p.id === productId);
    products.value.splice(index, 1);
    error.value = null;
    isLoading.value = false;
  };

  const setError = (errorMessage: string) => {
    error.value = errorMessage;
  };

  return {
    products,
    isLoading,
    error,
    fetchProducts,
    getProductById,
    addProduct,
    editProduct,
    deleteProduct,
    setError
  };
});
