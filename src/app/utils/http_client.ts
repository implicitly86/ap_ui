/*
 * ©  Implicitly86 All Rights Reserved
 */

import { Promise } from 'es6-promise';
import axios, { AxiosError } from "axios";
import { router } from "../router/router";
import { Constants } from "../constants/common_constants";

export let httpClient = axios.create({
    baseURL: (process.env.BASE_API_URL || "http://localhost") + ":" + (process.env.BASE_API_PORT || "8080") + '/api/v1',
    timeout: 60000
});

httpClient.interceptors.response.use(undefined, (error: AxiosError) => {
    let currentRoute = router.currentRoute.name!;
    if (error.response != undefined && error.response!.status == 401 && currentRoute != Constants.PAGE_PATH.LOGIN.name) {
        localStorage.removeItem(Constants.AUTH.TOKEN_NAME);
        router.push({path: Constants.PAGE_PATH.LOGIN.path, query: {'redirect': currentRoute}});
    } else {
        return Promise.reject(error);
    }
});
