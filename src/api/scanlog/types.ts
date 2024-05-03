export type ScanLogItem = {
  id: number
  source_ip: string
  source_port: number
  dest_ip: string
  dest_port: number
  protocol: string
  type: string
  time: string
  foreign_id: number
}

export interface Conpot {
  id: number
  request: string
  slave_id: number
  function_code: number
  response: string
  time: string
  session_id: string
}

export interface Honeyd {
  id: number
  symbol: number
  alert_type: number
  subtype: number
  time: string
  protocol: string
  source_port: number
  dest_port: number
  connection_begin_time: string
  time_stamp: number
  pack_length: number
  source_ip: string
  dest_ip: string
}

export interface Kippo {
  id: number
  content: string
  time: string
}

export interface RealHoneypot {
  id: number
  time: string
  protocol: string
  source_port: number
  dest_port: number
  source_ip: string
  dest_ip: string
  content: string
}

export interface Webtrap {
  id: number
  client_address: string
  command: string
  path: string
  request_version: string
  headers: string
  protocol_version: string
}

export interface AttackParams {
  offset?: number
  limit?: number
  source_ip?: string
  dest_ip?: string
  source_port?: number
  dest_port?: number
  protocol?: string
  type?: string
  from_date?: string
  to_date?: string
}

export interface ScanLogListResponse {
  list: ScanLogItem[]
  total: number
}
