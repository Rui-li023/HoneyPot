import { MockMethod } from 'vite-plugin-mock'
import { SUCCESS_CODE } from '@/constants'

const timeout = 1000

const adminList: string[] = ['/', '/dashboard', '/dashboard/analysis', '/dashboard/workplace']

const testList: string[] = [
  '/level',
  '/level/menu1',
  '/level/menu1/menu1-1',
  '/level/menu1/menu1-1/menu1-1-1',
  '/level/menu1/menu1-2',
  '/level/menu2'
]

export default [
  // 列表接口
  {
    url: '/mock/role/list',
    method: 'get',
    timeout,
    response: ({ query }) => {
      const { roleName } = query
      return {
        code: SUCCESS_CODE,
        data: roleName === 'admin' ? adminList : testList
      }
    }
  }
] as MockMethod[]
