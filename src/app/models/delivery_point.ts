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
    id: number | undefined = undefined;
    /**
     * Название точки доставки.
     */
    name: string | undefined = undefined;
    /**
     * Адрес точки доставки.
     */
    address: string | undefined = undefined;
    /**
     * Почтовый индекс точки доставки.
     */
    postcode: string | undefined = undefined;
    /**
     * Телефон точки доставки.
     */
    phone: string | undefined = undefined;
    /**
     * Почта точки доставки.
     */
    email: string | undefined = undefined;

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
    constructor(id: number | undefined = undefined,
                name: string | undefined = undefined,
                address: string | undefined = undefined,
                postcode: string | undefined = undefined,
                phone: string | undefined = undefined,
                email: string | undefined = undefined
    ) {
        this.id = id;
        this.name = name;
        this.address = address;
        this.postcode = postcode;
        this.phone = phone;
        this.email = email;
    }

}
