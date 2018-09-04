<template>
    <div>
        <navigation :active-index="constants.PAGE_PATH.DELIVERY_POINT.path"></navigation>
        <div class="page_content">
            <div class="page_label">Пункты отправки / доставки</div>
            <el-table
                    id="delivery_points"
                    :data="deliveryPoints"
                    empty-text="Нет данных"
                    @row-click="loadDeliveryPoint"
                    @sort-change="handleSortChange"
            >
                <el-table-column prop="id" label="ID" width="70px" sortable/>
                <el-table-column prop="name" label="Название" sortable/>
                <el-table-column prop="address" label="Адрес" sortable/>
                <el-table-column prop="postcode" label="Почтовый индекс" sortable/>
                <el-table-column prop="phone" label="Телефон" sortable/>
                <el-table-column prop="email" label="Электронная почта" sortable/>
            </el-table>
            <el-pagination
                    id="delivery_points_pagination"
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
    import { DeliveryPoint } from "../../models/delivery_point";
    import { Page } from "../../models/page";
    import { Loading } from "../elements/Loading";
    import { Constants } from "../../constants/common_constants";
    import { router } from "../../router/router";
    import { ElTableColumn } from "element-ui/types/table-column";

    /**
     * Компонент, реализующий работу со списком пунктов отправки / доставки.
     *
     * @author Emil Murzakaev.
     */
    @Component({
        components: {
            Navigation
        }
    })
    export default class DeliveryPointPage extends Vue {

        /**
         * Константы, используемые в приложении.
         */
        private constants = Constants;
        /**
         * Список пунктов отправки / доставки.
         */
        private deliveryPoints: Array<DeliveryPoint> = [];
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
            this.loadDeliveryPoints();
        }

        /**
         * Загрузка пунктов отправки / доставки.
         *
         * @param page номер страницы.
         * @param sort сортировка.
         */
        private loadDeliveryPoints(page?: number, sort?: string) {
            Loading.show();
            let parameters = {size: Constants.PAGE_SIZE, page: page, sort: sort};
            httpClient.get<Page<DeliveryPoint>>(Api.DELIVERY_POINT.BASE(parameters))
            .then(response => {
                let result = response.data;
                this.deliveryPoints = result.content;
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
            this.loadDeliveryPoints(this.currentPage, this.currentSort);
        }

        /**
         * Обработка события нажатия на строку в таблице.
         *
         * @param deliveryPoint экземпляр DeliveryPoint.
         */
        private loadDeliveryPoint(deliveryPoint: DeliveryPoint) {
            router.push({path: `${Constants.PAGE_PATH.DELIVERY_POINT.path}/${deliveryPoint.id}`});
        }

        /**
         * Обработка изменения сортировки.
         *
         * @param val событие сортировки.
         */
        private handleSortChange(val: { column: ElTableColumn, prop: string | null, order: string | null }) {
            let order: string | null = val.order ? val.order === "descending" ? "desc" : "asc" : null;
            this.currentSort = `${val.prop ? val.prop : ``},${order ? order : ``}`;
            this.loadDeliveryPoints(this.currentPage, this.currentSort);
        }

    }
</script>

<style scoped>
    #delivery_points {

    }

    #delivery_points_pagination {
        margin-top: 10px;
        text-align: center;
    }
</style>