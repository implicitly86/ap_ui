<template>
    <div>
        <parallax-container class="horizontal-card centered-card">
            <parallax-element class="text-container" :parallaxStrength="10" :type="'depth'">
                <div class="logo">
                    <h1><span>Awesome Project</span></h1>
                </div>
            </parallax-element>
            <parallax-element class="background-image" :parallaxStrength="-10" :type="'depth'">
            </parallax-element>
        </parallax-container>
        <div class="login-page">
            <div class="form">
                <form class="login-form" :action="authenticate">
                    <el-input class="custom_input" placeholder="Имя пользователя" v-model="username">
                        <v-icon class="icon" name="user" slot="suffix"/>
                    </el-input>
                    <el-input class="custom_input" placeholder="Пароль" v-model="password" type="password">
                        <v-icon class="icon" name="key" slot="suffix"/>
                    </el-input>
                    <el-button type="primary" @click="authenticate">Вход</el-button>
                    <p class="message"><a href="#">Забыли пароль?</a></p>
                </form>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    /*
     * ©  Implicitly86 All Rights Reserved
     */

    import { Component, Vue } from "vue-property-decorator";
    import { Message } from "element-ui";

    import { httpClient } from "../../utils/http_client";
    import { Api } from "../../constants/api";
    import { Token } from "../../models/token";
    import { router } from "../../router/router";
    import { Loading } from "../elements/loading";
    import { Constants } from "../../constants/common_constants";

    /**
     * Компонент, реализующий страницу входа в приложение.
     *
     * @author Emil Murzakaev.
     */
    @Component
    export default class LoginPage extends Vue {

        /**
         * Имя пользователя.
         */
        private username: string = "";

        /**
         * Пароль пользователя.
         */
        private password: string = "";

        /**
         * Метод авторизации.
         */
        public authenticate() {
            Loading.show();
            httpClient.post<Token>(Api.LOGIN(), {
                username: this.username,
                password: this.password
            }).then(response => {
                Loading.close();
                localStorage.setItem(Constants.AUTH.TOKEN_NAME, response.data.access_token);
                httpClient.defaults.headers.common[Constants.AUTH.HEADER_NAME] = Constants.AUTH.HEADER_PREFIX + " " + response.data.access_token;
                let route;
                if (router.currentRoute.query['redirect'] !== undefined) {
                    route = {name: router.currentRoute.query['redirect']};
                } else {
                    route = {name: Constants.PAGE_PATH.BASE.name};
                }
                router.push(route);
            }).catch(error => Message.error("Неверный логин / пароль" + error.toString()));
        }

    }
</script>

<style scoped>
    .login-page {
        width: 360px;
        /*padding: 15% 0 0 !important;*/
        margin: auto;
    }

    .form {
        position: relative;
        z-index: 1;
        background: #FFFFFF;
        max-width: 360px;
        margin: 0 auto 100px;
        padding: 45px;
        text-align: center;
        box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
    }

    .custom_input {
        /*
        font-family: "Roboto", sans-serif;
        outline: 0;
        background: #f2f2f2;
        width: 100%;
        border: 0;
        */
        margin: 0 0 15px;
        /*
        padding: 15px;
        box-sizing: border-box;
        font-size: 14px;
        */
    }

    .custom_input .icon{
        height: 100%;
    }

    .form button {
        font-family: "Roboto", sans-serif;
        text-transform: uppercase;
        outline: 0;
        background: #FFD04B;
        width: 100%;
        border: 0;
        padding: 15px;
        color: #FFFFFF;
        font-size: 14px;
        -webkit-transition: all 0.3 ease;
        transition: all 0.3 ease;
        cursor: pointer;
    }

    .form button:hover, .form button:active, .form button:focus {
        background: #FFE18C;
    }

    .form .message {
        margin: 15px 0 0;
        color: #b3b3b3;
        font-size: 12px;
    }

    .form .message a {
        color: #CACACA;
        text-decoration: none;
    }

    .logo {
        /*background: url(http://www.color-hex.com/palettes/26323.png) repeat;*/
        margin:10px;
        text-align: center;
    }
    .logo h1 {
        background-color:#fff;
        overflow:hidden;
        display:inline-block;
        padding:10px;
        font-weight:bold;
        font-family:arial;
        color:transparent;
        font-size: 8em;
    }
    .logo span {
         background: url(http://www.color-hex.com/palettes/26323.png) -20px -20px repeat;
         -webkit-text-fill-color: transparent;
         -webkit-background-clip: text;
         display:block;
    }
</style>