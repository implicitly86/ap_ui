/*
 * ©  Implicitly86 All Rights Reserved
 */

/**
 * Константы, используемые в приложении.
 */
export const Constants = {
    PAGE_SIZE: 10,
    PAGE_PATH: {
        BASE: {path: '/', name: 'main'},
        LOGIN: {path: '/login', name: 'login'},
        CUSTOMER: {path: '/customer', name: 'customers'},
        DELIVERY_POINT: {path: '/delivery-point', name: 'delivery-points'},
        ORDER: {path: '/order', name: 'orders'}
    },
    AUTH: {
        TOKEN_NAME: 'id_token',
        HEADER_NAME: 'Authorization',
        HEADER_PREFIX: 'Bearer'
    }
};
