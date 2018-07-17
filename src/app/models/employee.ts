/*
 * ©  Implicitly86 All Rights Reserved
 */

/**
 * Модель сущности Проект.
 *
 * @author Emil Murzakaev.
 */
export default class Employee {

    /**
     * Полное имя.
     */
    readonly fullName: string;
    /**
     * Электронная почта.
     */
    readonly email: string;

    /**
     * Конструктор.
     */
    constructor(fullName: string = "", email: string = "") {
        this.fullName = fullName;
        this.email = email;
    }

}
