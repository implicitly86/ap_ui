<template>
    <div>
        <navigation :active-index="constants.PAGE_PATH.BASE.path"></navigation>
        <div class="page_content">
            <div class="page_label">Главная</div>
        </div>
        <container id="action_container">
            <row>
                <column xs="12" sm="6" md="3" lg="3">
                    <div class="action_item" @click="switchTo(constants.PAGE_PATH.ORDER.NEW.path)">
                        <span>Создать новый заказ</span>
                    </div>
                </column>
                <column xs="12" sm="6" md="3" lg="3">
                    <div class="action_item" @click="switchTo(constants.PAGE_PATH.DELIVERY_POINT.ALL.path)">
                        <span>Пункты отправки / доставки</span>
                    </div>
                </column>
                <column xs="12" sm="6" md="3" lg="3">
                    <div class="action_item" @click="switchTo(constants.PAGE_PATH.CUSTOMER.ALL.path)">
                        <span>Клиенты</span>
                    </div>
                </column>
                <column xs="12" sm="6" md="3" lg="3">
                    <div class="action_item" @click="switchTo(constants.PAGE_PATH.ORDER.ALL.path)">
                        <span>Заказы</span>
                    </div>
                </column>
            </row>
        </container>
    </div>
</template>

<script lang="ts">
    /*
     * ©  Implicitly86 All Rights Reserved
     */

    import {Component, Vue} from "vue-property-decorator";
    import Navigation from '../elements/navigation';
    import {Constants} from "../../constants/common_constants";
    import {router} from "../../router/router";

    /**
     * Компонент, соответствующий главной странице.
     *
     * @author Emil Murzakaev.
     */
    @Component({
        components: {
            Navigation
        },
        data: function() {
            return {
                constants: Constants
            }
        }
    })
    export default class MainPage extends Vue {

        /**
         * Конструктор.
         */
        constructor() {
            super();
        }

        /**
         * Метод обработки нажатия на элемент меню.
         */
        private switchTo(path: string) {
            router.push({path: path});
        }

    }
</script>

<style scoped>
    #action_container .action_item {
        line-height: 150px;
        /*height: 150px;*/
        background: aliceblue;
        border-bottom: 2px solid #FFD04B;
        color: #FFD04B;
        margin: 5px;
        text-align: center;
        cursor: pointer;
        /*vertical-align: center;*/
    }
    #action_container .action_item:hover {
        background: aquamarine;
        border-bottom: 2px solid #FFD04B;
        color: #FFD04B;
    }
</style>