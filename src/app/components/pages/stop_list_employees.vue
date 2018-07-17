<template>
    <el-container>
        <el-col :span="5">
            <navigation active-index="3"></navigation>
        </el-col>
        <el-col :sm="10" :md="16" :xl="19" class="main_container">
            <div class="container-limited">
                <h1>Стоп-лист сотрудников</h1>
                <div>
                    <div class="action_menu">
                        <el-button-group>
                            <el-button icon="el-icon-plus" size="small" @click="addEmployeeVisible = true">Добавить</el-button>
                            <el-button icon="el-icon-delete" size="small" @click="deleteEmployee">Удалить</el-button>
                        </el-button-group>
                    </div>
                    <el-table
                            ref="multipleTable"
                            :data="employees"
                            max-height="600"
                            style="width: 100%"
                            @selection-change="handleSelectionChange"
                    >
                        <el-table-column type="selection" width="55"></el-table-column>
                        <el-table-column prop="fullName" label="ФИО" sortable></el-table-column>
                        <el-table-column prop="email" label="Email" sortable></el-table-column>
                    </el-table>
                    <div v-show="addEmployeeVisible">
                        <div style="margin-top: 20px">
                            <div class="sub-title">Сотрудники компании</div>
                            <el-select
                                    v-model="employee"
                                    filterable
                                    remote
                                    reserve-keyword
                                    placeholder="Начните вводить"
                                    :remote-method="searchEmployee"
                                    value-key="fullName"
                            >
                                <el-option
                                        v-for="item in employeesOptions"
                                        :key="item.fullName"
                                        :label="item.fullName"
                                        :value="item">
                                </el-option>
                            </el-select>
                        </div>
                        <div style="margin-top: 10px">
                            <el-button type="primary" @click="addEmployee">Сохранить</el-button>
                            <el-button @click="cancel">Отмена</el-button>
                        </div>
                    </div>
                </div>
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

    import Navigation from './../navigation';
    import Employee from "../../models/employee";
    import httpClient from "../../utils/http_client";
    import Api from "../../constants/api";

    /**
     * Компонент, реализующий работу со списком исключенных сотрудников.
     *
     * @author Emil Murzakaev.
     */
    @Component({
        components: {
            Navigation
        }
    })
    export default class StopListEmployees extends Vue {

        /**
         * Найденный в поиске сотрудник.
         */
        private employee: Employee | null = null;
        /**
         * Список сотрудников, добавленных в стоп-лист.
         */
        private employees: Array<Employee> = [];
        /**
         * Список всех сотрудников.
         */
        private allEmployees: Array<Employee> = [];
        /**
         * Список сотрудников, найденных в поиске.
         */
        private employeesOptions: Array<Employee> = [];
        /**
         * Список выделенных сотрудников.
         */
        private selectedEmployees: Array<Employee> = [];
        /**
         * Пареметр, отвечающий за показ формы добавления сотрудника.
         */
        private addEmployeeVisible: boolean = false;

        /**
         * Конструктор.
         */
        constructor() {
            super();
            this.loadExcludedEmployees();
            this.loadEmployees();
        }

        /**
         * Получение списка сотрудников, включенных в стоп-лист.
         */
        public loadExcludedEmployees() {
            httpClient.get<Array<Employee>>(Api.GET_EXCLUDED_EMPLOYEES).then(response =>
                this.employees = response.data
            ).catch(error => Message.error("Произошла ошибка : " + error.toString()));
        }

        /**
         * Загрузка всех сотрудников компании.
         */
        public loadEmployees() {
            httpClient.get<Array<Employee>>(Api.GET_EMPLOYEES).then(response =>
                this.allEmployees = response.data
            ).catch(error => Message.error("Произошла ошибка : " + error.toString()));
        }

        /**
         * Добавление сотрудника в стоп-лист.
         */
        public addEmployee() {
            httpClient.post(Api.POST_EXCLUDED_EMPLOYEES, this.employee).then(() =>
                this.loadExcludedEmployees()
            ).catch(error => Message.error("Произошла ошибка : " + error.toString()));
            this.employee = null;
            this.employeesOptions = [];
        }

        /**
         * Удаление сотрудников из стоп-листа.
         */
        public deleteEmployee() {
            this.selectedEmployees.forEach(it => {
                httpClient.delete(Api.DELETE_EXCLUDED_EMPLOYEES, {
                    params: {
                        'full_name': it.fullName,
                        'email': it.email
                    }
                })
                .then(() => {
                    let index = this.employees.indexOf(it);
                    if (index >= 0) {
                        this.employees.splice(index, 1);
                    }
                })
                .catch(error => Message.error("Произошла ошибка : " + error.response.data.message));
            });
            this.selectedEmployees = [];
        }

        /**
         * Поиск сотрудника.
         *
         * @param query запрос.
         */
        public searchEmployee(query: string) {
            if (query.length >= 3) {
                this.employeesOptions = this.allEmployees.filter(item => {
                    return item.fullName.toLowerCase().indexOf(query.toLowerCase()) > -1;
                });
            } else {
                this.employeesOptions = [];
            }
        }

        /**
         * Обработка выделения сотрудников в списке.
         *
         * @param items список выделенных сотрудников в списке.
         */
        public handleSelectionChange(items: Array<Employee>) {
            this.selectedEmployees = items;
        }

        /**
         * Отмена добавления сотрудника в стоп-лист.
         */
        public cancel() {
            this.employee = null;
            this.employeesOptions = [];
            this.addEmployeeVisible = false;
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