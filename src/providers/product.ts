// src/providers/product.ts
import { api } from './api';
import type { PaginatedResponse } from '../@types/paginatedProductsResponse';
import type { Product } from '../@types/product';

export const search = async (
  page: number,
  // setLoading: (load: boolean) => void,
  search: string
): Promise<{ items: Product[]; currentPage: number; totalPages: number } | undefined> => {
  // setLoading(true);
  try {
    const response = await api.get<PaginatedResponse>('products/search/', {
      params: {
        page,
        limit: 10,
        search,
      },
    });
    const { items, currentPage, totalPages } = response.data;
    return { items, currentPage, totalPages };
  } catch (error) {
    alert('Ocorreu um erro ao pesquisar');
    console.error(error); // Opcional: adicionar mais detalhes ao log
    return undefined; // Retorna undefined em caso de erro
  } finally {
    // setLoading(false);
  }
};