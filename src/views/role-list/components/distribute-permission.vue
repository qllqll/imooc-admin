<template>
  <el-dialog
    :title="$t('msg.excel.roleDialogTitle')"
    :model-value="modelValue"
    @close="closed"
  >
    <el-tree
      ref="treeRef"
      :data="allPermissionList"
      :props="defaultProps"
      node-key="id"
      show-checkbox
      check-strictly
      default-expand-all
    ></el-tree>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closed">{{ $t('universal.cancel') }}</el-button>
        <el-button type="primary" @click="onConfirm">{{
          $t('universal.confirm')
        }}</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { defineProps, defineEmits, ref, watch } from 'vue'
import { permissionList } from '@/api/permission'
import { rolePermission, roleDistributePermission } from '@/api/role'
import { watchSwitchLang } from '@/utils/i18n'
import { ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n'

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  roleId: {
    type: String,
    required: true
  }
})
const emits = defineEmits(['update:modelValue'])

/**
 确定按钮点击事件
 */
const i18n = useI18n()
const onConfirm = async () => {
  await roleDistributePermission({
    roleId: props.roleId,
    permissions: treeRef.value.getCheckedKeys()
  })
  ElMessage.success(i18n.t('role.updateRoleSuccess'))
  closed()
}

/**
 * 关闭
 */
const closed = () => {
  emits('update:modelValue', false)
}

// 所有权限
const allPermissionList = ref([])
const getPermissionList = async () => {
  allPermissionList.value = await permissionList()
}
getPermissionList()
watchSwitchLang(getPermissionList)

// ref
const treeRef = ref(null)
// 属性结构配置
const defaultProps = {
  children: 'children',
  label: 'permissionName'
}

// 当前角色的权限
const getRolePermission = async () => {
  const checkedKeys = await rolePermission(props.roleId)
  console.log(checkedKeys)
  treeRef.value.setCheckedKeys(checkedKeys)
}

watch(
  () => props.roleId,
  (value) => {
    if (value) getRolePermission()
  }
)
</script>
