<template>
  <div class="article-ranking-container">
    <el-card>
      <el-table ref="tableRef" :data="tableData" border style="width: 100%">
        <el-table-column
          :label="$t('article.ranking')"
          prop="ranking"
        ></el-table-column>
        <el-table-column
          :label="$t('article.title')"
          prop="title"
        ></el-table-column>
        <el-table-column
          :label="$t('article.author')"
          prop="author"
        ></el-table-column>
        <el-table-column :label="$t('article.publicDate')">
          <template #default="{ row }">
            {{ $filters.relativeTime(row.publicDate) }}
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('article.desc')"
          prop="desc"
        ></el-table-column>
        <el-table-column :label="$t('article.action')" prop="desc">
          <template #default="{ row }">
            <el-button type="primary" size="mini" @click="onShowClick(row)">{{
              $t('article.show')
            }}</el-button>
            <el-button type="danger" size="mini" @click="onRemoveClick(row)">{{
              $t('article.remove')
            }}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="pagination"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="[5, 10, 20, 50, 100]"
        :page-size="size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onActivated } from 'vue'
import { getArticleList } from '@/api/article'
import { watchSwitchLang } from '@/utils/i18n'
// 数据相关
const tableData = ref([])
const page = ref(1)
const size = ref(10)
const total = ref(0)
const tableRef = ref(null)

const getListData = async () => {
  const result = await getArticleList({
    page: page.value,
    size: size.value
  })

  tableData.value = result.list
  total.value = result.total
}
getListData()
watchSwitchLang(getListData)
onActivated(getListData)

// size改变
const handleSizeChange = (currentSize) => {
  size.value = currentSize
  getListData()
}

// 页码改变
const handleCurrentChange = (CurrentPage) => {
  page.value = CurrentPage
  getListData()
}
// 点击查看
const onShowClick = (row) => {}
// 点击删除
const onRemoveClick = (row) => {}
</script>

<style lang="scss" scoped>
.article-ranking-container {
  .header {
    margin-bottom: 20px;
    .dynamic-box {
      display: flex;
      align-items: center;
      .title {
        margin-right: 20px;
        font-size: 14px;
        font-weight: bold;
      }
    }
  }
  ::v-deep .el-table__row {
    cursor: pointer;
  }
  .pagination {
    margin-top: 20px;
    text-align: center;
  }
}
::v-deep .sortable-ghost {
  opacity: 0.6;
  color: #fff !important;
  background: #304156 !important;
}
</style>
