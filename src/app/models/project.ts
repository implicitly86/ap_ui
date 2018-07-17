/*
 * ©  Implicitly86 All Rights Reserved
 */

/**
 * Модель сущности Проект.
 *
 * @author Emil Murzakaev.
 */
export default class Project {

    /**
     * Уникальный идентификатор проекта.
     */
    readonly projectUid: string;
    /**
     * Название проекта.
     */
    readonly projectName: string;

    /**
     * Конструктор.
     */
    constructor(projectUid: string = "", projectName: string = "") {
        this.projectUid = projectUid;
        this.projectName = projectName;
    }

}
