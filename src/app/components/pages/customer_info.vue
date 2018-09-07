<template>
    <div>
        <navigation :active-index="constants.PAGE_PATH.CUSTOMER.path"></navigation>
        <div class="page_content">
            <div class="page_label">
                Клиент
                <span v-if="customer !== undefined && customer.type === customerType.legalPerson">
                    "{{ customer.name }}"
                </span>
                <span v-if="customer !== undefined && customer.type === customerType.naturalPerson">
                    "{{ customer.lastName }} {{ customer.firstName }} {{ customer.middleName }}"
                </span>
            </div>
            <div class="item_info" v-if="customer !== undefined">
                <el-form label-position="left" label-width="200px" :model="customer">
                    <el-form-item label="ID">
                        <el-input v-model="customer.id" :disabled="true"></el-input>
                    </el-form-item>
                    <div v-if="customer.type === customerType.legalPerson">
                        <el-form-item label="Название">
                            <el-input v-model="customer.name"></el-input>
                        </el-form-item>
                    </div>
                    <div v-if="customer.type === customerType.naturalPerson">
                        <el-form-item label="Фамилия">
                            <el-input v-model="customer.lastName"></el-input>
                        </el-form-item>
                        <el-form-item label="Имя">
                            <el-input v-model="customer.firstName"></el-input>
                        </el-form-item>
                        <el-form-item label="Отчество">
                            <el-input v-model="customer.middleName"></el-input>
                        </el-form-item>
                    </div>
                    <el-form-item label="Адрес">
                        <el-input v-model="customer.address"></el-input>
                    </el-form-item>
                    <el-form-item label="Телефон">
                        <el-input v-model="customer.phone"></el-input>
                    </el-form-item>
                    <el-form-item label="Электронная почта">
                        <el-input v-model="customer.email"></el-input>
                    </el-form-item>
                    <el-form-item label="Тип">
                        <div id="customer_type">
                            <el-select v-model="customer.type" :disabled="customer.id !== -1">
                                <el-option
                                        :key="customerType.naturalPerson"
                                        :label="customerType.getDisplayName(customerType.naturalPerson)"
                                        :value="customerType.naturalPerson">
                                </el-option>
                                <el-option
                                        :key="customerType.legalPerson"
                                        :label="customerType.getDisplayName(customerType.legalPerson)"
                                        :value="customerType.legalPerson">
                                </el-option>
                            </el-select>
                        </div>
                    </el-form-item>
                    <el-form-item label="Дата создания">
                        <el-input v-model="customer.createdDate" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="Автор">
                        <el-input v-model="customer.author.name" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="saveCustomer">Сохранить</el-button>
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
    import { Loading } from "../elements/loading";
    import { Constants } from "../../constants/common_constants";
    import { router } from "../../router/router";
    import { Customer, CustomerType } from "../../models/customer";

    /**
     * Компонент, реализующий работу с сущностью Клиент.
     *
     * @author Emil Murzakaev.
     */
    @Component({
        components: {
            Navigation
        },
        data: function () {
            return {
                customer: undefined,
                customerType: CustomerType,
                constants: Constants,
                window: window
            };
        }
    })
    export default class CustomerInfo extends Vue {

        /**
         * Идентификатор пункта отправки / доставки.
         */
        private id: number;
        /**
         * Список пунктов отправки / доставки.
         */
        private customer: Customer | undefined = undefined;

        /**
         * Конструктор.
         */
        constructor() {
            super();
            let params = router.currentRoute.params;
            if (params.hasOwnProperty("id")) {
                this.id = parseInt(params["id"]);
                this.loadCustomer(this.id);
            } else {
                this.id = -1;
                this.customer = new Customer();
            }
        }

        /**
         * Загрузка клиента по идентификатору.
         *
         * @param id идентификатор.
         */
        private loadCustomer(id: number) {
            Loading.show();
            httpClient.get<Customer>(Api.CUSTOMER.ACTION({id: id})).then(response => {
                this.customer = response.data;
                if (this.customer.type === CustomerType.naturalPerson) {
                    document.title = `Клиент "${this.customer.lastName} ${this.customer.firstName!.substring(0, 1)}. ${this.customer.middleName!.substring(0,1)}."`;
                } else {
                    document.title = `Клиент "${this.customer.name}"`;
                }
            }).catch(error =>
                Message.error("Произошла ошибка : " + error.toString())
            ).then(() => Loading.close());
        }

        /**
         * Сохранение клиента.
         */
        private saveCustomer() {
            Loading.show();
            if (this.id === -1) {
                httpClient.post<Customer>(Api.CUSTOMER.ACTION({id: this.id}), this.customer).then(response => {
                    this.customer = response.data;
                    Message.success("Данные сохранены");
                })
                .catch(error => Message.error("Произошла ошибка : " + error.toString()))
                .then(() => Loading.close());
            } else {
                httpClient.put<void>(Api.CUSTOMER.ACTION({id: this.id}), this.customer).then(() =>
                    Message.success("Данные сохранены")
                )
                .catch(error => Message.error("Произошла ошибка : " + error.toString()))
                .then(() => Loading.close());
            }
        }

    }
</script>

<style scoped>
    #customer_type > .el-select {
        width: 100%;
    }
</style>