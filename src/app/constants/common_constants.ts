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
        CUSTOMER: {
            ALL: {path: '/customer', name: 'customers', title: 'Клиенты'},
            ONE: {path: '/customer/:id', name: 'customer', title: 'Клиент'},
            NEW: {path: '/customer/new', name: 'new_customer', title: 'Новый клиент'}
        },
        DELIVERY_POINT: {
            ALL: {path: '/delivery-point', name: 'delivery-points', title: 'Пункты отправки / доставки'},
            ONE: {path: '/delivery-point/:id', name: 'delivery-point', title: 'Пункт отправки / доставки'},
            NEW: {path: '/delivery-point/new', name: 'new_delivery-point', title: 'Новый пункт отправки / доставки'}
        },
        ORDER: {
            ALL: {path: '/order', name: 'orders', title: 'Заказы'},
            ONE: {path: '/order/:id', name: 'order', title: 'Заказ'},
            NEW: {path: '/order/new', name: 'new_order', title: 'Новый заказ'}
        }
    },
    AUTH: {
        TOKEN_NAME: 'id_token',
        HEADER_NAME: 'Authorization',
        HEADER_PREFIX: 'Bearer'
    }
};
