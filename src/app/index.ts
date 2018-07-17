/*
 * ©  Implicitly86 All Rights Reserved
 */

import Vue from "vue";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import router from "./router/router";
import App from "./components/app.vue";
import httpClient from "./utils/http_client";

if (localStorage.getItem('id_token') != null) {
    httpClient.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem('id_token');
}

Vue.use(ElementUI);

new Vue({
    el: "#app",
    router,
    template: `<app></app>`,
    components: {App}
});
