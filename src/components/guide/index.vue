<template>
  <div id="guide-start" @click="onClick">
    <el-tooltip :content="$t('bavBar.guide')">
      <svg-icon icon="guide"></svg-icon>
    </el-tooltip>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import Driver from 'driver.js'
import 'driver.js/dist/driver.min.css'
import { useI18n } from 'vue-i18n'
import steps from './steps'

const i18n = useI18n()

let driver = null
onMounted(() => {
  driver = new Driver({
    // 静止点击蒙版关闭
    allowClose: false,
    closeBtnText: i18n.t('guide.close'),
    nextBtnText: i18n.t('guide.next'),
    prevBtnText: i18n.t('guide.prev')
  })
})

const onClick = () => {
  driver.defineSteps(steps(i18n))
  driver.start()
}
</script>

<style lang="scss" scoped></style>
