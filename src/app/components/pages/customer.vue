<template>
    <div>
        <navigation :active-index="constants.PAGE_PATH.CUSTOMER.ALL.path"></navigation>
        <div class="page_content">
            <div class="page_label">Клиенты</div>
            <div class="page_actions">
                <router-link :to="constants.PAGE_PATH.CUSTOMER.NEW.path">
                    <el-button icon="el-icon-plus">Создать</el-button>
                </router-link>
            </div>
            <el-table
                    id="customers"
                    :data="customers"
                    empty-text="Нет данных"
                    @row-click="loadCustomer"
                    @sort-change="handleSortChange"
                    row-class-name="pointer"
            >
                <el-table-column prop="id" label="ID" width="70px" sortable/>
                <el-table-column prop="name" label="Клиент" sortable/>
                <el-table-column prop="address" label="Адрес" sortable/>
                <el-table-column prop="phone" label="Телефон" sortable/>
                <el-table-column prop="email" label="Электронная почта" sortable/>
                <el-table-column prop="type" label="Тип" sortable/>
                <el-table-column prop="createdDate" label="Дата создания" sortable/>
                <el-table-column prop="author.name" label="Автор" sortable/>
            </el-table>
            <el-pagination
                    id="customers_pagination"
                    v-show="showPagination"
                    @current-change="handlePageChange"
                    background
                    layout="prev, pager, next"
                    :total="totalElements"
            />
        </div>
    </div>
</template>

<script lang="ts">
    /*
     * ©  Implicitly86 All Rights Reserved
     */

    import { Vue } from "vue-property-decorator";
    import Component from "vue-class-component";
    import { Message } from "element-ui";
    import { ElTableColumn } from "element-ui/types/table-column";

    import Navigation from '../elements/navigation';
    import { Customer, CustomerType } from "../../models/customer";
    import { Loading } from "../elements/loading";
    import { Constants } from "../../constants/common_constants";
    import { router } from "../../router/router";
    import { CustomerService } from "../../services/customer_service";
    import { inject } from "vue-typescript-inject";

    /**
     * Компонент, реализующий работу со списком клиентов.
     *
     * @author Emil Murzakaev.
     */
    @Component({
        components: {
            Navigation
        },
        providers: [CustomerService]
    })
    export default class CustomerPage extends Vue {

        /**
         * Константы, используемые в приложении.
         */
        private constants = Constants;
        /**
         * Список клиентов.
         */
        private customers: Array<Customer> = [];
        /**
         * Параметр, отвечающий за показ элемента переключения страниц.
         */
        private showPagination: boolean = false;
        /**
         * Общее количество элементов.
         */
        private totalElements: number = 0;
        /**
         * Номер текущей страницы.
         */
        private currentPage: number = 0;
        /**
         * Текущая сортировка.
         */
        private currentSort: string | undefined = undefined;
        /**
         * Сервис, реализующий доступ к сущности Клиент.
         */
        @inject()
        private customerService!: CustomerService;

        /**
         * Конструктор.
         */
        constructor() {
            super();
            this.loadCustomers();
        }

        /**
         * Загрузка списка клиентов.
         *
         * @param page номер страницы.
         * @param sort сортировка.
         */
        private loadCustomers(page?: number, sort?: string) {
            Loading.show();
            this.customerService.getAll(page, sort).then(response => {
                let result = response.data;
                this.customers = result.content.map(it => {
                    it.type = CustomerType.getDisplayName(it.type!);
                    return it;
                });
                if (result.totalPages > 1) {
                    this.showPagination = true;
                    this.totalElements = result.totalElements;
                }
            })
            .catch(error => Message.error("Произошла ошибка : " + error.toString()))
            .then(() => Loading.close());
        }

        /**
         * Обработка события смены страницы.
         *
         * @param page номер страницы.
         */
        private handlePageChange(page: number) {
            this.currentPage = page - 1;
            this.loadCustomers(this.currentPage, this.currentSort);
        }

        /**
         * Обработка события нажатия на строку в таблице.
         *
         * @param customer экземпляр Customer.
         */
        private loadCustomer(customer: Customer) {
            router.push({path: `${Constants.PAGE_PATH.CUSTOMER.ALL.path}/${customer.id}`});
        }

        /**
         * Обработка изменения сортировки.
         *
         * @param val событие сортировки.
         */
        private handleSortChange(val: { column: ElTableColumn, prop: string | null, order: string | null }) {
            let order: string | null = val.order ? val.order === "descending" ? "desc" : "asc" : null;
            this.currentSort = `${val.prop ? val.prop : ``},${order ? order : ``}`;
            this.loadCustomers(this.currentPage, this.currentSort);
        }

    }
</script>

<style scoped>
    #customers {

    }

    #customers_pagination {
        margin-top: 10px;
        text-align: center;
    }
</style>