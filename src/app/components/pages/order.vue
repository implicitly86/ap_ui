<template>
    <div>
        <navigation :active-index="constants.PAGE_PATH.ORDER.path"></navigation>
        <div class="page_content">
            <div class="page_label">Заказы</div>
            <el-table
                    id="orders"
                    :data="orders"
                    empty-text="Нет данных"
                    @row-click="loadOrder"
                    @sort-change="handleSortChange"
                    row-class-name="pointer"
            >
                <el-table-column prop="id" label="ID" width="70px" sortable/>
                <el-table-column prop="barcode" label="Штрих-код" sortable/>
                <el-table-column prop="customer.name" label="Клиент" sortable/>
                <el-table-column prop="fromPoint.name" label="Пункт приема заказа" sortable/>
                <el-table-column prop="toPoint.name" label="Пункт доставки заказа" sortable/>
                <el-table-column prop="createdDate" label="Дата создания заказа" sortable/>
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
    import { ElTableColumn } from "element-ui/types/table-column";

    import Navigation from '../elements/navigation';
    import { Constants } from "../../constants/common_constants";
    import { Order } from "../../models/order";
    import { Loading } from "../elements/loading";
    import { httpClient } from "../../utils/http_client";
    import { Page } from "../../models/page";
    import { Api } from "../../constants/api";
    import { Message } from "element-ui";
    import { CustomerType } from "../../models/customer";
    import { router } from "../../router/router";

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
         * Номер текущей страницы.
         */
        private currentPage: number = 0;
        /**
         * Текущая сортировка.
         */
        private currentSort: string | undefined = undefined;

        /**
         * Конструктор.
         */
        constructor() {
            super();
            this.loadOrders();
        }

        /**
         * Загрузка списка заказов.
         *
         * @param page номер страницы.
         * @param sort сортировка.
         */
        private loadOrders(page?: number, sort?: string) {
            Loading.show();
            let parameters = {size: Constants.PAGE_SIZE, page: page, sort: sort};
            httpClient.get<Page<Order>>(Api.ORDER.BASE(parameters))
            .then(response => {
                let result = response.data;
                this.orders = result.content.map(it => {
                    if (it.customer.type === CustomerType.naturalPerson) {
                        it.customer.name = `${it.customer.lastName} ${it.customer.firstName!.substring(0, 1)}. ${it.customer.middleName!.substring(0, 1)}.`;
                    }
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
            this.loadOrders(this.currentPage, this.currentSort);
        }

        /**
         * Обработка события нажатия на строку в таблице.
         *
         * @param order экземпляр Order.
         */
        private loadOrder(order: Order) {
            router.push({path: `${Constants.PAGE_PATH.ORDER.path}/${order.id}`});
        }

        /**
         * Обработка изменения сортировки.
         *
         * @param val событие сортировки.
         */
        private handleSortChange(val: { column: ElTableColumn, prop: string | null, order: string | null }) {
            let order: string | null = val.order ? val.order === "descending" ? "desc" : "asc" : null;
            this.currentSort = `${val.prop ? val.prop : ``},${order ? order : ``}`;
            this.loadOrders(this.currentPage, this.currentSort);
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