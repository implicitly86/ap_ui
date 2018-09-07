<template>
    <div>
        <navigation :active-index="constants.PAGE_PATH.DELIVERY_POINT.path"></navigation>
        <div class="page_content">
            <div class="page_label">
                Пункт отправки / доставки <span v-if="deliveryPoint !== undefined">"{{ deliveryPoint.name }}"</span>
            </div>
            <div class="item_info" v-if="deliveryPoint !== undefined">
                <el-form label-position="left" label-width="200px" :model="deliveryPoint">
                    <el-form-item label="ID">
                        <el-input v-model="deliveryPoint.id" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="Название">
                        <el-input v-model="deliveryPoint.name"></el-input>
                    </el-form-item>
                    <el-form-item label="Адрес">
                        <el-input v-model="deliveryPoint.address"></el-input>
                    </el-form-item>
                    <el-form-item label="Почтовый индекс">
                        <el-input v-model="deliveryPoint.postcode"></el-input>
                    </el-form-item>
                    <el-form-item label="Телефон">
                        <el-input v-model="deliveryPoint.phone"></el-input>
                    </el-form-item>
                    <el-form-item label="Электронная почта">
                        <el-input v-model="deliveryPoint.email"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="saveDeliveryPoint">Сохранить</el-button>
                        <el-button @click="window.history.back()">Отмена</el-button>
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
    import { Message } from "element-ui";

    import { httpClient } from "../../utils/http_client";
    import Navigation from '../elements/navigation';
    import { Api } from "../../constants/api";
    import { DeliveryPoint } from "../../models/delivery_point";
    import { Loading } from "../elements/loading";
    import { Constants } from "../../constants/common_constants";
    import { router } from "../../router/router";

    /**
     * Компонент, реализующий работу с сущностью Пункт отправки / доставки.
     *
     * @author Emil Murzakaev.
     */
    @Component({
        components: {
            Navigation
        },
        data: function () {
            return {
                deliveryPoint: undefined,
                constants: Constants,
                window: window
            }
        }
    })
    export default class DeliveryPointInfo extends Vue {

        /**
         * Идентификатор пункта отправки / доставки.
         */
        private id: number;
        /**
         * Список пунктов отправки / доставки.
         */
        private deliveryPoint: DeliveryPoint | undefined = undefined;

        /**
         * Конструктор.
         */
        constructor() {
            super();
            let params = router.currentRoute.params;
            if (params.hasOwnProperty("id")) {
                this.id = parseInt(params["id"]);
            } else {
                this.id = -1;
            }
            this.loadDeliveryPoint(this.id);
        }

        /**
         * Загрузка пунктов отправки / доставки по идентификатору.
         *
         * @param id идентификатор.
         */
        private loadDeliveryPoint(id: number) {
            Loading.show();
            httpClient.get<DeliveryPoint>(Api.DELIVERY_POINT.ACTION({id: id}))
            .then(response => {
                this.deliveryPoint = response.data;
                document.title = `Пункт отправки / доставки "${this.deliveryPoint.name}"`;
            })
            .catch(error => Message.error("Произошла ошибка : " + error.toString()))
            .then(() => Loading.close());
        }

        /**
         * Сохранение пункта отправки / доставки.
         */
        private saveDeliveryPoint() {
            Loading.show();
            if (this.id === -1) {
                httpClient.post<DeliveryPoint>(Api.DELIVERY_POINT.ACTION({id: this.id}), this.deliveryPoint).then(response => {
                    this.deliveryPoint = response.data;
                    Message.success("Данные сохранены");
                })
                .catch(error => Message.error("Произошла ошибка : " + error.toString()))
                .then(() => Loading.close());
            } else {
                httpClient.put<void>(Api.DELIVERY_POINT.ACTION({id: this.id}), this.deliveryPoint).then(() =>
                    Message.success("Данные сохранены")
                )
                .catch(error => Message.error("Произошла ошибка : " + error.toString()))
                .then(() => Loading.close());
            }
        }

    }
</script>

<style scoped></style>