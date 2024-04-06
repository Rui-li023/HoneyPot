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

const List1: {
  id: string
  name: string
  startTime: string
  cmd: string
  displayTime: string
}[] = [
  {
    id: 'ab4a5be615ae',
    name: '/ssh_pot',
    startTime: 'Up about one hour!',
    cmd: '/sbin/my_init',
    displayTime: '2024.03.01 12:02:11'
  },
  {
    id: 'f405db84695d',
    name: '/ssh_pot',
    startTime: 'Up about one hour!',
    cmd: '/sbin/my_init',
    displayTime: '2024.03.01 12:02:11'
  },
  {
    id: '0873558a41c9',
    name: '/mod_bus',
    startTime: 'Up about one hour!',
    cmd: '/bin/my_init',
    displayTime: '2024.03.01 12:02:11'
  }
]

const Data2 = {
  list: List1,
  length: List1.length
}

const List3: {
  id: string
  name: string
  size: string
  createTime: string
}[] = [
  {
    id: 'ab4a5be615ae',
    name: '/ssh_pot',
    size: '512MB',
    createTime: '2024.03.01 12:02:11'
  },
  {
    id: 'f405db84695d',
    name: '/ssh_pot',
    size: '52MB',
    createTime: '2024.03.01 12:02:11'
  },
  {
    id: '0873558a41c9',
    name: '/mod_bus',
    size: '51MB',
    createTime: '2024.03.01 12:03:41'
  }
]

const Data3 = {
  list: List3,
  length: List3.length
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
  }, // 列表接口
  {
    url: '/mock/container/list',
    method: 'get',
    timeout,
    response: ({}) => {
      return {
        code: SUCCESS_CODE,
        data: Data2
      }
    }
  }, // 列表接口
  {
    url: '/mock/image/list',
    method: 'get',
    timeout,
    response: ({}) => {
      return {
        code: SUCCESS_CODE,
        data: Data3
      }
    }
  }
]
