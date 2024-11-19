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

  const addProduct = (product: Product) => {
    products.value.push(product);
  };

  const editProduct = (product: Product) => {
    const index = products.value.findIndex((p) => p.id === product.id);
    products.value[index] = product;
  };

  const deleteProduct = (productId: number) => {
    const index = products.value.findIndex((p) => p.id === productId);
    products.value.splice(index, 1);
  };

  const searchProduct = (searchTerm: string) => {
    const search = searchTerm.toLowerCase();
    return products.value.filter(
      (product) =>
        product.title.toLowerCase().includes(search) ||
        product.description.toLowerCase().includes(search)
    );
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
    searchProduct
  };
});
