import type { Product } from '~/interfaces';
import { useProductsStore } from '../stores/products';

export const useProductsCrud = (token: string) => {
  const productsStore = useProductsStore();

  const addNewProduct = async ({
    product,
    isDialogActive
  }: {
    product: Product;
    isDialogActive: Ref<boolean, boolean>;
  }) => {
    try {
      await productsStore.addProduct(product, token);
      isDialogActive.value = false;
    } catch (error) {
      console.error(error);
      productsStore.setIsLoading(false);
      productsStore.setError('Ha ocurrido un error al añadir el producto');
    }
  };

  const editProduct = async ({
    product,
    isDialogActive
  }: {
    product: Product;
    isDialogActive: Ref<boolean, boolean>;
  }) => {
    try {
      await productsStore.editProduct(product, token);
      isDialogActive.value = false;
    } catch (error) {
      console.error(error);
      productsStore.setIsLoading(false);
      productsStore.setError('Ha ocurrido un error al editar el producto');
    }
  };

  const deleteProduct = async (isDialogActive: Ref<boolean, boolean>, product: Product) => {
    try {
      await productsStore.deleteProduct(product.id, token);
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
      await productsStore.reorderProducts(products, token);
      isDialogActive.value = false;
    } catch (error) {
      console.error(error);
      productsStore.setIsLoading(false);
      productsStore.setError('Ha ocurrido un error al reordenar los productos');
    }
  };

  return { addNewProduct, editProduct, deleteProduct, reorderProducts };
};
