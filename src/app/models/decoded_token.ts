/*
 * ©  Implicitly86 All Rights Reserved
 */

import { User } from "./user";

/**
 * Расшифрованный JWT токен.
 *
 * @author Emil Murzakaev.
 */
export class DecodedToken {

    /**
     * Информация о пользователе.
     */
    readonly sub: string;
    /**
     * Время выпуска токена.
     */
    readonly iat: number;
    /**
     * Время истечения действия токена.
     */
    readonly exp: number;

    /**
     * Конструктор.
     */
    constructor(sub: string = "", iat: number = 0, exp: number = 0) {
        this.sub = sub;
        this.iat = iat;
        this.exp = exp;
    }

    /**
     * Получить текущего пользователя.
     *
     * @return текущий пользователь.
     */
    public static getUser(token: DecodedToken): User {
        return JSON.parse(token.sub);
    }

}
