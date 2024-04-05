import { SUCCESS_CODE } from '@/constants'

const timeout = 1000

const List: {
  id: string
  name: string
  ip: string
  online: boolean
  cpu: number
  mem: number
  disk: number
}[] = [
  {
    id: '1',
    name: 'node1',
    ip: '192.168.1.1',
    online: true,
    cpu: 50,
    mem: 20,
    disk: 50
  },
  {
    id: '2',
    name: 'node2',
    ip: '192.168.1.2',
    online: true,
    cpu: 50,
    mem: 20,
    disk: 50
  },
  {
    id: '3',
    name: 'node3',
    ip: '192.168.1.3',
    online: false,
    cpu: 50,
    mem: 20,
    disk: 50
  }
]

const Data = {
  list: List,
  length: List.length
}
export default [
  // 列表接口
  {
    url: '/mock/node/list',
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
