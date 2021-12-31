<template>
  <div class="">
    个人中心
    <el-tooltip
      class="box-item"
      :effect="effect"
      content="Top Left prompts info"
    >
      <svg-icon icon="language"></svg-icon>
    </el-tooltip>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
defineProps({
  effect: {
    type: String,
    default: 'dark',
    validator: function (value) {
      return ['dark', 'light'].indexOf(value) !== -1
    }
  }
})
</script>

<style lang="scss" scoped></style>
