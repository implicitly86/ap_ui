/*
 * ©  Implicitly86 All Rights Reserved
 */

/**
 * Модель сушности "Пункт отправки/доставки".
 *
 * @author Emil Murzakaev.
 */
export class DeliveryPoint {

    /**
     * Уникальный идентификатор.
     */
    readonly id: number;
    /**
     * Название точки доставки.
     */
    readonly name: string;
    /**
     * Адрес точки доставки.
     */
    readonly address: string;
    /**
     * Почтовый индекс точки доставки.
     */
    readonly postcode: string;
    /**
     * Телефон точки доставки.
     */
    readonly phone: string;
    /**
     * Почта точки доставки.
     */
    readonly email: string;

    /**
     * Конструктор.
     *
     * @param id уникальный идентификатор роли.
     * @param name название роли.
     * @param address адрес точки доставки.
     * @param postcode почтовый индекс точки доставки.
     * @param phone телефон точки доставки.
     * @param email почта точки доставки.
     */
    constructor(id: number = 0, name: string = "", address: string = "",
                postcode: string = "", phone: string = "", email: string = "") {
        this.id = id;
        this.name = name;
        this.address = address;
        this.postcode = postcode;
        this.phone = phone;
        this.email = email;
    }

}
