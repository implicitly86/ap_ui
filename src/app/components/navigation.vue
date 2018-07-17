<template>
    <el-menu
            :default-active="activeIndex"
            class="el-menu-vertical-demo"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b">
        <router-link :to="{ name: 'project-mapping' }">
            <el-menu-item index="1">
                <i class="el-icon-rank"></i>
                <span>Соответствие MSP - JIRA</span>
            </el-menu-item>
        </router-link>
        <router-link :to="{ name: 'line-managers' }">
            <el-menu-item index="2">
                <i class="el-icon-star-on"></i>
                <span>Линейные менеджеры</span>
            </el-menu-item>
        </router-link>
        <router-link :to="{ name: 'stop-list-employees' }">
            <el-menu-item index="3">
                <i class="el-icon-warning"></i>
                <span>Стоп-лист сотрудников для панели затрат</span>
            </el-menu-item>
        </router-link>
        <router-link :to="{ name: 'stop-list-projects' }">
            <el-menu-item index="4">
                <i class="el-icon-warning"></i>
                <span>Стоп-лист проектов</span>
            </el-menu-item>
        </router-link>
    </el-menu>
</template>

<script lang="ts">
    import { Component, Vue } from "vue-property-decorator";

    @Component({
        name: 'navigation',
        props: {
            activeIndex: {
                type: String,
                default: "0"
            }
        }
    })
    export default class Navigation extends Vue {

    }
</script>

<style scoped>
    a {
        text-decoration: none;
    }
    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 360px;
        height: 100%;
        position: fixed;
    }
</style>