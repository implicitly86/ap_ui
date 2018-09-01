<template>
    <div>
        <navigation :active-index="constants.PAGE_PATH.BASE.path"></navigation>
        <div class="page_content">
            <div class="page_label">Главная</div>
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

    /**
     * Компонент, соответствующий главной странице.
     *
     * @author Emil Murzakaev.
     */
    @Component({
        components: {
            Navigation
        }
    })
    export default class MainPage extends Vue {

        /**
         * Константы, используемые в приложении.
         */
        private constants = Constants;

        /**
         * Конструктор.
         */
        constructor() {
            super();
        }

    }
</script>

<style scoped></style>