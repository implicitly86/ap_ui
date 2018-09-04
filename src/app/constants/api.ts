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
    BASE: (url: string, params?: IApiParameters) => `${url}${params ? `?size=${params.size ? params.size : ``}&page=${params.page ? params.page : ``}&sort=${params.sort ? params.sort : ``}` : ``}`,
    LOGIN: () => `/login`,
    DELIVERY_POINT: {
        BASE: (params?: IApiParameters) => Api.BASE(`/delivery-point`, params),
        ACTION: (params: IApiAction) => `${Api.DELIVERY_POINT.BASE()}/${params.id}`
    },
    CUSTOMER: {
        BASE: (params?: IApiParameters) => Api.BASE(`/customer`, params),
        ACTION: (params: IApiAction) => `${Api.CUSTOMER.BASE()}/${params.id}`
    },
    ORDER: {
        BASE: (params?: IApiParameters) => Api.BASE(`/order`, params),
        ACTION: (params: IApiAction) => `${Api.ORDER.BASE()}/${params.id}`
    }
};
