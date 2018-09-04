<template>
    <div>
        <navigation :active-index="not_found"></navigation>
        <div class="page_content">
            <div class="page_label">
                Страница не найдена
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    /*
     * ©  Implicitly86 All Rights Reserved
     */

    import { Component, Vue } from "vue-property-decorator";
    import Navigation from '../elements/navigation';

    /**
     * Компонент, реализующий работу пунктом отправки / доставки.
     *
     * @author Emil Murzakaev.
     */
    @Component({
        components: {
            Navigation
        }
    })
    export default class NotFound extends Vue {

    }
</script>

<style scoped></style>