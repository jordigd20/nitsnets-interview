import type { Product, ProductsResponse } from '~/interfaces';

type SortItem = {
  key: string;
  order?: boolean | 'asc' | 'desc';
};

export const useProductsStore = defineStore('products', () => {
  const products = ref<Product[]>([]);
  const sortBy = ref<SortItem[]>([{ key: 'id', order: 'asc' }]);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  const fetchProducts = async () => {
    isLoading.value = true;

    const { data, error: responseError } = await useFetch<ProductsResponse>(
      `${BASE_API_URL}/products`
    );

    if (responseError.value || !data.value) {
      console.error(error);
      isLoading.value = false;
      throw new Error('Ha ocurrido un error al cargar los productos');
    }

    products.value = data.value.products;
    isLoading.value = false;
  };

  const getProductById = (productId: number) => {
    return products.value.find((product) => product.id === productId);
  };

  const addProduct = async (product: Product, token: string) => {
    isLoading.value = true;

    const response = await $fetch<Product>(`${BASE_API_URL}/products`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: product
    });

    if (!response) {
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

  const editProduct = async (product: Product, token: string) => {
    isLoading.value = true;

    const response = await $fetch<Product>(`${BASE_API_URL}/products/${product.id}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: product
    });

    if (!response) {
      throw new Error('Ha ocurrido un error al editar el producto');
    }

    const index = products.value.findIndex((p) => p.id === product.id);
    products.value[index] = product;
    error.value = null;
    isLoading.value = false;
  };

  const deleteProduct = async (productId: number, token: string) => {
    isLoading.value = true;

    const response = await $fetch<{ message: string; status: string }>(
      `${BASE_API_URL}/products/${productId}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    if (!response) {
      throw new Error('Ha ocurrido un error al eliminar el producto');
    }

    const index = products.value.findIndex((p) => p.id === productId);
    products.value.splice(index, 1);
    error.value = null;
    isLoading.value = false;
  };

  const reorderProducts = async (newProducts: Product[], token: string) => {
    isLoading.value = true;

    const response = await $fetch<Product[]>(`${BASE_API_URL}/products/reorder`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: newProducts.map((product) => product.id)
    });

    if (!response) {
      throw new Error('Ha ocurrido un error al reordenar los productos');
    }

    products.value = [...newProducts];
    sortBy.value = [];
    error.value = null;
    isLoading.value = false;
  };

  const setError = (errorMessage: string) => {
    error.value = errorMessage;
  };

  const setIsLoading = (loading: boolean) => {
    isLoading.value = loading;
  };

  return {
    products,
    isLoading,
    error,
    sortBy,
    fetchProducts,
    getProductById,
    addProduct,
    editProduct,
    deleteProduct,
    reorderProducts,
    setError,
    setIsLoading
  };
});
