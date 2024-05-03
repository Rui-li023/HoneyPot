import request from '@/axios'
import type { ScanLogItem } from './types'
import { AttackParams, Conpot, Honeyd, Kippo, RealHoneypot, Webtrap } from './types'

export const conpotApi = (params: AttackParams) => {
  return request.get<Conpot[]>({ url: '/conpot', params })
}

export const honeydApi = (params: AttackParams) => {
  return request.get<Honeyd[]>({ url: '/honeyd', params })
}

export const kippoApi = (params: AttackParams) => {
  return request.get<Kippo[]>({ url: '/kippo', params })
}

export const real_honeypotApi = (params: AttackParams) => {
  return request.get<RealHoneypot[]>({ url: '/real_honeypot', params })
}

export const webtrapApi = (params: AttackParams) => {
  return request.get<Webtrap[]>({ url: '/webtrap', params })
}

export const getScanLogListApi = async (params: AttackParams) => {
  return request.get<ScanLogItem[]>({ url: '/main', params })
}
