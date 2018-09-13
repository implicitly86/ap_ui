/*
 * ©  Implicitly86 All Rights Reserved
 */

import { injectable } from "vue-typescript-inject";

import { AxiosPromise } from "axios";
import { Page } from "../models/page";
import { DeliveryPoint } from "../models/delivery_point";
import { Api } from "../constants/api";
import { httpClient } from "../utils/http_client";
import { Constants } from "../constants/common_constants";

/**
 * Сервис, реализующий доступ к сущности Пункт отправки / доставки.
 *
 * @author Emil Murzakaev.
 */
@injectable()
export class DeliveryPointService {

    /**
     * Получить список DeliveryPoint.
     *
     * @param page номер страницы.
     * @param sort сортировка.
     */
    public getAll(page?: number, sort?: string): AxiosPromise<Page<DeliveryPoint>> {
        let parameters = {size: Constants.PAGE_SIZE, page: page, sort: sort};
        return httpClient.get<Page<DeliveryPoint>>(Api.DELIVERY_POINT.BASE(parameters));
    }

    /**
     * Получить сущность DeliveryPoint по идентификатору.
     *
     * @param id идентификатор.
     */
    public getOne(id: number): AxiosPromise<DeliveryPoint> {
        return httpClient.get<DeliveryPoint>(Api.DELIVERY_POINT.ACTION({id: id}));
    }

    /**
     * Сохранить сущность DeliveryPoint.
     *
     * @param deliveryPoint сущность DeliveryPoint.
     */
    public save(deliveryPoint: DeliveryPoint): AxiosPromise<DeliveryPoint> {
        if (deliveryPoint.id !== undefined && deliveryPoint.id > 0) {
            return httpClient.put<DeliveryPoint>(Api.DELIVERY_POINT.ACTION({id: deliveryPoint.id}), deliveryPoint);
        }
        return httpClient.post<DeliveryPoint>(Api.DELIVERY_POINT.BASE(), deliveryPoint);
    }

    /**
     * Удалить сущность DeliveryPoint.
     *
     * @param id идентификатор.
     */
    public delete(id: number): AxiosPromise<void> {
        return httpClient.delete(Api.DELIVERY_POINT.ACTION({id: id}));
    }

    /**
     * Поиск сущности DeliveryPoint.
     *
     * @param searchFilter сущность DeliveryPoint.
     */
    public search(searchFilter: DeliveryPoint): AxiosPromise<Page<DeliveryPoint>> {
        return httpClient.post<Page<DeliveryPoint>>(Api.DELIVERY_POINT.SEARCH({size: Constants.PAGE_SIZE}), searchFilter);
    }

}
