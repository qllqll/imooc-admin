<template>
  <div class="">
    <el-card>
      <el-table
        :data="allPermissions"
        style="width: 100%"
        border
        row-key="id"
        default-expand-all
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      >
        <el-table-column
          prop="permissionName"
          :label="$t('permission.name')"
          width="180"
        ></el-table-column>
        <el-table-column
          prop="permissionMark"
          :label="$t('permission.mark')"
          width="180"
        ></el-table-column>
        <el-table-column
          prop="permissionDesc"
          :label="$t('permission.desc')"
        ></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { permissionList } from '@/api/permission'
import { watchSwitchLang } from '@/utils/i18n'

const allPermissions = ref([])
const getPermissionList = async () => {
  allPermissions.value = await permissionList()
}
getPermissionList()
watchSwitchLang(getPermissionList)
</script>

<style lang="scss" scoped></style>
