/*
     * ©  Implicitly86 All Rights Reserved
     */

import { injectable } from "vue-typescript-inject";

import { AxiosPromise } from "axios";
import { Page } from "../models/page";
import { Api } from "../constants/api";
import { httpClient } from "../utils/http_client";
import { Constants } from "../constants/common_constants";
import { Customer } from "../models/customer";

/**
 * Сервис, реализующий доступ к сущности Клиент.
 *
 * @author Emil Murzakaev.
 */
@injectable()
export class CustomerService {

    /**
     * Получить список Customer.
     *
     * @param page номер страницы.
     * @param sort сортировка.
     */
    public getAll(page?: number, sort?: string): AxiosPromise<Page<Customer>> {
        let parameters = {size: Constants.PAGE_SIZE, page: page, sort: sort};
        return httpClient.get<Page<Customer>>(Api.CUSTOMER.BASE(parameters));
    }

    /**
     * Получить сущность Customer по идентификатору.
     *
     * @param id идентификатор.
     */
    public getOne(id: number): AxiosPromise<Customer> {
        return httpClient.get<Customer>(Api.CUSTOMER.ACTION({id: id}));
    }

    /**
     * Сохранить сущность Customer.
     *
     * @param customer сущность DeliveryPoint.
     */
    public save(customer: Customer): AxiosPromise<Customer> {
        if (customer.id !== undefined && customer.id > 0) {
            return httpClient.put<Customer>(Api.CUSTOMER.ACTION({id: customer.id}), customer);
        }
        return httpClient.post<Customer>(Api.CUSTOMER.BASE(), customer);
    }

    /**
     * Удалить сущность Customer.
     *
     * @param id идентификатор.
     */
    public delete(id: number): AxiosPromise<void> {
        return httpClient.delete(Api.CUSTOMER.ACTION({id: id}));
    }

    /**
     * Поиск сущности Customer.
     *
     * @param searchFilter сущность Customer.
     */
    public search(searchFilter: Customer): AxiosPromise<Page<Customer>> {
        return httpClient.post<Page<Customer>>(Api.CUSTOMER.SEARCH({size: Constants.PAGE_SIZE}), searchFilter);
    }

}
