
export interface PaginatedResult<T> {
    data: T[];
    page: number;
    totalPages: number;
    totalItems: number;
  }
  
  export function paginate(array: any[], page: number, limit: number): PaginatedResult<any> {
    const offset = (page - 1) * limit;
    const paginatedItems = array.slice(offset, offset + limit);
    const totalPages = Math.ceil(array.length / limit);
  
    return {
      data: paginatedItems,
      page,
      totalPages,
      totalItems: array.length,
    };
  }
  