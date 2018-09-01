/*
 * ©  Implicitly86 All Rights Reserved
 */

import Vue from "vue";
import VueRouter from "vue-router";
import { Route } from "vue-router/types/router";

import CustomerPage from "../components/pages/customer.vue";
import DeliveryPointPage from "../components/pages/delivery_point.vue";
import LoginPage from '../components/pages/login.vue';
import MainPage from "../components/pages/main.vue";
import OrderPage from "../components/pages/order.vue";
import { Constants } from "../constants/common_constants";

Vue.use(VueRouter);

export let router = new VueRouter({
    mode: 'history',
    routes: [
        {path: Constants.PAGE_PATH.BASE.path, name: Constants.PAGE_PATH.BASE.name, component: MainPage},
        {path: Constants.PAGE_PATH.LOGIN.path, name: Constants.PAGE_PATH.LOGIN.name, component: LoginPage},
        {path: Constants.PAGE_PATH.CUSTOMER.path, name: Constants.PAGE_PATH.CUSTOMER.name, component: CustomerPage},
        {path: `${Constants.PAGE_PATH.CUSTOMER.path}/:id`, name: 'customer', component: CustomerPage},
        {path: Constants.PAGE_PATH.DELIVERY_POINT.path, name: Constants.PAGE_PATH.DELIVERY_POINT.name, component: DeliveryPointPage},
        {path: `${Constants.PAGE_PATH.DELIVERY_POINT.path}/:id`, name: 'delivery-point', component: DeliveryPointPage},
        {path: Constants.PAGE_PATH.ORDER.path, name: Constants.PAGE_PATH.ORDER.name, component: OrderPage},
        {path: `${Constants.PAGE_PATH.ORDER.path}/:id`, name: 'order', component: OrderPage}
    ]
});

router.beforeEach((to: Route, from: Route, next) => {
    if (localStorage.getItem(Constants.AUTH.TOKEN_NAME) == null && to.name != Constants.PAGE_PATH.LOGIN.name) {
        if (from.name != Constants.PAGE_PATH.LOGIN.name) {
            next({path: Constants.PAGE_PATH.LOGIN.path, query: {'redirect': to.name!}});
        } else {
            next(Constants.PAGE_PATH.LOGIN.path);
        }
    }
    else {
        next();
    }
});
