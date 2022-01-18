<template>
  <el-dialog
    :title="$t('excel.title')"
    :model-value="modelValue"
    @close="closed"
    width="30%"
  >
    <el-input
      v-model="excelName"
      :placeholder="$t('excel.placeholder')"
    ></el-input>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="closed">{{ $t('excel.close') }}</el-button>
        <el-button type="primary" @click="onConfirm" :loading="loading">{{
          $t('excel.confirm')
        }}</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { defineProps, defineEmits, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { watchSwitchLang } from '@/utils/i18n'
import { getUserManageAllList } from '@/api/user-manage'
import { USER_RELATIONS } from './export-to-excel-constant'
import { dateFilter } from '@/filters'

defineProps({
  modelValue: {
    type: Boolean,
    required: true
  }
})

const emits = defineEmits(['update:modelValue'])

/**
 * 关闭
 */
const closed = () => {
  emits('update:modelValue', false)
}

const i18n = useI18n()
let exportDefaultName = i18n.t('excel.defaultName')
const excelName = ref('')

watchSwitchLang(() => {
  exportDefaultName = i18n.t('excel.defaultName')
  excelName.value = exportDefaultName
})
excelName.value = exportDefaultName

// 点击确定俺就
const loading = ref(false)
const onConfirm = async () => {
  loading.value = true
  const allUser = (await getUserManageAllList()).list
  // 导入工具包
  const excel = await import('@/utils/export-to-excel')
  const data = formatJson(USER_RELATIONS, allUser)
  excel.export_json_to_excel({
    // 表头
    header: Object.keys(USER_RELATIONS),
    //  数据
    data,
    //  文件名称
    filename: excelName.value || exportDefaultName
  })
  closed()
}

const formatJson = (headers, rows) => {
  return rows.map((item) => {
    return Object.keys(headers).map((key) => {
      console.log(key)

      // 角色需要进行特殊处理
      if (headers[key] === 'role') {
        const roles = item[headers[key]]
        return JSON.stringify(roles.map((role) => role.title))
      }

      // 对时间进行处理
      if (headers[key] === 'openTime') {
        return dateFilter(item[headers[key]])
      }
      return item[headers[key]]
    })
  })
}
</script>

<style lang="scss" scoped></style>
