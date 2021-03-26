// 定义路由
import config from '../../../config/index'
const routerDev = [
    {
        icon: 'el-icon-lx-home',
        index: '/dashboard',
        title: '系统首页'
    },
    {
        icon: 'el-icon-s-platform',
        title: '系统管理',
        index: '/Management',
        subs: [
            {
                index: '/roleManagement',
                title: '角色管理'
            },
            {
                index: '/userManagement',
                title: '用户管理'
            },
            {
                index: '/projectManagement',
                title: '项目管理'
            },
            {
                index: '/dictionaryManagement',
                title: '字典管理'
            },
            {
                index: '/operationManagement',
                title: '操作日志'
            }
        ]
    },
    {
        icon: 'el-icon-tickets',
        title: '日报管理',
        index: '/logo',
        subs: [
            {
                index: '/logoList',
                title: '日报列表'
            },
            {
                index: '/logoOpenSetting',
                title: '发送设置'
            },
            {
                index: '/logoReceivingSet',
                title: '接收设置'
            },
            {
                index: '/logoExport',
                title: '通知导出'
            }
        ]
    },
    {
        icon: 'el-icon-pie-chart',
        title: '工作日报',
        index: '/work',
        subs: [
            {
                index: '/workLogoAdd',
                title: '日报填报'
            },
            {
                index: '/workLogoSee',
                title: '日报查看'
            }
        ]
    },
    {
        icon: 'el-icon-setting',
        title: '权限管理',
        index: '/rote',
        subs: [
            {
                index: '/personalRights',
                title: '个人权限'
            }
        ]
    },
]; // dev路由
const list = [
    {
        icon: 'el-icon-lx-home',
        index: 'dashboard',
        title: '系统首页'
    },
    {
        icon: 'el-icon-lx-cascades',
        index: 'table',
        title: '基础表格'
    },
    {
        icon: 'el-icon-lx-copy',
        index: 'tabs',
        title: 'tab选项卡'
    },
    {
        icon: 'el-icon-lx-calendar',
        index: '3',
        title: '表单相关',
        subs: [
            {
                index: 'form',
                title: '基本表单'
            },
            {
                index: '3-2',
                title: '三级菜单',
                subs: [
                    {
                        index: 'editor',
                        title: '富文本编辑器'
                    },
                    {
                        index: 'markdown',
                        title: 'markdown编辑器'
                    }
                ]
            },
            {
                index: 'upload',
                title: '文件上传'
            }
        ]
    },
    {
        icon: 'el-icon-lx-emoji',
        index: 'icon',
        title: '自定义图标'
    },
    {
        icon: 'el-icon-pie-chart',
        index: 'charts',
        title: 'schart图表'
    },
    {
        icon: 'el-icon-rank',
        index: '6',
        title: '拖拽组件',
        subs: [
            {
                index: 'drag',
                title: '拖拽列表'
            },
            {
                index: 'dialog',
                title: '拖拽弹框'
            }
        ]
    },
    {
        icon: 'el-icon-lx-global',
        index: 'i18n',
        title: '国际化功能'
    },
    {
        icon: 'el-icon-lx-warn',
        index: '7',
        title: '错误处理',
        subs: [
            {
                index: 'permission',
                title: '权限测试'
            },
            {
                index: '404',
                title: '404页面'
            }
        ]
    },
    {
        icon: 'el-icon-lx-redpacket_fill',
        index: '/donate',
        title: '支持作者'
    }
]; // 示例路由
let router = null;
if( config.devRouter === 0 ) {
    if (config.isOpenTest) {
        router = list
    }else {
        router = routerDev
    }
}else {
    router = JSON.parse(sessionStorage.getItem('router'))
}
export default router;