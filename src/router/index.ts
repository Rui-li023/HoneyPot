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
        noCache: true
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

const InfoRouter: AppRouteRecordRaw = {
  path: '/info',
  component: Layout,
  redirect: '/info/log',
  name: 'Info',
  meta: {
    title: '蜜罐信息',
    icon: 'material-symbols:cognition',
    alwaysShow: true
  },
  children: [
    {
      path: 'log',
      component: () => import('@/views/Info/Log.vue'),
      name: 'Log',
      meta: {
        title: '常规日志',
        noCache: true,
        affix: false
      }
    }
  ]
}

const HoneypotManageRouter: AppRouteRecordRaw = {
  path: '/environment',
  component: Layout,
  redirect: '/environment/node',
  name: 'Environment',
  meta: {
    title: '环境管理',
    icon: 'ph:codesandbox-logo-fill',
    alwaysShow: true
  },
  children: [
    {
      path: 'node',
      component: () => import('@/views/Environments/Nodes/Nodes.vue'),
      name: 'Node',
      meta: {
        title: '节点管理',
        noCache: true,
        affix: false
      }
    },
    {
      path: 'container',
      component: () => import('@/views/Environments/Containers/Containers.vue'),
      name: 'Container',
      meta: {
        title: '容器管理',
        noCache: true,
        affix: false
      }
    },
    {
      path: 'image',
      component: () => import('@/views/Environments/Images/Images.vue'),
      name: 'Image',
      meta: {
        title: '镜像管理',
        noCache: true,
        affix: false
      }
    }
  ]
}

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
