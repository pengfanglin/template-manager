import Vue from 'vue'
import Router from 'vue-router'
import store from './store'

Vue.use(Router)

//登录界面
const Login = () => import('./pages/others/login.vue');
//首页
const Home = () => import('./pages/others/home.vue');
//个人信息
const UserInfo = () => import('./pages/system/user-info.vue');
//404页面
const ErrorPage = () => import('./pages/others/error-page.vue');
//系统账号
const SystemAccount = () => import('./pages/system/system-account.vue');
const SystemAccountEditor = () => import('./pages/system/system-account-editor.vue');
//模块管理
const Module = () => import('./pages/system/module.vue');
const ModuleEditor = () => import('./pages/system/module-editor.vue');
//角色管理
const Role = () => import('./pages/system/role.vue');
const RoleEditor = () => import('./pages/system/role-editor.vue');

let router= new Router({
    routes: [
        //未匹配路由重定向到error_page
        {
            path: '*',
            redirect: '/error_page'
        },
        {
            path: '/',
            component: Login
        },
        {
            path: '/login',
            component: Login
        },
        {
            path: '/home',
            component: Home,
            children: [
                //角色管理
                {
                    path: '/role',
                    component: Role
                },
                {
                    path: '/role_editor/:roleId',
                    component: RoleEditor
                },
                //404页面
                {
                    path: '/error_page',
                    component: ErrorPage
                },
                //个人信息
                {
                    path: '/user_info',
                    component: UserInfo
                },
                //系统账号
                {
                    path: '/system_account',
                    component: SystemAccount
                },
                {
                    path: '/system_account_editor/:accountId',
                    component: SystemAccountEditor
                },
                //模块管理
                {
                    path: '/module/:moduleId/:level/:title',
                    component: Module
                },
                {
                    path: '/module_editor/:moduleId/:parentId',
                    component: ModuleEditor
                }
            ]
        }
    ]
})
//路由守卫:未登陆用户跳转首页
router.beforeEach((to, from, next) => {
    //判断是否有该模块的权限，无权限跳转到登录界面
    // let leftMenuList=store.getters.leftMenuList;
    // if(leftMenuList.indexOf(to.path)===-1){
    //   Vue.prototype.$message.error('无权限');
    //   next({path: '/login'});
    // }
    const whiteList = ['/login']   //免登录白名单
    if (whiteList.indexOf(to.path) !== -1) {   //如果去免登录界面
        next();
    } else {
        if (Vue.prototype.isEmpty(store.getters.systemAccount)) {
            next({path: '/login'});
        } else {
            next();
        }
    }
});
export default router