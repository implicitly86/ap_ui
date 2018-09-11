<template>
    <div>
        <navigation :active-index="constants.PAGE_PATH.ORDER.ALL.path"></navigation>
        <div class="page_content">
            <div class="page_label">
                <span v-if="order !== undefined && order.id !== undefined">Заказ "{{ order.barcode }}"</span>
                <span v-if="order !== undefined && order.id === undefined">Новый заказ</span>
            </div>
            <div class="item_info" v-if="order !== undefined">
                <el-form label-position="left" label-width="200px" :model="order">
                    <el-form-item label="ID" v-if="order.id !== undefined">
                        <el-input v-model="order.id" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="Штрих-код заказа">
                        <el-input v-model="order.barcode"></el-input>
                    </el-form-item>
                    <el-form-item label="Клиент">
                        <el-select
                                v-model="order.customer"
                                filterable
                                remote
                                reserve-keyword
                                placeholder="Начните вводить..."
                                :remote-method="searchCustomer"
                                value-key="name"
                                no-data-text="Ничего не найдено"
                        >
                            <el-option
                                    v-for="item in customers"
                                    :key="item.name"
                                    :label="item.name"
                                    :value="item">
                                <span class="left_select_option">{{ item.name }}</span>
                                <span class="right_select_option">
                                    {{ item.address }} / {{ item.phone }}
                                </span>
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="Пункт приема заказа">
                        <el-select
                                v-model="order.fromPoint"
                                filterable
                                remote
                                reserve-keyword
                                placeholder="Начните вводить..."
                                :remote-method="searchDeliveryPoint"
                                value-key="name"
                                no-data-text="Ничего не найдено"
                        >
                            <el-option
                                    v-for="item in deliveryPoints"
                                    :key="item.name"
                                    :label="item.name"
                                    :value="item">
                                <span class="left_select_option">{{ item.name }}</span>
                                <span class="right_select_option">
                                    {{ item.postcode }} / {{ item.address }} / {{ item.phone }}
                                </span>
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="Пункт доставки заказа">
                        <el-select
                                v-model="order.toPoint"
                                filterable
                                remote
                                reserve-keyword
                                placeholder="Начните вводить..."
                                :remote-method="searchDeliveryPoint"
                                value-key="name"
                                no-data-text="Ничего не найдено"
                        >
                            <el-option
                                    v-for="item in deliveryPoints"
                                    :key="item.name"
                                    :label="item.name"
                                    :value="item">
                                <span class="left_select_option">{{ item.name }}</span>
                                <span class="right_select_option">
                                    {{ item.postcode }} / {{ item.address }} / {{ item.phone }}
                                </span>
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="Дата создания заказа" v-if="order.createdDate !== undefined">
                        <el-input v-model="order.createdDate" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="Автор" v-if="order.author !== undefined">
                        <el-input v-model="order.author.name" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="Дата изменения записи" v-if="order.modifiedDate !== undefined">
                        <el-input v-model="order.modifiedDate" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="Изменено" v-if="order.modifiedBy !== undefined">
                        <el-input v-model="order.modifiedBy.name" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="saveOrder">Сохранить</el-button>
                        <el-button @click="window.history.back()">Отмена</el-button>
                        <el-button
                                @click="deleteOrder"
                                type="danger"
                                style="float: right"
                                v-if="order !== undefined && order.id !== undefined">Удалить</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    /*
     * ©  Implicitly86 All Rights Reserved
     */

    import { Component, Vue } from "vue-property-decorator";
    import { Message, MessageBox } from "element-ui";

    import { httpClient } from "../../utils/http_client";
    import Navigation from '../elements/navigation';
    import { Api } from "../../constants/api";
    import { DeliveryPoint } from "../../models/delivery_point";
    import { Loading } from "../elements/loading";
    import { Constants } from "../../constants/common_constants";
    import { router } from "../../router/router";
    import { Order } from "../../models/order";
    import { Customer } from "../../models/customer";
    import { Page } from "../../models/page";

    /**
     * Компонент, реализующий работу с сущностью Заказ.
     *
     * @author Emil Murzakaev.
     */
    @Component({
        components: {
            Navigation
        },
        data: function () {
            return {
                order: undefined,
                constants: Constants,
                window: window,
                customers: [],
                deliveryPoints: []
            }
        }
    })
    export default class OrderInfo extends Vue {

        /**
         * Идентификатор пункта отправки / доставки.
         */
        private id!: number;
        /**
         * Список пунктов отправки / доставки.
         */
        private order: Order | undefined = undefined;
        /**
         * Список клиентов.
         */
        private customers: Array<Customer> = [];
        /**
         * Список пунктов отправки / доставки.
         */
        private deliveryPoints: Array<DeliveryPoint> = [];

        /**
         * Метод, вызываем при создании компонента.
         */
        private created(): void {
            let params = router.currentRoute.params;
            if (params.hasOwnProperty("id")) {
                this.id = parseInt(params["id"]);
                this.loadOrder(this.id);
            } else {
                this.id = -1;
                this.order = new Order();
            }
        }

        /**
         * Загрузка заказа.
         *
         * @param id идентификатор.
         */
        private loadOrder(id: number) {
            Loading.show();
            httpClient.get<Order>(Api.ORDER.ACTION({id: id}))
            .then(response => {
                this.order = response.data;
                if (this.order.customer !== undefined) {
                    this.customers.push(this.order.customer);
                }
                if (this.order.fromPoint !== undefined && this.order.toPoint !== undefined) {
                    this.deliveryPoints.push(this.order.fromPoint, this.order.toPoint);
                }
                document.title = `Заказ "${this.order.barcode}"`;
            })
            .catch(error => Message.error("Произошла ошибка : " + error.toString()))
            .then(() => Loading.close());
        }

        /**
         * Сохранение заказа.
         */
        private saveOrder() {
            Loading.show();
            if (this.id === -1) {
                httpClient.post<Order>(Api.ORDER.BASE(), this.order).then(response => {
                    this.order = response.data;
                    this.id = this.order.id!;
                    Message.success("Данные сохранены");
                })
                .catch(error => Message.error("Произошла ошибка : " + error.toString()))
                .then(() => Loading.close());
            } else {
                httpClient.put<void>(Api.ORDER.ACTION({id: this.id}), this.order).then(() =>
                    Message.success("Данные сохранены")
                )
                .catch(error => Message.error("Произошла ошибка : " + error.toString()))
                .then(() => Loading.close());
            }
        }

        /**
         * Удаление заказа.
         */
        private deleteOrder() {
            let message = `Вы действительно хотите удалить заказ <strong>${this.order!.barcode}</strong>?`;
            let parameters = {confirmButtonText: "Удалить", cancelButtonText: "Отмена", dangerouslyUseHTMLString: true};
            MessageBox.confirm(message, "Удаление", parameters).then(() => {
                Loading.show();
                httpClient.delete(Api.ORDER.ACTION({id: this.id})).then(() => {
                    Message.success("Данные удалены");
                    window.history.back();
                })
                .catch(error => Message.error("Произошла ошибка : " + error.toString()))
                .then(() => Loading.close());
            });
        }

        /**
         * Поиск клиента.
         */
        private searchCustomer(query: string) {
            if (query.length >= 3) {
                Loading.show();
                let searchFilter = new Customer();
                searchFilter.name = query;
                httpClient.post<Page<Customer>>(Api.CUSTOMER.SEARCH({size: Constants.PAGE_SIZE}), searchFilter)
                .then(response =>
                    this.customers = response.data.content
                )
                .catch(error => Message.error("Произошла ошибка : " + error.toString()))
                .then(() => Loading.close());
            } else {
                this.customers = [];
            }
        }

        /**
         * Поиск пункта отправки / доставки.
         */
        private searchDeliveryPoint(query: string) {
            if (query.length >= 3) {
                Loading.show();
                let searchFilter = new DeliveryPoint();
                searchFilter.name = query;
                httpClient.post<Page<DeliveryPoint>>(Api.DELIVERY_POINT.SEARCH({size: Constants.PAGE_SIZE}), searchFilter)
                .then(response =>
                    this.deliveryPoints = response.data.content
                )
                .catch(error => Message.error("Произошла ошибка : " + error.toString()))
                .then(() => Loading.close());
            } else {
                this.deliveryPoints = [];
            }
        }

    }
</script>

<style scoped>
    .item_info .el-select {
        width: 100%;
    }
    .right_select_option {
        float: right;
        color: #8492a6;
        font-size: 13px;
    }
    .left_select_option {
        float: left;
    }
</style>