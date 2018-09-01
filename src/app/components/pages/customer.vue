<template>
    <div>
        <navigation :active-index="constants.PAGE_PATH.CUSTOMER.path"></navigation>
        <div class="page_content">
            <div class="page_label">Клиенты</div>
            <el-table id="customers" :data="customers" empty-text="Нет данных">
                <el-table-column prop="id" label="ID" width="50px"/>
                <el-table-column prop="name" label="Клиент"/>
                <el-table-column prop="address" label="Адрес"/>
                <el-table-column prop="phone" label="Телефон"/>
                <el-table-column prop="email" label="Электронная почта"/>
                <el-table-column prop="type" label="Тип"/>
                <el-table-column prop="createdDate" label="Дата создания"/>
                <el-table-column prop="author.name" label="Автор"/>
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

    import { Component, Vue } from "vue-property-decorator";
    import { Message } from "element-ui";

    import { httpClient } from "../../utils/http_client";
    import Navigation from '../elements/navigation';
    import { Api } from "../../constants/api";
    import { Customer, CustomerType } from "../../models/customer";
    import { Page } from "../../models/page";
    import { Loading } from "../elements/Loading";
    import { Constants } from "../../constants/common_constants";

    /**
     * Компонент, реализующий работу со списком клиентов.
     *
     * @author Emil Murzakaev.
     */
    @Component({
        components: {
            Navigation
        }
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
         * Конструктор.
         */
        constructor() {
            super();
            this.loadCustomers(0);
        }

        /**
         * Загрузка списка клиентов.
         *
         * @param page номер страницы.
         */
        private loadCustomers(page: number) {
            Loading.show();
            httpClient.get<Page<Customer>>(Api.CUSTOMER.BASE({size: Constants.PAGE_SIZE, page: page}))
            .then(response => {
                let result = response.data;
                this.customers = result.content.map(it => {
                    if (it.type === CustomerType.naturalPerson) {
                        it.name = `${it.lastName} ${it.firstName.substring(0, 1)}. ${it.middleName.substring(0,1)}.`;
                        it.type = "Физ.лицо";
                    } else {
                        it.type = "Юр.лицо";
                    }
                    return it;
                });
                if (result.totalPages > 1) {
                    this.showPagination = true;
                    this.totalElements = result.totalElements;
                }
                Loading.close();
            })
            .catch(error => Message.error("Произошла ошибка : " + error.toString()));
        }

        /**
         * Обработка события смены страницы.
         *
         * @param page номер страницы.
         */
        private handlePageChange(page: number) {
            this.loadCustomers(page - 1);
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