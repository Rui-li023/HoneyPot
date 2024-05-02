import request from '@/axios'
import type { ScanLogItem } from './types'
import { AttackParams, Conpot, Honeyd, Kippo, RealHoneypot, Webtrap } from './types'

export const conpot = (params: AttackParams) => {
  return request.get<Conpot[]>({ url: '/conpot', params })
}

export const honeyd = (params: AttackParams) => {
  return request.get<Honeyd[]>({ url: '/honeyd', params })
}

export const kippo = (params: AttackParams) => {
  return request.get<Kippo[]>({ url: '/kippo', params })
}

export const real_honeypot = (params: AttackParams) => {
  return request.get<RealHoneypot[]>({ url: '/real_honeypot', params })
}

export const webtrap = (params: AttackParams) => {
  return request.get<Webtrap[]>({ url: '/webtrap', params })
}

export const getScanLogListApi = async (params: AttackParams) => {
  return request.get<ScanLogItem[]>({ url: '/main', params })
}
