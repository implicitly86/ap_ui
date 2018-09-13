/*
 * ©  Implicitly86 All Rights Reserved
 */

import { injectable } from "vue-typescript-inject";

import { AxiosPromise } from "axios";
import { Page } from "../models/page";
import { Api } from "../constants/api";
import { httpClient } from "../utils/http_client";
import { Constants } from "../constants/common_constants";
import { Order } from "../models/order";

/**
 * Сервис, реализующий доступ к сущности Заказ.
 *
 * @author Emil Murzakaev.
 */
@injectable()
export class OrderService {

    /**
     * Получить список Order.
     *
     * @param page номер страницы.
     * @param sort сортировка.
     */
    public getAll(page?: number, sort?: string): AxiosPromise<Page<Order>> {
        let parameters = {size: Constants.PAGE_SIZE, page: page, sort: sort};
        return httpClient.get<Page<Order>>(Api.ORDER.BASE(parameters))
    }

    /**
     * Получить сущность Order по идентификатору.
     *
     * @param id идентификатор.
     */
    public getOne(id: number): AxiosPromise<Order> {
        return httpClient.get<Order>(Api.ORDER.ACTION({id: id}));
    }

    /**
     * Сохранить сущность Order.
     *
     * @param order сущность Order.
     */
    public save(order: Order): AxiosPromise<Order> {
        if (order.id !== undefined && order.id > 0) {
            return httpClient.put<Order>(Api.ORDER.ACTION({id: order.id}), order);
        }
        return httpClient.post<Order>(Api.ORDER.BASE(), order);
    }

    /**
     * Удалить сущность Order.
     *
     * @param id идентификатор.
     */
    public delete(id: number): AxiosPromise<void> {
        return httpClient.delete(Api.ORDER.ACTION({id: id}));
    }

}
