/*
 * ©  Implicitly86 All Rights Reserved
 */

import Vue from "vue";
import VueRouter from "vue-router";

import LineManagers from '../components/pages/line_managers.vue';
import ProjectMapping from '../components/pages/project_mapping.vue';
import StopListEmployees from '../components/pages/stop_list_employees.vue';
import StopListProjects from '../components/pages/stop_list_projects.vue';
import Login from '../components/pages/login.vue';
import { Route } from "vue-router/types/router";

Vue.use(VueRouter);

let router = new VueRouter({
    mode: 'history',
    routes: [
        {path: '/', redirect: '/project-mapping'},
        {path: '/project-mapping', name: 'project-mapping', component: ProjectMapping},
        {path: '/line-managers', name: 'line-managers', component: LineManagers},
        {path: '/stop-list-employees', name: 'stop-list-employees', component: StopListEmployees},
        {path: '/stop-list-projects', name: 'stop-list-projects', component: StopListProjects},
        {path: '/login', name: 'login', component: Login}
    ]
});

router.beforeEach((to: Route, from: Route, next) => {
    if(localStorage.getItem('id_token') == null && to.name != "login") {
        if (from.name != "login") {
            next({path: '/login', query: {'redirect': to.name!}});
        } else {
            next('/login');
        }
    }
    else {
        next();
    }
});

export default router;