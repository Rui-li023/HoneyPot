export type AttackLogItem = {
  id: string
  source_ip: string
  source_port: number
  dest_ip: string
  dest_port: number
  protocol: string
  type: string
  display_time: string
}

export interface ScanLogListResponse {
  list: AttackLogItem[]
  total: number
}
