<template>
    <div>
        <el-container>
            <el-header class="title_center">
                Административная панель
            </el-header>
            <el-container>
                <el-col :span="5">
                    <navigation></navigation>
                </el-col>
                <el-col :span="19">
                    <router-view class="view content"></router-view>
                </el-col>
            </el-container>
        </el-container>
    </div>
</template>

<script lang="ts">
    /*
     * ©  Implicitly86 All Rights Reserved
     */

    import { Component, Vue } from "vue-property-decorator";
    import Navigation from '../navigation';

    @Component({
        components: {
            Navigation
        }
    })
    export default class MainContainer extends Vue {

    }
</script>

<style scoped></style>