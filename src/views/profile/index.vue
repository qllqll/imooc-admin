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
    <el-button>Default</el-button>
    <el-button type="primary">Primary</el-button>
    <el-button type="success">Success</el-button>
    <el-button type="info">Info</el-button>
    <el-button type="warning">Warning</el-button>
    <el-button type="danger">Danger</el-button>
    <el-button>中文</el-button>

    <div>
      <el-radio v-model="radio1" label="1" size="large">Option 1</el-radio>
      <el-radio v-model="radio1" label="2" size="large">Option 2</el-radio>
    </div>
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
