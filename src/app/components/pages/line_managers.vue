<template>
    <el-container>
        <el-col :span="5">
            <navigation active-index="2"></navigation>
        </el-col>
        <el-col :sm="10" :md="16" :xl="19" class="main_container">
            <div class="container-limited">
                <h1>Линейные менеджеры</h1>
                <div>
                    <div class="action_menu">
                        <el-button-group>
                            <el-button icon="el-icon-plus" size="small" disabled>Добавить</el-button>
                            <el-button icon="el-icon-delete" size="small" disabled>Удалить</el-button>
                        </el-button-group>
                    </div>
                    <el-table
                            ref="multipleTable"
                            :data="managers"
                            highlight-current-row
                            max-height="600"
                            style="width: 100%"
                            row-class-name=""
                            @row-click="loadEmployees"
                    >
                        <el-table-column type="selection" width="55"></el-table-column>
                        <el-table-column prop="fullName" label="ФИО" sortable></el-table-column>
                        <el-table-column prop="email" label="Email" sortable></el-table-column>
                    </el-table>
                </div>
                <el-dialog
                        v-if="manager != null"
                        :title="'Список назначенных сотрудников (ЛМ: ' + manager.fullName + ')'"
                        :visible.sync="dialogVisible"
                        @close="handleDialogClose"
                >
                    <div class="action_menu">
                        <el-button-group>
                            <el-button icon="el-icon-plus" size="small" @click="addEmployeeVisible = true; moveEmployeesVisible = false">Добавить</el-button>
                            <el-button icon="el-icon-rank" size="small" @click="addEmployeeVisible = false; moveEmployeesVisible = true">Переместить</el-button>
                            <el-button icon="el-icon-delete" size="small" @click="deleteEmployees">Удалить</el-button>
                        </el-button-group>
                    </div>
                    <el-table
                            ref="multipleTable"
                            :data="employees"
                            max-height="400"
                            style="width: 100%"
                            @selection-change="handleSelectionChange"
                    >
                        <el-table-column type="selection" width="55"></el-table-column>
                        <el-table-column prop="fullName" label="ФИО" sortable></el-table-column>
                        <el-table-column prop="email" label="Email" sortable></el-table-column>
                    </el-table>
                    <div style="margin-top: 20px">
                        <div v-show="addEmployeeVisible">
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
                            <el-button type="primary" @click="addEmployee">Сохранить</el-button>
                        </div>
                        <div v-show="moveEmployeesVisible">
                            <div class="sub-title">Линейный менеджер</div>
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
                            <el-button type="primary" @click="moveEmployee">Переместить</el-button>
                        </div>
                    </div>
                    <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="dialogVisible = false">Готово</el-button>
                </span>
                </el-dialog>
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

    import Api from "../../constants/api";
    import Employee from "../../models/employee";
    import Navigation from './../navigation';
    import httpClient from "../../utils/http_client";

    /**
     * Компонент, реализующий работу со списком линейных менеджеров.
     *
     * @author Emil Murzakaev.
     */
    @Component({
        components: {
            Navigation
        }
    })
    export default class LineManagers extends Vue {

        /**
         * Линейный менеджер.
         */
        private manager: Employee | null = null;
        /**
         * Найденный в поиске сотрудник.
         */
        private employee: Employee | null = null;
        /**
         * Список линейных менеджеров.
         */
        private managers: Array<Employee> = [];
        /**
         * Список сотрудников, относящихся к линейному менеджеру.
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
         * Параметр, отвечающий за показ формы.
         */
        private dialogVisible: boolean = false;
        /**
         * Пареметр, отвечающий за показ формы добавления сотрудника.
         */
        private addEmployeeVisible: boolean = false;
        /**
         * Пареметр, отвечающий за показ формы переноса сотрудников.
         */
        private moveEmployeesVisible: boolean = false;

        /**
         * Конструктор.
         */
        constructor() {
            super();
            this.loadManagers();
        }

        /**
         * Получение списка линейных менеджеров.
         */
        public loadManagers() {
            httpClient.get<Array<Employee>>(Api.GET_MANAGERS).then(response =>
                this.managers = response.data
            ).catch(error => Message.error("Произошла ошибка : " + error.toString()));
        }

        /**
         * Получение списка сотрудников, относящихся к линейному менеджеру.
         *
         * @param employee линейный менеджер.
         */
        public loadEmployees(employee: Employee | null) {
            if (employee != null) {
                httpClient.get<Array<Employee>>(Api.GET_MANAGER_EMPLOYEES, {
                    params: { 'line-manager': employee.fullName }
                }).then(response => {
                    this.employees = response.data;
                    this.manager = employee;
                    this.dialogVisible = true;
                }).catch(error => Message.error("Произошла ошибка : " + error.toString()));

                httpClient.get<Array<Employee>>(Api.GET_EMPLOYEES).then(response =>
                    this.allEmployees = response.data
                ).catch(error => Message.error("Произошла ошибка : " + error.toString()));
            }
        }

        /**
         * Добавление сотрудника, относящегося к линейному менеджеру.
         */
        public addEmployee() {
            httpClient.post(Api.POST_MANAGER_EMPLOYEES, this.employee, {
                params: {
                    'line-manager': this.manager!.fullName
                }})
            .then(() => this.loadEmployees(this.manager))
            .catch(error => Message.error("Произошла ошибка : " + error.toString()));
            this.employee = null;
            this.employeesOptions = [];
        }

        /**
         * Удаление сотрудников, относящихся к линейному менеджеру.
         */
        public deleteEmployees() {
            this.selectedEmployees.forEach(it => {
                httpClient.delete(Api.DELETE_MANAGER_EMPLOYEES, {
                    params: {
                        'line-manager': this.manager!.fullName,
                        'employee': it.fullName
                    }})
                .catch(error => Message.error("Произошла ошибка : " + error.toString()));
                let index = this.employees.indexOf(it);
                if (index >= 0) {
                    this.employees.splice(index, 1);
                }
            });
            if (this.employees.length === this.selectedEmployees.length) {
                let index = this.managers.indexOf(this.manager!);
                if (index >= 0) {
                    this.managers.splice(index, 1);
                }
            }
            this.selectedEmployees = [];
        }

        /**
         * Перенос сотрудников от одного линейного менеджера к другому.
         */
        public moveEmployee() {
            this.selectedEmployees.forEach(it => {
                httpClient.put(Api.PUT_MANAGER_EMPLOYEES, it, {
                    params: {
                        'line-manager': this.employee!.fullName
                    }})
                .catch(error => Message.error("Произошла ошибка : " + error.toString()));
                let index = this.employees.indexOf(it);
                if (index >= 0) {
                    this.employees.splice(index, 1);
                }
            });
            if (this.employees.length === this.selectedEmployees.length) {
                let index = this.managers.indexOf(this.manager!);
                if (index >= 0) {
                    this.managers.splice(index, 1);
                }
            }
            let index = this.managers.indexOf(this.employee!);
            if (index < 0) {
                this.managers.push(this.employee!);
            }
            this.selectedEmployees = [];
            this.employeesOptions = [];
            this.employee = null;
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
         * Обработка закрытия диалогового окна.
         */
        public handleDialogClose() {
            this.addEmployeeVisible = false;
            this.moveEmployeesVisible = false;
            this.employee = null;
            this.employeesOptions = [];
        }

    }
</script>

<style scoped>
    .main_container {
        position: absolute;
        margin: 10px 10px 10px 400px;
    }
    .container-limited {
        /*
        max-width: 1280px;
        margin-left: auto;
        margin-right: auto;
        */
    }
    .action_menu {
        text-align: right;
    }
</style>