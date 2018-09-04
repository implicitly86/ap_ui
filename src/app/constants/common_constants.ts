/*
 * ©  Implicitly86 All Rights Reserved
 */

/**
 * Константы, используемые в приложении.
 */
export const Constants = {
    PAGE_SIZE: 10,
    PAGE_PATH: {
        BASE: {path: '/', name: 'main', title: 'Главная'},
        LOGIN: {path: '/login', name: 'login', title: 'Вход'},
        CUSTOMER: {path: '/customer', name: 'customers', title: 'Клиенты'},
        DELIVERY_POINT: {path: '/delivery-point', name: 'delivery-points', title: 'Пункты отправки / доставки'},
        ORDER: {path: '/order', name: 'orders', title: 'Заказы'}
    },
    AUTH: {
        TOKEN_NAME: 'id_token',
        HEADER_NAME: 'Authorization',
        HEADER_PREFIX: 'Bearer'
    }
};
