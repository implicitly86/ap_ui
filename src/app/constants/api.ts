/*
 * ©  Implicitly86 All Rights Reserved
 */

/**
 * Идентификатор, используемый в запросах.
 */
interface IApiAction {
    id: number | string;
}

/**
 * Параметры запроса, используемые при запросе данных в страничном виде.
 */
interface IApiParameters {
    size: number;
    page: number;
}

/**
 * API серверной части приложения.
 */
export const Api = {
    LOGIN: () => `/login`,
    DELIVERY_POINT: {
        BASE: (params?: IApiParameters) => `/delivery-point${params? `?size=${params.size}&page=${params.page}`: ``}`,
        ACTION: (params: IApiAction) => `${Api.DELIVERY_POINT.BASE}/${params.id}`
    },
    CUSTOMER: {
        BASE: (params?: IApiParameters) => `/customer${params? `?size=${params.size}&page=${params.page}`: ``}`,
        ACTION: (params: IApiAction) => `${Api.CUSTOMER.BASE}/${params.id}`
    },
    ORDER: {
        BASE: (params?: IApiParameters) => `/order${params? `?size=${params.size}&page=${params.page}`: ``}`,
        ACTION: (params: IApiAction) => `${Api.ORDER.BASE}/${params.id}`
    }
};
