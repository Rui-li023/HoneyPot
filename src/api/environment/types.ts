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

export interface CreateContainerParams {
  Hostname?: string
  Domainname?: string
  User?: string
  Env?: string[]
  Cmd?: string[]
  Image: string
  Volumes?: object
  WorkingDir?: string
  Entrypoint?: string[]
  HostConfig?: object
  NetworkingConfig?: object
}
