<template>
    <div>
        <navigation :active-index="constants.PAGE_PATH.CUSTOMER.ALL.path"></navigation>
        <div class="page_content">
            <div class="page_label">
                <span v-if="customer !== undefined && customer.id !== undefined && customer.type === customerType.legalPerson">
                    Клиент "{{ customer.name }}"
                </span>
                <span v-if="customer !== undefined && customer.id !== undefined && customer.type === customerType.naturalPerson">
                    Клиент "{{ customer.lastName }} {{ customer.firstName }} {{ customer.middleName }}"
                </span>
                <span v-if="customer !== undefined && customer.id === undefined">Новый клиент</span>
            </div>
            <div class="item_info" v-if="customer !== undefined">
                <el-form label-position="left" label-width="200px" :model="customer" :rules="rules">
                    <el-form-item label="ID" v-if="customer.id !== undefined" prop="id">
                        <el-input v-model="customer.id" :disabled="true"></el-input>
                    </el-form-item>
                    <div v-if="customer.type === customerType.legalPerson">
                        <el-form-item label="Название" prop="name">
                            <el-input v-model="customer.name"></el-input>
                        </el-form-item>
                    </div>
                    <div v-if="customer.type === customerType.naturalPerson">
                        <el-form-item label="Фамилия" prop="lastName">
                            <el-input v-model="customer.lastName"></el-input>
                        </el-form-item>
                        <el-form-item label="Имя" prop="firstName">
                            <el-input v-model="customer.firstName"></el-input>
                        </el-form-item>
                        <el-form-item label="Отчество" prop="middleName">
                            <el-input v-model="customer.middleName"></el-input>
                        </el-form-item>
                    </div>
                    <el-form-item label="Адрес" prop="address">
                        <el-input v-model="customer.address"></el-input>
                    </el-form-item>
                    <el-form-item label="Телефон" prop="phone">
                        <el-input v-model="customer.phone"></el-input>
                    </el-form-item>
                    <el-form-item label="Электронная почта" prop="email">
                        <el-input v-model="customer.email"></el-input>
                    </el-form-item>
                    <el-form-item label="Тип" prop="type">
                        <div id="customer_type">
                            <el-select v-model="customer.type" :disabled="customer.id !== undefined">
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
                    <el-form-item label="Дата создания" v-if="customer.createdDate !== undefined" prop="createdDate">
                        <el-input v-model="customer.createdDate" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="Автор" v-if="customer.author !== undefined" prop="author">
                        <el-input v-model="customer.author.name" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="saveCustomer">Сохранить</el-button>
                        <el-button @click="window.history.back()">Отмена</el-button><el-button
                            @click="deleteCustomer"
                            type="danger"
                            style="float: right"
                            v-if="customer !== undefined && customer.id !== undefined">Удалить</el-button>
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
    import { Loading } from "../elements/loading";
    import { Constants } from "../../constants/common_constants";
    import { router } from "../../router/router";
    import { Customer, CustomerType } from "../../models/customer";
    import { CustomerService } from "../../services/customer_service";
    import { inject } from "vue-typescript-inject";

    /**
     * Компонент, реализующий работу с сущностью Клиент.
     *
     * @author Emil Murzakaev.
     */
    @Component({
        components: {
            Navigation
        },
        providers: [CustomerService],
        data: function () {
            return {
                customer: undefined,
                customerType: CustomerType,
                constants: Constants,
                window: window,
                rules: {
                    name: [
                        { required: true, message: 'Введите название клиента', trigger: 'blur' }
                    ],
                    lastName: [
                        { required: true, message: 'Введите фамилию клиента', trigger: 'blur' }
                    ],
                    firstName: [
                        { required: true, message: 'Введите имя клиента', trigger: 'blur' }
                    ],
                    middleName: [
                        { required: true, message: 'Введите отчество клиента', trigger: 'blur' }
                    ],
                    address: [
                        { required: true, message: 'Введите адрес клиента', trigger: 'blur' }
                    ],
                    phone: [
                        { required: true, message: 'Введите телефон клиента', trigger: 'blur' }
                    ],
                    email: [
                        { required: true, type: "email", message: 'Введите электронную почту клиента', trigger: 'blur' }
                    ],
                    type: [
                        { required: true, message: 'Выберите тип клиента', trigger: 'change' }
                    ]
                }
            };
        }
    })
    export default class CustomerInfo extends Vue {

        /**
         * Идентификатор пункта отправки / доставки.
         */
        private id!: number;
        /**
         * Список пунктов отправки / доставки.
         */
        private customer!: Customer;
        /**
         * Сервис, реализующий доступ к сущности Клиент.
         */
        @inject()
        private customerService!: CustomerService;

        /**
         * Метод, вызываем при создании компонента.
         */
        private created(): void {
            let params = router.currentRoute.params;
            if (params.hasOwnProperty("id")) {
                this.id = parseInt(params["id"]);
                this.loadCustomer(this.id);
            } else {
                this.id = -1;
                this.customer = new Customer();
                this.customer.type = CustomerType.naturalPerson;
            }
        }

        /**
         * Загрузка клиента по идентификатору.
         *
         * @param id идентификатор.
         */
        private loadCustomer(id: number) {
            Loading.show();
            this.customerService.getOne(id).then(response => {
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
            this.customerService.save(this.customer).then(response => {
                this.customer = response.data;
                this.id = this.customer.id!;
                Message.success("Данные сохранены");
            })
            .catch(error => Message.error("Произошла ошибка : " + error.toString()))
            .then(() => Loading.close());
        }

        /**
         * Удаление клиента.
         */
        private deleteCustomer() {
            let name;
            if (this.customer.type === CustomerType.naturalPerson) {
                name = `${this.customer.lastName} ${this.customer.firstName!.substring(0, 1)}. ${this.customer.middleName!.substring(0,1)}.`;
            } else {
                name = this.customer.name;
            }
            let message = `Вы действительно хотите удалить клиента <strong>${name}</strong>?`;
            let parameters = {confirmButtonText: "Удалить", cancelButtonText: "Отмена", dangerouslyUseHTMLString: true};
            MessageBox.confirm(message, "Удаление", parameters).then(() => {
                Loading.show();
                this.customerService.delete(this.id).then(() => {
                    Message.success("Данные удалены");
                    window.history.back();
                })
                .catch(error => Message.error("Произошла ошибка : " + error.toString()))
                .then(() => Loading.close());
            });
        }

    }
</script>

<style scoped>
    #customer_type > .el-select {
        width: 100%;
    }
</style>