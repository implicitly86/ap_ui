/*
 * ©  Implicitly86 All Rights Reserved
 */

import "reflect-metadata";

import Vue from "vue";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueFlexboxgrid from 'vue-flexboxgrid'
import 'vue-flexboxgrid/dist/vue-flexboxgrid.css'
import Icon from 'vue-awesome/components/Icon'
import 'vue-awesome/icons';
import VueMouseParallax from 'vue-mouse-parallax'

import { router } from "./router/router";
import App from "./components/app.vue";
import { httpClient } from "./utils/http_client";
import { Constants } from "./constants/common_constants";
import VueTypeScriptInject from "vue-typescript-inject";

if (localStorage.getItem(Constants.AUTH.TOKEN_NAME) != null) {
    httpClient.defaults.headers.common[Constants.AUTH.HEADER_NAME] = Constants.AUTH.HEADER_PREFIX + " " + localStorage.getItem(Constants.AUTH.TOKEN_NAME);
}

Vue.use(ElementUI);
Vue.use(VueFlexboxgrid);
Vue.use(VueMouseParallax);
Vue.use(VueTypeScriptInject);
Vue.component('v-icon', Icon);

new Vue({
    el: "#app",
    router,
    template: `<app></app>`,
    components: {App}
});
