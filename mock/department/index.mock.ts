import { SUCCESS_CODE } from '@/constants'

const timeout = 1000

const List: {
  username: string
  password: string
  account: string
  email: string
  createTime: string
}[] = [
  {
    username: 'admin',
    password: 'admin',
    account: 'admin',
    email: '9999@qq.com',
    createTime: '1999-09-19 12:00:00'
  },
  {
    username: 'test',
    password: 'test',
    account: 'test',
    email: '9999888@qq.com',
    createTime: '1999-09-19 12:00:00'
  }
]

const Data = {
  list: List,
  length: List.length
}
export default [
  // 列表接口
  {
    url: '/mock/department/users',
    method: 'get',
    timeout,
    response: ({}) => {
      return {
        code: SUCCESS_CODE,
        data: Data
      }
    }
  }
]
