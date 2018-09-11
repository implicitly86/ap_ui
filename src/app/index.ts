/*
 * ©  Implicitly86 All Rights Reserved
 */

import Vue from "vue";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueFlexboxgrid from 'vue-flexboxgrid'
import 'vue-flexboxgrid/dist/vue-flexboxgrid.css'

import { router } from "./router/router";
import App from "./components/app.vue";
import { httpClient } from "./utils/http_client";
import { Constants } from "./constants/common_constants";

if (localStorage.getItem(Constants.AUTH.TOKEN_NAME) != null) {
    httpClient.defaults.headers.common[Constants.AUTH.HEADER_NAME] = Constants.AUTH.HEADER_PREFIX + " " + localStorage.getItem(Constants.AUTH.TOKEN_NAME);
}

Vue.use(ElementUI);
Vue.use(VueFlexboxgrid);

new Vue({
    el: "#app",
    router,
    template: `<app></app>`,
    components: {App}
});
