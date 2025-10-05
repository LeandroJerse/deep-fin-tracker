export interface InfoPaginacao {
  numPagina: number
  itensPorPagina: number
  totalRecords: number
  totalPages: number
}

export interface Paginacao {
  numPagina: number
  itensPorPagina: number
  totalRecords: number
  totalPages: number
}


export interface PaginatedResponse<T> {
  items: T[]
  totalRecords: number
  pageNum: number
  itemsPerPage: number
  totalPages: number
}


// Função para extrair ID de um item mapeado
export const extractId = <T extends Record<string, any>>(
  item: T,
  idField: keyof T | ((item: T) => string | number)
): string | number => {
  return typeof idField === 'function' 
    ? idField(item) 
    : item[idField]
}

export interface ApiResponse<T> {
  data: T[]
  pagination: {
    startRecordNumber: number
    itemsPerPage: number
    pageNum: number
    totalRecords?: number
    totalPages?: number
  }
  processMessage: string
  success: boolean
  haveWarnings: boolean
  httpStatusCode: number
}