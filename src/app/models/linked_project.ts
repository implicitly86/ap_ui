/*
 * ©  Implicitly86 All Rights Reserved
 */

import Project from "./project";

/**
 * Модель сущности, хранящей информацию о связываемых проектах.
 *
 * @author Emil Murzakaev.
 */
export default class LinkedProject {

    /**
     * Уникальный идентификатор связки проектов.
     */
    private readonly id: number;
    /**
     * Jira проект.
     */
    private readonly jiraProject: Project;
    /**
     * MSP проект.
     */
    private mspProject: Project;

    /**
     * Конструктор.
     */
    constructor(id: number, jiraProject: Project, mspProject: Project) {
        this.id = id;
        this.jiraProject = jiraProject;
        this.mspProject = mspProject;
    }

}
