/*
 * ©  Implicitly86 All Rights Reserved
 */

import { User } from "./user";

/**
 * Перечисление типов клиентов.
 *
 * @author Emil Murzakaev.
 */
export class CustomerType {
    public static naturalPerson = "NATURAL_PERSON";
    public static legalPerson = "LEGAL_PERSON";

    public static getDisplayName(val: CustomerType): string {
        if (val === this.naturalPerson) {
            return "Физическое лицо";
        }
        if (val === this.legalPerson) {
            return "Юридическое лицо";
        }
        return "";
    }
}

/**
 * Модель сушности "Клиент".
 *
 * @author Emil Murzakaev.
 */
export class Customer {

    /**
     * Уникальный идентификатор.
     */
    id: number | undefined;
    /**
     * Название клиента.
     */
    name: string | undefined;
    /**
     * Имя клиента.
     */
    firstName: string | undefined;
    /**
     * Фамилия клиента.
     */
    lastName: string | undefined;
    /**
     * Отчество клиента.
     */
    middleName: string | undefined;
    /**
     * Адрес клиента.
     */
    address: string | undefined;
    /**
     * Телефон клиента.
     */
    phone: string | undefined;
    /**
     * Почта клиента.
     */
    email: string | undefined;
    /**
     * Тип клиента.
     */
    type: string | undefined;
    /**
     * Дата создания.
     */
    createdDate: Date | undefined;
    /**
     * Идентификатор пользователя, создавшего запись.
     */
    author: User | undefined;

    /**
     * Конструктор.
     *
     * @param id уникальный идентификатор клиента.
     * @param name название клиента.
     * @param firstName имя клиента.
     * @param lastName фамилия клиента.
     * @param middleName отчество клиента.
     * @param address адрес клиента.
     * @param phone телефон клиента.
     * @param email почта клиента.
     * @param type тип клиента.
     * @param createdDate дата создания.
     * @param author идентификатор пользователя, создавшего запись.
     */
    constructor(
        id: number | undefined = undefined,
        name: string | undefined = undefined,
        firstName: string | undefined = undefined,
        lastName: string | undefined = undefined,
        middleName: string | undefined = undefined,
        address: string | undefined = undefined,
        phone: string | undefined = undefined,
        email: string | undefined = undefined,
        type: string | undefined = undefined,
        createdDate: Date | undefined = undefined,
        author: User | undefined = undefined
    ) {
        this.id = id;
        this.name = name;
        this.firstName = firstName;
        this.lastName = lastName;
        this.middleName = middleName;
        this.address = address;
        this.phone = phone;
        this.email = email;
        this.type = type;
        this.createdDate = createdDate;
        this.author = author;
    }

}
