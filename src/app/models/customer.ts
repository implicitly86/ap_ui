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
    id: number;
    /**
     * Название клиента.
     */
    name: string;
    /**
     * Имя клиента.
     */
    firstName: string;
    /**
     * Фамилия клиента.
     */
    lastName: string;
    /**
     * Отчество клиента.
     */
    middleName: string;
    /**
     * Адрес клиента.
     */
    address: string;
    /**
     * Телефон клиента.
     */
    phone: string;
    /**
     * Почта клиента.
     */
    email: string;
    /**
     * Тип клиента.
     */
    type: string;
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
        id: number = 0,
        name: string = "",
        firstName: string = "",
        lastName: string = "",
        middleName: string = "",
        address: string = "",
        phone: string = "",
        email: string = "",
        type: string = "",
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

export function toEntity(dto: Customer): Customer {
    if (dto.type === CustomerType.naturalPerson) {
        dto.name = `${dto.lastName} ${dto.firstName.substring(0, 1)}. ${dto.middleName.substring(0, 1)}.`;
        dto.type = "Физ.лицо";
    } else {
        dto.type = "Юр.лицо";
    }
    return dto;
}
