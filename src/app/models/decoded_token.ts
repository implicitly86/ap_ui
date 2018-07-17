/*
 * ©  Implicitly86 All Rights Reserved
 */

/**
 * Информация о пользователе, хранящаяся в JWT токене.
 *
 * @author Emil Murzakaev.
 */
class UserInfo {

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
    readonly authorities: Array<String> = [];

    /**
     * Конструктор.
     */
    constructor(id: number = 0, name: string = "", authorities: Array<String>) {
        this.id = id;
        this.name = name;
        this.authorities = authorities;
    }

}

/**
 * Расшифрованный JWT токен.
 *
 * @author Emil Murzakaev.
 */
class DecodedToken {

    /**
     * Информация о пользователе.
     */
    readonly sub: UserInfo | null;
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
    constructor(sub: UserInfo | null = null, iat: number = 0, exp: number = 0) {
        this.sub = sub;
        this.iat = iat;
        this.exp = exp;
    }

}

export default DecodedToken;