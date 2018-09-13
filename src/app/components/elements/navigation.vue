<template>
    <el-menu
            :default-active="activeIndex"
            class="el-menu-demo"
            mode="horizontal"
            active-text-color="#ffd04b"
            background-color="#ffffff"
            :router="true"
    >
        <el-menu-item :index="constants.PAGE_PATH.BASE.path">
            <v-icon name="home"/>
            <span>Главная</span>
        </el-menu-item>
        <el-menu-item :index="constants.PAGE_PATH.DELIVERY_POINT.ALL.path">
            <v-icon name="shipping-fast"/>
            <span>Пункты отправки / доставки</span>
        </el-menu-item>
        <el-menu-item :index="constants.PAGE_PATH.CUSTOMER.ALL.path">
            <v-icon name="users"/>
            <span>Клиенты</span>
        </el-menu-item>
        <el-menu-item :index="constants.PAGE_PATH.ORDER.ALL.path">
            <v-icon name="dolly-flatbed"/>
            <span>Заказы</span>
        </el-menu-item>
        <el-submenu index="" class="right">
            <template slot="title">
                <v-icon name="cogs"/>
                <span>{{currentUser().name}}</span>
            </template>
            <el-menu-item index="" @click="logout">Выход</el-menu-item>
        </el-submenu>
    </el-menu>
</template>

<script lang="ts">
    /*
     * ©  Implicitly86 All Rights Reserved
     */

    import { Component, Vue } from "vue-property-decorator";
    import * as jwtDecode from 'jwt-decode';

    import { Constants } from "../../constants/common_constants";
    import { User } from "../../models/user";
    import { DecodedToken } from "../../models/decoded_token";
    import { router } from "../../router/router";

    /**
     * Компонент, отвечающий за навигацию в приложении.
     *
     * @author Emil Murzakaev.
     */
    @Component({
        name: 'navigation',
        props: {
            activeIndex: {
                type: String,
                default: Constants.PAGE_PATH.BASE.path
            }
        }
    })
    export default class Navigation extends Vue {

        /**
         * Текущий залогиненный пользователь.
         */
        private user: User;
        /**
         * Константы, используемые в приложении.
         */
        private constants = Constants;

        /**
         * Конструктор.
         */
        constructor() {
            super();
            let decodedToken: DecodedToken = jwtDecode<DecodedToken>(localStorage.getItem(Constants.AUTH.TOKEN_NAME)!);
            this.user = DecodedToken.getUser(decodedToken);
        }

        /**
         * Получить текущего залогиненного пользователя.
         *
         * @return текущий залогиненный пользователь.
         */
        public currentUser(): User {
            return this.user;
        }

        /**
         * Выход из приложения.
         */
        public logout() {
            localStorage.removeItem(Constants.AUTH.TOKEN_NAME);
            router.push({path: Constants.PAGE_PATH.LOGIN.path});
        }

    }
</script>

<style scoped>
    a {
        text-decoration: none;
    }

    .right {
        float: right;
        margin-right: 10px;
    }
</style>