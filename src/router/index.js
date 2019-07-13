import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    mode : 'history',
    base : '/admin/',
    routes: [
        {
            path: '/',
            redirect: '/table'
        },
        {
            path: '/',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            meta: { title: '自述文件' },
            children:[
             {
                    path: '/404',
                    meta: { title: '页面不存在' },
                    component: resolve => require(['../components/page/404.vue'], resolve)
                },
                {
                    path: '/table',
                    component: resolve => require(['../components/page/Table.vue'], resolve),
                    meta: { title: '基础表格' }
                },
                {
                    path: '/ads',
                    component: resolve => require(['../components/page/Admanage.vue'], resolve),
                    meta: { title: '广告管理' }
                },
                {
                    path: '/export',
                    component: resolve => require(['../components/page/export.vue'], resolve),
                    meta: { title: '导出excel' }
                },
                {
                    path: '/echarts',
                    component: resolve => require(['../components/page/echarts.vue'], resolve),
                    meta: { title: '图表展示' }
                },
                // {
                //     path: '/titles',
                //     component: resolve => require(['../components/page/TitleManage.vue'], resolve),
                //     meta: { title: '题库管理' }
                // },
                
                // {
                //     path: '/roles',
                //     component: resolve => require(['../components/page/RoleManage.vue'], resolve),
                //     meta: { title: '用户管理' }
                // },
                // {
                //     path: '/pkrecord',
                //     component: resolve => require(['../components/page/PkManage.vue'], resolve),
                //     meta: { title: 'pk管理' }
                // },
                // {
                //     path: '/common',
                //     component: resolve => require(['../components/page/comManage.vue'], resolve),
                //     meta: { title: 'common管理' }
                // },
                
                // {
                //     path: '/form',
                //     component: resolve => require(['../components/page/BaseForm.vue'], resolve),
                //     meta: { title: '基本表单' }
                // }
            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
})
