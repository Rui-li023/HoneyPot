export interface NodeItem {
  id: string
  name: string
  ip: string
  online: boolean
  cpu: number
  gpu: number
  disk: number
  departmentName: string
}

export interface NodeListResponse {
  list: NodeItem[]
  total: number
}

export interface NodeListParams {
  pageSize: number
  pageIndex: number
  name?: string
}

// export interface DepartmentUserItem {
//   id: string
//   username: string
//   account: string
//   email: string
//   createTime: string
//   role: string
//   department: DepartmentItem
// }

// export interface DepartmentUserResponse {
//   list: DepartmentUserItem[]
//   total: number
// }
