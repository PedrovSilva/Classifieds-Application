export interface Classificado {
  id: number;
  titulo: string;
  descricao: string;
  dataCadastro: string;
}

export interface ClassificadoInput {
  titulo: string;
  descricao: string;
}

export interface PagedResult<T> {
  items: T[];
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}
