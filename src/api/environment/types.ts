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

export interface ContainerItem {
  Id: string
  Names: string[]
  Created: number
  Command: string
  // displayTime: string
}

export interface ContainerListResponse {
  list: ContainerItem[]
  total: number
}

export interface ContainerListParams {
  pageSize: number
  pageIndex: number
  name?: string
}

export interface ImageItem {
  Id: string
  RepoTags: string[]
  Size: number
  Created: number
}

export interface ImageListResponse {
  list: NodeItem[]
  total: number
}

// export interface ImageListParams {
//   pageSize: number
//   pageIndex: number
//   name?: string
// }
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
