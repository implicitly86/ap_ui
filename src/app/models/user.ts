/*
 * ©  Implicitly86 All Rights Reserved
 */

/**
 * Модель роли пользователя.
 *
 * @author Emil Murzakaev.
 */
class Role {

    /**
     * Уникальный идентификатор роли.
     */
    readonly id: number;
    /**
     * Название роли.
     */
    readonly name: string;

    /**
     * Конструктор.
     *
     * @param id уникальный идентификатор роли.
     * @param name название роли.
     */
    constructor(id: number = 0, name: string = "") {
        this.id = id;
        this.name = name;
    }
}

/**
 * Информация о пользователе, хранящаяся в JWT токене.
 *
 * @author Emil Murzakaev.
 */
export class User {

    /**
     * Уникальный идентификатор пользователя.
     */
    readonly id: number;
    /**
     * Имя пользователя.
     */
    readonly name: string;
    /**
     * Коллекция разрешений пользователя.
     */
    readonly roles: Array<Role> = [];

    /**
     * Конструктор.
     */
    constructor(id: number = 0, name: string = "", roles: Array<Role> = []) {
        this.id = id;
        this.name = name;
        this.roles = roles;
    }

}