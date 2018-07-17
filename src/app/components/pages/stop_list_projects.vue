<template>
    <el-container>
        <el-col :span="5">
            <navigation active-index="4"></navigation>
        </el-col>
        <el-col :sm="10" :md="16" :xl="19" class="main_container">
            <h1>Стоп-лист проектов</h1>
            <div>
                <div class="action_menu">
                    <el-button-group>
                        <el-button icon="el-icon-plus" size="small" @click="addProjectVisible = true">Добавить</el-button>
                        <el-button icon="el-icon-delete" size="small" @click="deleteProject">Удалить</el-button>
                    </el-button-group>
                </div>
                <el-table
                        ref="multipleTable"
                        :data="projects"
                        max-height="600"
                        style="width: 100%"
                        @selection-change="handleSelectionChange"
                >
                    <el-table-column type="selection" width="55"></el-table-column>
                    <el-table-column prop="projectName" label="Название проекта" sortable></el-table-column>
                    <el-table-column prop="projectUid" label="UID проекта" sortable></el-table-column>
                </el-table>
            </div>
            <div v-show="addProjectVisible">
                <el-container style="margin-top: 20px; margin-bottom: 10px">
                    <el-col :span="4">
                        <div class="sub-title">MSP проект</div>
                        <el-select
                                v-model="project"
                                filterable
                                remote
                                reserve-keyword
                                placeholder="Начните вводить"
                                :remote-method="searchMspProject"
                                value-key="projectName"
                        >
                            <el-option
                                    v-for="item in projectOptions"
                                    :key="item.projectName"
                                    :label="item.projectName"
                                    :value="item">
                            </el-option>
                        </el-select>
                    </el-col>
                </el-container>
                <el-container>
                    <el-button type="primary" @click="saveProject">Сохранить</el-button>
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
    import Api from "../../constants/api";
    import Navigation from './../navigation';
    import Project from "../../models/project";

    /**
     * Компонент, реализующий работу со списком исключенных MSP проектов.
     *
     * @author Emil Murzakaev.
     */
    @Component({
        components: {
            Navigation
        }
    })
    export default class StopListProjects extends Vue {

        /**
         * Выбранный MSP проект
         */
        private project: Project | null = null;
        /**
         * Список MSP проектов.
         */
        private projects: Array<Project> = [];
        /**
         * Отсортированный список MSP проектов.
         */
        private projectOptions: Array<Project> = [];
        /**
         * Список MSP проектов.
         */
        private mspProjects: Array<Project> = [];
        /**
         * Список выделенных проектов.
         */
        private selectedProjects: Array<Project> = [];
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
            this.loadMspProjects();
        }

        /**
         * Получение списка исключенных MSP проектов.
         */
        public loadProjects() {
            httpClient.get<Array<Project>>(Api.GET_MSP_EXCLUDED_PROJECTS).then(response =>
                this.projects = response.data
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
         * Поиск MSP проекта.
         *
         * @param query запрос.
         */
        public searchMspProject(query: string) {
            if (query.length >= 3) {
                this.projectOptions = this.mspProjects.filter(item => {
                    return item.projectName.toLowerCase().indexOf(query.toLowerCase()) > -1;
                });
            } else {
                this.projectOptions = [];
            }
        }

        /**
         * Обработка выделения проектов в списке.
         *
         * @param items список выделенных проекты в списке.
         */
        public handleSelectionChange(items: Array<Project>) {
            this.selectedProjects = items;
        }

        /**
         * Добавление MSP проекта в список исключенных.
         */
        public saveProject() {
            httpClient.post(Api.POST_MSP_EXCLUDED_PROJECT, this.project).then(() => {
                this.loadProjects();
                Message.success("Проект успешно добавлен");
            }).catch(error => Message.error("Произошла ошибка : " + error.toString()));
            this.project = null;
        }

        /**
         * Удаление проекта из списка исключенных проектов.
         */
        public deleteProject() {
            this.selectedProjects.forEach(it => {
                httpClient.delete(Api.DELETE_MSP_EXCLUDED_PROJECT, {
                    params: {
                        'project': it.projectUid
                    }
                }).catch(error => Message.error("Произошла ошибка : " + error.toString()));
                let index = this.projects.indexOf(it);
                if (index >= 0) {
                    this.projects.splice(index, 1);
                }
            });
            this.selectedProjects = [];
        }

        /**
         * Отмена создания связи Jira -> MSP.
         */
        public cancel() {
            this.project = null;
            this.addProjectVisible = false;
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