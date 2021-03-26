const list = [
    {
        path: '/',
        redirect: '/dashboard'
    },
    {
        path: '/',
        component: () => import(/* webpackChunkName: "home" */ '../components/common/Home.vue'),
        meta: { title: '自述文件' },
        children: [
            {
                path: '/dashboard',
                component: () => import(/* webpackChunkName: "dashboard" */ '../views/admin/dashboard/dashboard.vue'),
                meta: { title: '系统首页' }
            },
            // 系统管理模块 s
            {
                path: '/roleManagement',
                component: () => import(/* webpackChunkName: "dashboard" */ '../views/admin/systemManagement/roleManagement/roleManagement.vue'),
                meta: { title: '角色管理' }
            },
            {
                path: '/userManagement',
                component: () => import(/* webpackChunkName: "dashboard" */ '../views/admin/systemManagement/userManagement/userManagement.vue'),
                meta: { title: '用户管理' }
            },
            {
                path: '/projectManagement',
                component: () => import(/* webpackChunkName: "dashboard" */ '../views/admin/systemManagement/projectManagement/projectManagement.vue'),
                meta: { title: '项目管理' }
            },
            {
                path: '/dictionaryManagement',
                component: () => import(/* webpackChunkName: "dashboard" */ '../views/admin/systemManagement/dictionaryManagement/dictionaryManagement.vue'),
                meta: { title: '字典管理' }
            },
            {
                path: '/operationManagement',
                component: () => import(/* webpackChunkName: "dashboard" */ '../views/admin/systemManagement/operationManagement/operationManagement.vue'),
                meta: { title: '操作日志管理' }
            },
            // 系统管理模块 e
            // 日报管理模块 s
            {
                path: '/logoList',
                component: () => import(/* webpackChunkName: "dashboard" */ '../views/admin/logoManagement/logoList/logoList.vue'),
                meta: { title: '日报列表' }
            },
            {
                path: '/logoOpenSetting',
                component: () => import(/* webpackChunkName: "dashboard" */ '../views/admin/logoManagement/logoOpenSetting/logoOpenSetting.vue'),
                meta: { title: '发送设置' }
            },
            {
                path: '/logoReceivingSet',
                component: () => import(/* webpackChunkName: "dashboard" */ '../views/admin/logoManagement/logoReceivingSet/logoReceivingSet.vue'),
                meta: { title: '接收设置' }
            },
            {
                path: '/logoExport',
                component: () => import(/* webpackChunkName: "dashboard" */ '../views/admin/logoManagement/logoExport/logoExport.vue'),
                meta: { title: '通知导出' }
            },
            // 日报管理模块 e
            // 工作日报 s
            {
                path: '/workLogoAdd',
                component: () => import(/* webpackChunkName: "dashboard" */ '../views/admin/dailyWorkReport/workLogoAdd/workLogoAdd.vue'),
                meta: { title: '日报填报' }
            },
            {
                path: '/workLogoSee',
                component: () => import(/* webpackChunkName: "dashboard" */ '../views/admin/dailyWorkReport/workLogoSee/workLogoSee.vue'),
                meta: { title: '日报查看' }
            },
            // 工作日报 e
            // 权限管理 s
            {
                path: '/personalRights',
                component: () => import(/* webpackChunkName: "dashboard" */ '../views/admin/userAdmin/personalRights/personalRights.vue'),
                meta: { title: '个人权限' }
            },
            // 权限管理 e
            {
                // 权限页面
                path: '/permission',
                component: () => import(/* webpackChunkName: "permission" */ '../components/page/Permission.vue'),
                meta: { title: '权限测试', permission: true }
            },
            {
                path: '/404',
                component: () => import(/* webpackChunkName: "404" */ '../components/page/404.vue'),
                meta: { title: '404' }
            },
            {
                path: '/403',
                component: () => import(/* webpackChunkName: "403" */ '../components/page/403.vue'),
                meta: { title: '403' }
            },
        ]
    },
    {
        path: '/login',
        component: () => import(/* webpackChunkName: "login" */ '../views/home/login/login.vue'),
        meta: { title: '登录' }
    },
    {
        path: '*',
        redirect: '/404'
    }
];
export default list;