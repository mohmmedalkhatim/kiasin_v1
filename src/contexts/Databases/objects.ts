export type tableInfo = {
  name: string
  tbl_name: string
  type: string
  rootpage: number
  sql: string
}

export type DatabaseType = {
  name: string
  info: string[]
}
export type rowType =
  | 'INTEGER'
  | 'varchar'
  | 'varbinary_blob'
  | 'date_text'
  | 'boolean'
  | 'json_text'
export type rowInfo = {
  cid: 0 | 1
  dflt_value: null | string
  name: string
  notnull: 1 | 0
  pk: 1 | 0
  type: rowType
}
