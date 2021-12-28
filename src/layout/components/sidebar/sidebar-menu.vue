<template>
  <el-menu
    :unique-opened="true"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
  >
    <!--  子集menu -->
    <el-submenu index="1">
      <template #title>
        <i class="el-icon-location"></i>
        <span>导航一</span>
      </template>
      <el-menu-item index="1-1">选项1</el-menu-item>
      <el-menu-item index="1-2">选项1</el-menu-item>
    </el-submenu>
    <!--    具体菜单项-->
    <el-menu-item index="2">
      <template #title>
        <i class="el-icon-location"></i>
        <span>导航四</span>
      </template>
    </el-menu-item>
  </el-menu>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { filterRoutes, generateMenus } from '@/utils/route'
const router = useRouter()
const routers = computed(() => {
  const fRoutes = filterRoutes(router.getRoutes())
  console.log(fRoutes)
  return generateMenus(fRoutes)
})
console.log(routers.value)
</script>

<style lang="scss" scoped></style>
