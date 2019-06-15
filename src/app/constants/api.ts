/*
 * ©  Implicitly86 All Rights Reserved
 */

/**
 * Идентификатор, используемый в запросах.
 */
interface IApiAction {
    id: number;
}

/**
 * Параметры запроса, используемые при запросе данных в страничном виде.
 */
interface IApiParameters {
    size?: number;
    page?: number;
    sort?: string;
}

/**
 * API серверной части приложения.
 */
export const Api = {
    BASE: (url: string, params?: IApiParameters) => `${url}${params ? `?size=${params.size ? params.size : ``}&page=${params.page ? params.page : ``}&sort=${params.sort ? params.sort : `id,asc`}` : ``}`,
    LOGIN: () => `/auth/login`,
    DELIVERY_POINT: {
        BASE: (params?: IApiParameters, nextUrl?: string) => Api.BASE(`/delivery-point${nextUrl ? nextUrl : ``}`, params),
        ACTION: (params: IApiAction) => `${Api.DELIVERY_POINT.BASE()}/${params.id}`,
        SEARCH: (params?: IApiParameters) => Api.DELIVERY_POINT.BASE(params, `/search`),
    },
    CUSTOMER: {
        BASE: (params?: IApiParameters, nextUrl?: string) => Api.BASE(`/customer${nextUrl ? nextUrl : ``}`, params),
        ACTION: (params: IApiAction) => `${Api.CUSTOMER.BASE()}/${params.id}`,
        SEARCH: (params?: IApiParameters) => Api.CUSTOMER.BASE(params, `/search`),
    },
    ORDER: {
        BASE: (params?: IApiParameters, nextUrl?: string) => Api.BASE(`/order${nextUrl ? nextUrl : ``}`, params),
        ACTION: (params: IApiAction) => `${Api.ORDER.BASE()}/${params.id}`
    }
};
