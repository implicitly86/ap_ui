/*
 * ©  Implicitly86 All Rights Reserved
 */

import Vue from "vue";
import VueRouter from "vue-router";
import { Route } from "vue-router/types/router";

import CustomerPage from "../components/pages/customer.vue";
import CustomerInfo from "../components/pages/customer_info.vue";
import DeliveryPointPage from "../components/pages/delivery_point.vue";
import DeliveryPointInfo from "../components/pages/delivery_point_info.vue";
import LoginPage from '../components/pages/login.vue';
import MainPage from "../components/pages/main.vue";
import OrderPage from "../components/pages/order.vue";
import OrderInfo from "../components/pages/order_info.vue";
import NotFound from "../components/pages/not_found.vue";
import { Constants } from "../constants/common_constants";

Vue.use(VueRouter);

export let router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: Constants.PAGE_PATH.BASE.path,
            name: Constants.PAGE_PATH.BASE.name,
            component: MainPage,
            meta: {title: Constants.PAGE_PATH.BASE.title}
        },
        {
            path: Constants.PAGE_PATH.LOGIN.path,
            name: Constants.PAGE_PATH.LOGIN.name,
            component: LoginPage,
            meta: {title: Constants.PAGE_PATH.LOGIN.title}
        },
        {
            path: Constants.PAGE_PATH.CUSTOMER.ALL.path,
            name: Constants.PAGE_PATH.CUSTOMER.ALL.name,
            component: CustomerPage,
            meta: {title: Constants.PAGE_PATH.CUSTOMER.ALL.title}
        },
        {
            path: Constants.PAGE_PATH.CUSTOMER.NEW.path,
            name: Constants.PAGE_PATH.CUSTOMER.NEW.name,
            component: CustomerInfo
        },
        {
            path: Constants.PAGE_PATH.CUSTOMER.ONE.path,
            name: Constants.PAGE_PATH.CUSTOMER.ONE.name,
            component: CustomerInfo
        },
        {
            path: Constants.PAGE_PATH.DELIVERY_POINT.ALL.path,
            name: Constants.PAGE_PATH.DELIVERY_POINT.ALL.name,
            component: DeliveryPointPage,
            meta: {title: Constants.PAGE_PATH.DELIVERY_POINT.ALL.title}
        },
        {
            path: Constants.PAGE_PATH.DELIVERY_POINT.NEW.path,
            name: Constants.PAGE_PATH.DELIVERY_POINT.NEW.name,
            component: DeliveryPointInfo
        },
        {
            path: Constants.PAGE_PATH.DELIVERY_POINT.ONE.path,
            name: Constants.PAGE_PATH.DELIVERY_POINT.ONE.name,
            component: DeliveryPointInfo
        },
        {
            path: Constants.PAGE_PATH.ORDER.ALL.path,
            name: Constants.PAGE_PATH.ORDER.ALL.name,
            component: OrderPage,
            meta: {title: Constants.PAGE_PATH.ORDER.ALL.title}
        },
        {
            path: Constants.PAGE_PATH.ORDER.NEW.path,
            name: Constants.PAGE_PATH.ORDER.NEW.name,
            component: OrderInfo
        },
        {
            path: Constants.PAGE_PATH.ORDER.ONE.path,
            name: Constants.PAGE_PATH.ORDER.ONE.name,
            component: OrderInfo
        },
        {
            path: '*',
            name: "not found",
            component: NotFound,
            meta: {title: 'Страница не найдена'}
        }
    ]
});

router.beforeEach((to: Route, from: Route, next) => {
    if (to.meta.title !== undefined) {
        document.title = to.meta.title;
    }
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
