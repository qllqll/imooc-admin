<template>
  <div class="">
    <el-dialog
      :model-value="modelValue"
      :title="$t('excel.roleDialogTitle')"
      @close="closed"
    >
      <!--      内容-->
      <el-checkbox-group v-model="roleTitleList">
        <el-checkbox
          v-for="item in allRoleList"
          :key="item.id"
          :label="item.title"
        ></el-checkbox
      ></el-checkbox-group>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="closed">{{ $t('universal.cancel') }}</el-button>
          <el-button type="primary" @click="onConfirm">{{
            $t('universal.confirm')
          }}</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, ref, watch } from 'vue'
import { roleList } from '@/api/role'
import { userRoles, updateRole } from '@/api/user-manage'
import { watchSwitchLang } from '@/utils/i18n'
import { ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n'

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  userId: {
    type: String,
    required: true
  }
})
const emits = defineEmits(['update:modelValue', 'updateRole'])
const closed = () => {
  emits('update:modelValue', false)
}

const i18n = useI18n()
const onConfirm = async () => {
  const roles = roleTitleList.value.map((title) => {
    return allRoleList.value.find((role) => role.title === title)
  })
  await updateRole(props.userId, roles)
  ElMessage.success(i18n.t('role.updateRoleSuccess'))
  // 通知角色更新成功
  emits('updateRole')
  closed()
}

// 获取所有角色
const allRoleList = ref([])
const getRolesListData = async () => {
  allRoleList.value = await roleList()
}
getRolesListData()
watchSwitchLang(getRolesListData)

// 当前用户角色
const roleTitleList = ref([])
const getUserRoles = async () => {
  const res = await userRoles(props.userId)
  roleTitleList.value = res.role.map((item) => item.title)
}
watch(
  () => props.userId,
  (val, newVal) => {
    if (val) {
      getUserRoles()
    }
  }
)
</script>

<style lang="scss" scoped></style>
