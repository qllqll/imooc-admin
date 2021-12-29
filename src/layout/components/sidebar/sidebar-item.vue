<template>
  <el-submenu
    :uniqueOpened="true"
    v-if="route.children.length > 0"
    :index="route.path"
  >
    <template #title>
      <menu-item :title="route.meta.title" :icon="route.meta.icon"> </menu-item>
    </template>
    <sidebar-item
      v-for="item in route.children"
      :key="item.path"
      :route="item"
    ></sidebar-item>
  </el-submenu>
  <el-menu-item v-else :index="route.path">
    <menu-item :title="route.meta.title" :icon="route.meta.icon"> </menu-item>
  </el-menu-item>
</template>

<script setup>
import MenuItem from './menu-item'
import { defineProps } from 'vue'

defineProps({
  route: {
    type: Object,
    required: true
  }
})
</script>

<style lang="scss" scoped></style>
