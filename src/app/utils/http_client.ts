/*
 * ©  Implicitly86 All Rights Reserved
 */

import { Promise } from 'es6-promise';
import axios, { AxiosError } from "axios";
import router from "../router/router";

let httpClient = axios.create({
    baseURL: (process.env.BASE_API_URL || "http://localhost") + ":" + (process.env.BASE_API_PORT || "8080") + '/api/v1',
    timeout: 60000
});

httpClient.interceptors.response.use(undefined, (error: AxiosError) => {
    let currentRoute = router.currentRoute.name!;
    if (error.response != undefined && error.response!.status == 401 && currentRoute != 'login') {
        localStorage.removeItem('id_token');
        router.push({path: '/login', query: {'redirect': currentRoute}});
    } else {
        return Promise.reject(error);
    }
});

export default httpClient;