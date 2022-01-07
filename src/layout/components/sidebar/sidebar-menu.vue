<template>
  <el-menu
    :collapse="!$store.getters.sidebarOpened"
    :unique-opened="true"
    :default-active="activeMenu"
    :background-color="$store.getters.cssVars.menuBg"
    :text-color="$store.getters.cssVars.menuText"
    :active-text-color="$store.getters.cssVars.menuActiveText"
    router
  >
    <sidebar-item
      v-for="item in routers"
      :key="item.path"
      :route="item"
    ></sidebar-item>
  </el-menu>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import { filterRoutes, generateMenus } from '@/utils/route'
import SidebarItem from './sidebar-item'
const router = useRouter()
const routers = computed(() => {
  const fRoutes = filterRoutes(router.getRoutes())
  return generateMenus(fRoutes)
})

const store = useStore()
// debugger
console.log(store.getters.cssVars.menuBg)
// 默认激活项
const route = useRoute()
const activeMenu = computed(() => {
  const { path } = route
  return path
})
</script>

<style lang="scss" scoped></style>
