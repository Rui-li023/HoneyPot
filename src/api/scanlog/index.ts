import request from '@/axios'
import type { ScanLogListResponse } from './types'

export const getScanLogListApi = (params: any) => {
  return request.get<ScanLogListResponse>({ url: '/mock/scan/list', params })
}
