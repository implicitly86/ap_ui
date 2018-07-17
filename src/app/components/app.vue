<template>
    <router-view class="view content"></router-view>
</template>

<script lang="ts">
    /*
     * ©  Implicitly86 All Rights Reserved
     */

    import { Component, Vue } from "vue-property-decorator";
    import * as schedule from "node-schedule";
    import * as jwtDecode from 'jwt-decode';

    import DecodedToken from "../models/decoded_token";
    import router from "../router/router";

    @Component
    export default class App extends Vue {

        constructor() {
            super();
            schedule.scheduleJob('checkTokenExpiration', '*/1 * * * *', () => {
                let currentRoute = router.currentRoute.name!;
                if (localStorage.getItem('id_token') != null && currentRoute != 'login') {
                    let decodedToken: DecodedToken = jwtDecode(localStorage.getItem('id_token')!);
                    let currentDateTime = new Date().getTime();
                    let expireDateTime = decodedToken.exp * 1000;
                    if ((expireDateTime - currentDateTime) / 1000 < 60) {
                        localStorage.removeItem('id_token');
                        router.push({path: '/login', query: {'redirect': currentRoute}});
                    }
                }
            });
        }

    }

</script>

<style scoped></style>