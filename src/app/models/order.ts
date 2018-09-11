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
    id: number | undefined;
    /**
     * Штрих-код заказа.
     */
    barcode: string | undefined;
    /**
     * Клиент.
     */
    customer: Customer | undefined;
    /**
     * Пункт приема заказа.
     */
    fromPoint: DeliveryPoint | undefined;
    /**
     * Пункт доставки заказа.
     */
    toPoint: DeliveryPoint | undefined;
    /**
     * Дата создания заказа.
     */
    readonly createdDate: Date | undefined;
    /**
     * Пользователь, создавший запись.
     */
    readonly author: User | undefined;
    /**
     * Дата изменения записи.
     */
    readonly modifiedDate: Date | undefined;
    /**
     * Пользователь, изменивший запись.
     */
    readonly modifiedBy: User | undefined;

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
        id: number | undefined = undefined,
        barcode: string | undefined = undefined,
        customer: Customer | undefined = undefined,
        fromPoint: DeliveryPoint | undefined = undefined,
        toPoint: DeliveryPoint | undefined = undefined,
        createdDate: Date | undefined = undefined,
        author: User | undefined = undefined,
        modifiedDate: Date | undefined = undefined,
        modifiedBy: User | undefined = undefined
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
