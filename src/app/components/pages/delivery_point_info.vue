<template>
    <div>
        <navigation :active-index="constants.PAGE_PATH.DELIVERY_POINT.ALL.path"></navigation>
        <div class="page_content">
            <div class="page_label">
                <span v-if="deliveryPoint !== undefined && deliveryPoint.id !== undefined">Пункт отправки / доставки "{{ deliveryPoint.name }}"</span>
                <span v-if="deliveryPoint !== undefined && deliveryPoint.id === undefined">Новый пункт отправки / доставки </span>
            </div>
            <div class="item_info" v-if="deliveryPoint !== undefined">
                <el-form label-position="left" label-width="200px" :model="deliveryPoint" :rules="rules">
                    <el-form-item label="ID" v-if="deliveryPoint.id !== undefined" prop="id">
                        <el-input v-model="deliveryPoint.id" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="Название" prop="name">
                        <el-input v-model="deliveryPoint.name"></el-input>
                    </el-form-item>
                    <el-form-item label="Адрес" prop="address">
                        <el-input v-model="deliveryPoint.address"></el-input>
                    </el-form-item>
                    <el-form-item label="Почтовый индекс" prop="postcode">
                        <el-input v-model="deliveryPoint.postcode"></el-input>
                    </el-form-item>
                    <el-form-item label="Телефон" prop="phone">
                        <el-input v-model="deliveryPoint.phone"></el-input>
                    </el-form-item>
                    <el-form-item label="Электронная почта" prop="email">
                        <el-input v-model="deliveryPoint.email"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="saveDeliveryPoint">Сохранить</el-button>
                        <el-button @click="window.history.back()">Отмена</el-button><el-button
                            @click="deleteDeliveryPoint"
                            type="danger"
                            style="float: right"
                            v-if="deliveryPoint !== undefined && deliveryPoint.id !== undefined">Удалить</el-button>
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

    import { Vue } from "vue-property-decorator";
    import Component from "vue-class-component";
    import { Message, MessageBox } from "element-ui";

    import Navigation from '../elements/navigation';
    import { DeliveryPoint } from "../../models/delivery_point";
    import { Loading } from "../elements/loading";
    import { Constants } from "../../constants/common_constants";
    import { router } from "../../router/router";
    import { inject } from "vue-typescript-inject";
    import { DeliveryPointService } from "../../services/delivery_point_service";

    /**
     * Компонент, реализующий работу с сущностью Пункт отправки / доставки.
     *
     * @author Emil Murzakaev.
     */
    @Component({
        components: {
            Navigation
        },
        providers: [DeliveryPointService],
        data: function () {
            return {
                deliveryPoint: undefined,
                constants: Constants,
                window: window,
                rules: {
                    name: [
                        { required: true, message: 'Введите название пункта отправки / доставки', trigger: 'blur' }
                    ],
                    address: [
                        { required: true, message: 'Введите адрес пункта отправки / доставки', trigger: 'blur' }
                    ],
                    postcode: [
                        { required: true, message: 'Введите почтовый индекс пункта отправки / доставки', trigger: 'blur' },
                        {
                            min: 1,
                            pattern: '^[0-9]{6}$',
                            message: 'Почтовый индекс не соответствует формату (000000)',
                            trigger: 'blur'
                        }
                    ],
                    phone: [
                        { required: true, message: 'Введите телефон пункта отправки / доставки', trigger: 'blur' }
                    ],
                    email: [
                        { required: true, type: "email", message: 'Введите электронную почту пункта отправки / доставки', trigger: 'blur' }
                    ]
                }
            }
        }
    })
    export default class DeliveryPointInfo extends Vue {

        /**
         * Идентификатор пункта отправки / доставки.
         */
        private id!: number;
        /**
         * Список пунктов отправки / доставки.
         */
        private deliveryPoint!: DeliveryPoint;
        /**
         * Сервис, реализующий доступ к сущности Пункт отправки / доставки.
         */
        @inject()
        private deliveryPointService!: DeliveryPointService;

        /**
         * Метод, вызываем при создании компонента.
         */
        private created(): void {
            let params = router.currentRoute.params;
            if (params.hasOwnProperty("id")) {
                this.id = parseInt(params["id"]);
                this.loadDeliveryPoint(this.id);
            } else {
                this.id = -1;
                this.deliveryPoint = new DeliveryPoint();
            }
        }

        /**
         * Загрузка пунктов отправки / доставки по идентификатору.
         *
         * @param id идентификатор.
         */
        private loadDeliveryPoint(id: number) {
            Loading.show();
            this.deliveryPointService.getOne(id).then(response => {
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
            this.deliveryPointService.save(this.deliveryPoint).then(response => {
                this.deliveryPoint = response.data;
                this.id = this.deliveryPoint.id!;
                Message.success("Данные сохранены");
            })
            .catch(error => Message.error("Произошла ошибка : " + error.toString()))
            .then(() => Loading.close());
        }

        /**
         * Удаление пункта отправки / доставки.
         */
        private deleteDeliveryPoint() {
            let message = `Вы действительно хотите удалить заказ <strong>${this.deliveryPoint!.name}</strong>?`;
            let parameters = {confirmButtonText: "Удалить", cancelButtonText: "Отмена", dangerouslyUseHTMLString: true};
            MessageBox.confirm(message, "Удаление", parameters).then(() => {
                Loading.show();
                this.deliveryPointService.delete(this.id).then(() => {
                    Message.success("Данные удалены");
                    window.history.back();
                })
                .catch(error => Message.error("Произошла ошибка : " + error.toString()))
                .then(() => Loading.close());
            });
        }

    }
</script>

<style scoped></style>