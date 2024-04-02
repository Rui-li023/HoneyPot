import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import type { App } from 'vue'
import { Layout } from '@/utils/routerHelper'
import { useI18n } from '@/hooks/web/useI18n'

const { t } = useI18n()

const authRouter: AppRouteRecordRaw = {
  path: '/authorization',
  component: Layout,
  redirect: '/authorization/user',
  name: 'Authorization',
  meta: {
    title: t('router.authorization'),
    icon: 'eos-icons:role-binding',
    alwaysShow: true
  },
  children: [
    {
      path: 'user',
      component: () => import('@/views/Authorization/User/User.vue'),
      name: 'User',
      meta: {
        title: t('router.user')
      }
    },
    {
      path: 'about',
      component: () => import('@/views/Authorization/About/About.vue'),
      name: 'About',
      meta: {
        title: t('router.about')
      }
    }
  ]
}

const dashboardRouter: AppRouteRecordRaw = {
  path: '/dashboard',
  component: Layout,
  redirect: '/dashboard/analysis',
  name: 'Dashboard',
  meta: {
    title: t('router.dashboard'),
    icon: 'ant-design:dashboard-filled',
    alwaysShow: true
  },
  children: [
    {
      path: 'analysis',
      component: () => import('@/views/Dashboard/Analysis.vue'),
      name: 'Analysis',
      meta: {
        title: t('router.analysis'),
        noCache: true,
        affix: true
      }
    },
    {
      path: 'workplace',
      component: () => import('@/views/Dashboard/Workplace.vue'),
      name: 'Workplace',
      meta: {
        title: t('router.workplace'),
        noCache: true
      }
    }
  ]
}

const InfoRouter: AppRouteRecordRaw = {
  path: '/info',
  component: Layout,
  redirect: '/info/regular',
  name: 'Info',
  meta: {
    title: '蜜罐信息',
    icon: 'ant-design:dashboard-filled',
    alwaysShow: true
  },
  children: [
    {
      path: 'realtime',
      component: () => import('@/views/Honeypot/Regular.vue'),
      name: 'Realtime',
      meta: {
        title: '实时监控',
        noCache: true,
        affix: true
      }
    },
    {
      path: 'log',
      component: () => import('@/views/Info/Log.vue'),
      name: 'Log',
      meta: {
        title: '扫描感知',
        noCache: true,
        affix: true
      }
    }
  ]
}

const HoneypotManageRouter: AppRouteRecordRaw = {
  path: '/honeypot',
  component: Layout,
  redirect: '/honeypot/regular',
  name: 'Honeypot',
  meta: {
    title: '蜜罐管理',
    icon: 'ant-design:dashboard-filled',
    alwaysShow: true
  },
  children: [
    {
      path: 'regular',
      component: () => import('@/views/Honeypot/Regular.vue'),
      name: 'Regular',
      meta: {
        title: '常规管理',
        noCache: true,
        affix: true
      }
    },
    {
      path: 'image',
      component: () => import('@/views/Honeypot/Image.vue'),
      name: 'Image',
      meta: {
        title: '镜像管理',
        noCache: true,
        affix: true
      }
    }
    // {
    //   path: 'workplace',
    //   component: () => import('@/views/Dashboard/Workplace.vue'),
    //   name: 'Workplace',
    //   meta: {
    //     title: t('router.workplace'),
    //     noCache: true
    //   }
    // }
  ]
}

// const settingsRouter: AppRouteRecordRaw = {
//   path: '/honeypot',
//   component: Layout,
//   redirect: '/honeypot/regular',
//   name: 'Honeypot',
//   meta: {
//     title: '',
//     icon: 'ant-design:dashboard-filled',
//     alwaysShow: true
//   }
// }

export const constantRouterMap: AppRouteRecordRaw[] = [
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Root',
    meta: {
      hidden: true
    }
  },
  {
    path: '/redirect',
    component: Layout,
    name: 'Redirect',
    children: [
      {
        path: '/redirect/:path(.*)',
        name: 'Redirect',
        component: () => import('@/views/Redirect/Redirect.vue'),
        meta: {}
      }
    ],
    meta: {
      hidden: true,
      noTagsView: true
    }
  },
  {
    path: '/login',
    component: () => import('@/views/Login/Login.vue'),
    name: 'Login',
    meta: {
      hidden: true,
      title: t('router.login'),
      noTagsView: true
    }
  },
  {
    path: '/404',
    component: () => import('@/views/Error/404.vue'),
    name: 'NoFind',
    meta: {
      hidden: true,
      title: '404',
      noTagsView: true
    }
  }
]

export const asyncRouterMap: AppRouteRecordRaw[] = [
  dashboardRouter,
  InfoRouter,
  HoneypotManageRouter,
  authRouter
]

const router = createRouter({
  history: createWebHashHistory(),
  strict: true,
  routes: constantRouterMap as RouteRecordRaw[],
  scrollBehavior: () => ({ left: 0, top: 0 })
})

export const resetRouter = (): void => {
  const resetWhiteNameList = ['Redirect', 'Login', 'NoFind', 'Root']
  router.getRoutes().forEach((route) => {
    const { name } = route
    if (name && !resetWhiteNameList.includes(name as string)) {
      router.hasRoute(name) && router.removeRoute(name)
    }
  })
}

export const setupRouter = (app: App<Element>) => {
  app.use(router)
}

export default router
