<template>
  <div class="">
    <el-card>
      <el-table :data="allRoles" border style="width: 100%">
        <el-table-column
          type="index"
          :label="$t('role.index')"
          width="120"
        ></el-table-column>
        <el-table-column
          :label="$t('role.name')"
          prop="title"
        ></el-table-column>
        <el-table-column
          :label="$t('role.desc')"
          prop="describe"
        ></el-table-column>
        <el-table-column :label="$t('role.action')" width="200">
          <template #default="{ row }">
            <el-button
              type="primary"
              size="mini"
              @click="onDistributeClick(row)"
              >{{ $t('role.assignPermissions') }}</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <distribute-permission
      v-model="visible"
      :roleId="selectRoleId"
    ></distribute-permission>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { watchSwitchLang } from '@/utils/i18n'
import { roleList } from '@/api/role'
import DistributePermission from './components/distribute-permission'

const allRoles = ref([])
const getRoleList = async () => {
  allRoles.value = await roleList()
}
getRoleList()
watchSwitchLang(getRoleList)

const visible = ref(false)
const selectRoleId = ref('')
const onDistributeClick = (row) => {
  visible.value = true
  selectRoleId.value = row.id
}

watch(visible, (val) => {
  if (!val) selectRoleId.value = ''
})
</script>

<style lang="scss" scoped></style>
