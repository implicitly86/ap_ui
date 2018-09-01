/*
 * ©  Implicitly86 All Rights Reserved
 */

import { User } from "./user";
import { DeliveryPoint } from "./delivery_point";
import { Customer } from "./customer";

/**
 * Модель сушности "Заказ".
 *
 * @author Emil Murzakaev.
 */
export class Order {

    /**
     * Уникальный идентификатор.
     */
    readonly id: number;
    /**
     * Штрих-код заказа.
     */
    readonly barcode: string;
    /**
     * Клиент.
     */
    readonly customer: Customer;
    /**
     * Пункт приема заказа.
     */
    readonly fromPoint: DeliveryPoint;
    /**
     * Пункт доставки заказа.
     */
    readonly toPoint: DeliveryPoint;
    /**
     * Дата создания заказа.
     */
    readonly createdDate: Date;
    /**
     * Пользователь, создавший запись.
     */
    readonly author: User;
    /**
     * Дата изменения записи.
     */
    readonly modifiedDate: Date;
    /**
     * Пользователь, изменивший запись.
     */
    readonly modifiedBy: User;

    /**
     * Конструктор.
     *
     * @param id уникальный идентификатор клиента.
     * @param barcode штрих-код заказа.
     * @param customer клиент.
     * @param fromPoint пункт приема заказа.
     * @param toPoint пункт доставки заказа.
     * @param createdDate дата создания заказа.
     * @param author пользователь, создавший запись.
     * @param modifiedDate дата изменения записи.
     * @param modifiedBy пользователь, изменивший запись.
     */
    constructor(
        id: number = 0,
        barcode: string = "",
        customer: Customer,
        fromPoint: DeliveryPoint,
        toPoint: DeliveryPoint,
        createdDate: Date,
        author: User,
        modifiedDate: Date,
        modifiedBy: User
    ) {
        this.id = id;
        this.barcode = barcode;
        this.customer = customer;
        this.fromPoint = fromPoint;
        this.toPoint = toPoint;
        this.createdDate = createdDate;
        this.author = author;
        this.modifiedDate = modifiedDate;
        this.modifiedBy = modifiedBy;
    }

}
