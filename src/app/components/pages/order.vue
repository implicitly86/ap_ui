<template>
    <div>
        <navigation :active-index="constants.PAGE_PATH.ORDER.path"></navigation>
        <div class="page_content">
            <div class="page_label">Заказы</div>
            <el-table id="orders" :data="orders" empty-text="Нет данных">
                <el-table-column prop="id" label="ID" width="50px"/>
                <el-table-column prop="barcode" label="Штрих-код"/>
                <el-table-column prop="customer.name" label="Клиент"/>
                <el-table-column prop="fromPoint.name" label="Пункт приема заказа"/>
                <el-table-column prop="toPoint.name" label="Пункт доставки заказа"/>
                <el-table-column prop="createdDate" label="Дата создания заказа"/>
            </el-table>
            <el-pagination
                    id="orders_pagination"
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
    import Navigation from '../elements/navigation';
    import { Constants } from "../../constants/common_constants";
    import { Order } from "../../models/order";
    import { Loading } from "../elements/Loading";
    import { httpClient } from "../../utils/http_client";
    import { Page } from "../../models/page";
    import { Api } from "../../constants/api";
    import { Message } from "element-ui";
    import { CustomerType } from "../../models/customer";

    /**
     * Компонент, реализующий работу со списком заказов.
     *
     * @author Emil Murzakaev.
     */
    @Component({
        components: {
            Navigation
        }
    })
    export default class OrderPage extends Vue {

        /**
         * Константы, используемые в приложении.
         */
        private constants = Constants;
        /**
         * Список пунктов отправки / доставки.
         */
        private orders: Array<Order> = [];
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
            this.loadOrders(0);
        }

        /**
         * Загрузка списка заказов.
         *
         * @param page номер страницы.
         */
        private loadOrders(page: number) {
            Loading.show();
            httpClient.get<Page<Order>>(Api.ORDER.BASE({size: Constants.PAGE_SIZE, page: page}))
            .then(response => {
                let result = response.data;
                this.orders = result.content.map(it => {
                    if (it.customer.type === CustomerType.naturalPerson) {
                        it.customer.name = `${it.customer.lastName} ${it.customer.firstName.substring(0, 1)}. ${it.customer.middleName.substring(0,1)}.`;
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
            this.loadOrders(page - 1);
        }

    }
</script>

<style scoped>
    #orders {

    }
    #orders_pagination {
        margin-top: 10px;
        text-align: center;
    }
</style>