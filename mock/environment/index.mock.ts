import { SUCCESS_CODE } from '@/constants'
import { ImageItem, ContainerItem } from '@/api/environment/types'

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

const Containers: ContainerItem[] = [
  {
    Id: 'ab4a5be615ae',
    Names: ['/ssh_pot'],
    Created: 123,
    Command: '/sbin/my_init'
  },
  {
    Names: ['/ssh_pot'],
    Created: 1234,
    Command: '/sbin/my_init',
    Id: 'f405db84695d'
  },
  {
    Id: '0873558a41c9',
    Names: ['/mod_bus'],
    Created: 12345,
    Command: '/bin/my_init'
  }
]

const Images: ImageItem[] = [
  {
    Id: 'ab4a5be615ae',
    RepoTags: ['/ssh_pot'],
    Size: 512,
    Created: 123
  },
  {
    Id: 'f405db84695d',
    RepoTags: ['/ssh_pot'],
    Size: 512,
    Created: 123
  },
  {
    Id: '0873558a41c9',
    RepoTags: ['/ssh_pot'],
    Size: 512,
    Created: 123
  }
]

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
        data: {
          list: Containers,
          length: Containers.length
        }
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
        data: {
          list: Images,
          length: Images.length
        }
      }
    }
  }
]
