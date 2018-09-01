<template>
    <div>
        <navigation :active-index="constants.PAGE_PATH.DELIVERY_POINT.path"></navigation>
        <div class="page_content">
            <div class="page_label">Пункты отправки / доставки</div>
            <el-table id="delivery_points" :data="deliveryPoints" empty-text="Нет данных">
                <el-table-column prop="id" label="ID" width="50px"/>
                <el-table-column prop="name" label="Название"/>
                <el-table-column prop="address" label="Адрес"/>
                <el-table-column prop="postcode" label="Почтовый индекс"/>
                <el-table-column prop="phone" label="Телефон"/>
                <el-table-column prop="email" label="Электронная почта"/>
                <el-table-column prop="email" label="" width="50px">
                    <template slot-scope="scope">
                        <el-button
                                size="mini"
                                type="danger"
                                @click="handleDelete(scope.$index, scope.row)"
                        >
                            <i class="el-icon-delete"></i>
                        </el-button>
                    </template>
                </el-table-column>
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
         * Конструктор.
         */
        constructor() {
            super();
            this.loadDeliveryPoints(0);
        }

        /**
         * Загрузка пунктов отправки / доставки.
         *
         * @param page номер страницы.
         */
        private loadDeliveryPoints(page: number) {
            Loading.show();
            httpClient.get<Page<DeliveryPoint>>(Api.DELIVERY_POINT.BASE({size: Constants.PAGE_SIZE, page: page}))
            .then(response => {
                let result = response.data;
                this.deliveryPoints = result.content;
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
            this.loadDeliveryPoints(page - 1);
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