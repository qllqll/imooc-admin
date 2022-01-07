<template>
  <el-dropdown
    v-bind="$attrs"
    trigger="click"
    class="theme"
    @command="handleSetTheme"
  >
    <!--    图标-->
    <div>
      <el-tooltip :content="$t('bavBar.themeChange')">
        <svg-icon icon="change-theme"></svg-icon>
      </el-tooltip>
    </div>
    <!--    menu-->
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="color">{{
          $t('theme.themeColorChange')
        }}</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
  <div>
    <select-color v-model="selectColorVisible"></select-color>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import SelectColor from './components/select-color'

const handleSetTheme = (command) => {
  selectColorVisible.value = true
}

// dialog
const selectColorVisible = ref(false)
</script>

<style lang="scss" scoped></style>
