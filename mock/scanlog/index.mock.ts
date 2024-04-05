import { SUCCESS_CODE } from '@/constants'

// const timeout = 1000

const List: {
  id: string
  source_ip: string
  source_port: number
  dest_ip: string
  dest_port: number
  protocol: string
  type: string
  display_time: string
  importance: number
}[] = [
  {
    id: '12312',
    source_ip: '192.168.1.112',
    source_port: 23423,
    dest_ip: '192.168.1.2',
    protocol: 'TCP',
    dest_port: 3306,
    type: 'mysql',
    display_time: '2023-12-09 15:32:25',
    importance: 2
  },
  {
    id: '12312',
    source_ip: '192.168.1.112',
    source_port: 33523,
    protocol: 'TCP',
    dest_port: 22,
    type: 'mysql',
    dest_ip: '192.168.1.3',
    display_time: '2023-12-09 15:32:23',
    importance: 3
  },
  {
    id: '98765',
    source_ip: '192.168.1.115',
    source_port: 54321,
    dest_ip: '192.168.1.10',
    protocol: 'UDP',
    dest_port: 9090,
    type: 'mysql',
    display_time: '2024-01-10 12:45:30',
    importance: 2
  },
  {
    id: '45678',
    source_ip: '192.168.1.120',
    source_port: 12345,
    dest_ip: '192.168.1.5',
    protocol: 'TCP',
    dest_port: 7070,
    type: 'ssh',
    display_time: '2024-02-15 08:30:55',
    importance: 2
  },
  {
    id: '19283',
    source_ip: '192.168.1.117',
    source_port: 67890,
    dest_ip: '192.168.1.3',
    protocol: 'UDP',
    dest_port: 6060,
    type: 'ssh',
    display_time: '2024-03-20 17:25:47',
    importance: 1
  },
  {
    id: '12312',
    source_ip: '192.168.1.112',
    source_port: 23423,
    dest_ip: '192.168.1.2',
    protocol: 'TCP',
    dest_port: 3306,
    type: 'mysql',
    display_time: '2023-12-09 15:32:25',
    importance: 2
  },
  {
    id: '12312',
    source_ip: '192.168.1.112',
    source_port: 23423,
    dest_ip: '192.168.1.2',
    protocol: 'TCP',
    dest_port: 3306,
    type: 'mysql',
    display_time: '2023-12-09 15:32:25',
    importance: 2
  },
  {
    id: '12312',
    source_ip: '192.168.1.112',
    source_port: 23423,
    dest_ip: '192.168.1.2',
    protocol: 'TCP',
    dest_port: 3306,
    type: 'mysql',
    display_time: '2023-12-09 15:32:25',
    importance: 2
  },
  {
    id: '12312',
    source_ip: '192.168.1.112',
    source_port: 23423,
    dest_ip: '192.168.1.2',
    protocol: 'TCP',
    dest_port: 3306,
    type: 'mysql',
    display_time: '2023-12-09 15:32:25',
    importance: 2
  },
  {
    id: '12312',
    source_ip: '192.168.1.112',
    source_port: 23423,
    dest_ip: '192.168.1.2',
    protocol: 'TCP',
    dest_port: 3306,
    type: 'mysql',
    display_time: '2023-12-09 15:32:25',
    importance: 2
  },
  {
    id: '12312',
    source_ip: '192.168.1.112',
    source_port: 23423,
    dest_ip: '192.168.1.2',
    protocol: 'TCP',
    dest_port: 3306,
    type: 'mysql',
    display_time: '2023-12-09 15:32:25',
    importance: 2
  },
  {
    id: '12312',
    source_ip: '192.168.1.112',
    source_port: 23423,
    dest_ip: '192.168.1.2',
    protocol: 'TCP',
    dest_port: 3306,
    type: 'mysql',
    display_time: '2023-12-09 15:32:25',
    importance: 2
  },
  {
    id: '12312',
    source_ip: '192.168.1.112',
    source_port: 23423,
    dest_ip: '192.168.1.2',
    protocol: 'TCP',
    dest_port: 3306,
    type: 'mysql',
    display_time: '2023-12-09 15:32:25',
    importance: 2
  },
  {
    id: '12312',
    source_ip: '192.168.1.112',
    source_port: 23423,
    dest_ip: '192.168.1.2',
    protocol: 'TCP',
    dest_port: 3306,
    type: 'mysql',
    display_time: '2023-12-09 15:32:25',
    importance: 2
  }
]

export default [
  // 列表接口
  {
    url: '/mock/scan/list',
    method: 'get',
    response: ({ query }) => {
      const { username, pageIndex, pageSize } = query

      const mockList = List.filter((item) => {
        if (username && item.id.indexOf(username) < 0) return false
        return true
      })
      const pageList = mockList.filter(
        (_, index) => index < pageSize * pageIndex && index >= pageSize * (pageIndex - 1)
      )

      return {
        code: SUCCESS_CODE,
        data: {
          total: mockList.length,
          list: pageList
        }
      }
    }
  }
  // 登录接口
  // {
  //   url: '/mock/user/login',
  //   method: 'post',
  //   timeout,
  //   response: ({ body }) => {
  //     const data = body
  //     let hasUser = false
  //     for (const user of List) {
  //       if (user.username === data.username && user.password === data.password) {
  //         hasUser = true
  //         return {
  //           code: SUCCESS_CODE,
  //           data: user
  //         }
  //       }
  //     }
  //     if (!hasUser) {
  //       return {
  //         code: 500,
  //         message: '账号或密码错误'
  //       }
  //     }
  //   }
  // },
  // // 退出接口
  // {
  //   url: '/mock/user/loginOut',
  //   method: 'get',
  //   timeout,
  //   response: () => {
  //     return {
  //       code: SUCCESS_CODE,
  //       data: null
  //     }
  //   }
  // }
]
