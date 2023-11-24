export interface Field {
  title: string
  sortable?: boolean
  align?: string
  key: string
}

export interface header {
  headers: Field[]
}

export interface UsersTable extends header {
  items: UserData[]
}

export interface ImplementsTable extends header {
  items: ImplementsData[]
  usersSelect: UserData[]
}

export interface TeachersTable extends header {
  items: TeachersData[]
}

export interface ClassroomsTable extends header {
  items: ClassroomsData[]
}

export interface ClassroomsData {
  id?: string
  nomenclature: string
  location: string
  tech_resources: string[] | string
  connectivity: string[] | string
  ability: number
  status?: boolean
}

export interface TeachersData {
  id?: string
  cc: number
  name: string
  email: string
  phone: number
  status: boolean | any
}

export interface ImplementsData {
  id?: string
  name: string
  serial: string
  manufacturer?: string
  type: string
  model?: string
  location: string
  responsible?: string
  responsible_name?: string
  note?: string
  status?: boolean
}

export interface UserData {
  id?: string
  cc: number
  email: string
  name: string
  phone: number
  role?: string[]
  status?: boolean
}

// DataTable Vuetify
export type SelectItemKey =
  | boolean
  | string
  | (string | number)[]
  | ((item: Record<string, any>, fallback?: any) => any)

export type DataTableCompareFunction<T = any> = (a: T, b: T) => number

export type DataTableHeader = {
  key: string
  value?: SelectItemKey
  title: string
  colspan?: number
  rowspan?: number
  fixed?: boolean
  align?: 'start' | 'end' | 'center'
  width?: number | string
  minWidth?: string
  maxWidth?: string
  sortable?: boolean
  sort?: DataTableCompareFunction
}
