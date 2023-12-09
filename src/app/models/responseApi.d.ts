export type responseApi = {
    content: Content[]
    pageable: Pageable
    last: boolean
    totalPages: number
    totalElements: number
    size: number
    number: number
    sort: Sort2
    numberOfElements: number
    first: boolean
    empty: boolean
  }
  
  export type Content = {
    id: number
    title: string
    description: string
    completed: boolean
    deadLine?: string
  }
  
  export type Pageable = {
    pageNumber: number
    pageSize: number
    sort: Sort
    offset: number
    unpaged: boolean
    paged: boolean
  }
  
  export type Sort = {
    empty: boolean
    sorted: boolean
    unsorted: boolean
  }
  
  export type Sort2 = {
    empty: boolean
    sorted: boolean
    unsorted: boolean
  }
  