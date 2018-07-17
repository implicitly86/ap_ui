<template>
    <el-container>
        <el-col :span="5">
            <navigation active-index="1"></navigation>
        </el-col>
        <el-col :sm="10" :md="16" :xl="19" class="main_container">
            <h1>Соответствие MSP - JIRA</h1>
            <div>
                <div class="action_menu">
                    <el-button-group>
                        <el-button icon="el-icon-plus" size="small" @click="addProjectVisible = true">Добавить</el-button>
                        <el-button icon="el-icon-delete" size="small" @click="unlinkProjects">Удалить</el-button>
                    </el-button-group>
                </div>
                <el-table
                        ref="multipleTable"
                        :data="linkedProjects"
                        max-height="600"
                        style="width: 100%"
                        @selection-change="handleSelectionChange"
                >
                    <el-table-column type="selection" width="55"></el-table-column>
                    <el-table-column prop="jiraProject.projectName" label="Jira проект" sortable width="250"></el-table-column>
                    <el-table-column prop="mspProject.projectName" label="MSP проект" sortable width="600"></el-table-column>
                    <el-table-column prop="jiraProject.projectUid" label="Jira ID" sortable width="100"></el-table-column>
                    <el-table-column prop="mspProject.projectUid" label="MSP ID" sortable></el-table-column>
                </el-table>
            </div>
            <div v-show="addProjectVisible">
                <el-container style="margin-top: 20px; margin-bottom: 10px">
                    <el-col :span="4">
                        <div class="sub-title">Jira проект</div>
                        <el-select
                                v-model="jiraProject"
                                filterable
                                remote
                                reserve-keyword
                                placeholder="Начните вводить"
                                :remote-method="searchJiraProject"
                        >
                            <el-option
                                    v-for="item in jiraProjectOptions"
                                    :key="item.projectName"
                                    :label="item.projectName"
                                    :value="item.projectUid">
                            </el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="4">
                        <div class="sub-title">MSP проект</div>
                        <el-select
                                v-model="mspProject"
                                filterable
                                remote
                                reserve-keyword
                                placeholder="Начните вводить"
                                :remote-method="searchMspProject"
                        >
                            <el-option
                                    v-for="item in mspProjectOptions"
                                    :key="item.projectName"
                                    :label="item.projectName"
                                    :value="item.projectUid">
                            </el-option>
                        </el-select>
                    </el-col>
                </el-container>
                <el-container>
                    <el-button type="primary" @click="createLink">Сохранить</el-button>
                    <el-button @click="cancel">Отмена</el-button>
                </el-container>
            </div>
        </el-col>
    </el-container>
</template>

<script lang="ts">
    /*
     * ©  Implicitly86 All Rights Reserved
     */

    import { Component, Vue } from "vue-property-decorator";
    import { Message } from "element-ui";

    import httpClient from "../../utils/http_client";
    import Navigation from './../navigation';
    import Project from "../../models/project";
    import LinkedProject from "../../models/linked_project";
    import Api from "../../constants/api";

    /**
     * Компонент, реализующий работу со списком соответствия проектов MSP - Jira.
     *
     * @author Emil Murzakaev.
     */
    @Component({
        components: {
            Navigation
        }
    })
    export default class ProjectMapping extends Vue {

        /**
         * Список слинкованных проектов
         */
        linkedProjects: Array<LinkedProject> = [];
        /**
         * Выбранный Jira проект
         */
        jiraProject: string = "";
        /**
         * Выбранный MSP проект
         */
        mspProject: string = "";
        /**
         * Отсортированный список Jira проект
         */
        jiraProjectOptions: Array<Project> = [];
        /**
         * Отсортированный список MSP проектов
         */
        mspProjectOptions: Array<Project> = [];
        /**
         * Список Jira проектов
         */
        private jiraProjects: Array<Project> = [];
        /**
         * Список Msp проектов
         */
        private mspProjects: Array<Project> = [];
        /**
         * Список выделенных проектов.
         */
        private selectedProjects: Array<LinkedProject> = [];
        /**
         * Пареметр, отвечающий за показ формы добавления проекта.
         */
        private addProjectVisible: boolean = false;

        /**
         * Конструктор.
         */
        constructor() {
            super();
            this.loadProjects();
            this.loadJiraProjects();
            this.loadMspProjects();
        }

        /**
         * Получение списка слинкованных проектов.
         */
        public loadProjects() {
            httpClient.get<Array<LinkedProject>>(Api.GET_LINKED_PROJECTS).then(response =>
                this.linkedProjects = response.data
            ).catch(error => Message.error("Произошла ошибка : " + error.toString()));
        }

        /**
         * Получение списка Jira проектов.
         */
        public loadJiraProjects() {
            httpClient.get<Array<Project>>(Api.GET_JIRA_PROJECTS).then(response =>
                this.jiraProjects = response.data
            ).catch(error => Message.error("Произошла ошибка : " + error.toString()));
        }

        /**
         * Получение списка MSP проектов.
         */
        public loadMspProjects() {
            httpClient.get<Array<Project>>(Api.GET_MSP_PROJECTS).then(response =>
                this.mspProjects = response.data
            ).catch(error => Message.error("Произошла ошибка : " + error.toString()));
        }

        /**
         * Создание связи Jira -> MSP.
         */
        public createLink() {
            let jiraProject = new Project(this.jiraProject, "");
            let mspProject = new Project(this.mspProject, "");
            let linkedProject = new LinkedProject(1, jiraProject, mspProject);
            httpClient.post(Api.POST_LINK_PROJECTS, linkedProject).then(() =>
                this.loadProjects()
            ).catch(error => Message.error("Произошла ошибка : " + error.toString()));
            this.jiraProject = "";
            this.mspProject = "";
        }

        /**
         * Поиск MSP проекта.
         *
         * @param query запрос.
         */
        public searchJiraProject(query: string) {
            if (query.length >= 3) {
                this.jiraProjectOptions = this.jiraProjects.filter(item => {
                    return item.projectName.toLowerCase().indexOf(query.toLowerCase()) > -1;
                });
            } else {
                this.jiraProjectOptions = [];
            }
        }

        /**
         * Поиск MSP проекта.
         *
         * @param query запрос.
         */
        public searchMspProject(query: string) {
            if (query.length >= 3) {
                this.mspProjectOptions = this.mspProjects.filter(item => {
                    return item.projectName.toLowerCase().indexOf(query.toLowerCase()) > -1;
                });
            } else {
                this.mspProjectOptions = [];
            }
        }

        /**
         * Отмена создания связи Jira -> MSP.
         */
        public cancel() {
            this.jiraProject = "";
            this.mspProject = "";
            this.addProjectVisible = false;
        }

        /**
         * Обработка выделения проектов в списке.
         *
         * @param items список выделенных проектов в списке.
         */
        public handleSelectionChange(items: Array<LinkedProject>) {
            this.selectedProjects = items;
        }

        /**
         * Удаление связи между проектами
         */
        public unlinkProjects() {
            this.selectedProjects.forEach(linkedProject =>
                httpClient.post(Api.POST_UNLINK_PROJECTS, linkedProject).then(() =>
                    this.loadProjects()
                ).catch(error => Message.error("Произошла ошибка : " + error.toString()))
            );
        }

    }
</script>

<style scoped>
    .main_container {
        position: absolute;
        margin: 10px 10px 10px 400px;
    }
    .action_menu {
        text-align: right;
    }
</style>