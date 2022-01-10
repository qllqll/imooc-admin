<template>
  <div
    class="header-search"
    :class="{ show: isShow }"
    @click.stop="onShowClick"
  >
    <svg-icon class-name="search-icon" icon="search"> </svg-icon>
    <el-select
      ref="headerSearchSelectRef"
      class="header-search-select"
      v-model="search"
      filterable
      default-first-option
      remote
      :remote-method="querySearch"
      placeholder="search"
      @change="onselectChange"
    >
      <el-option
        v-for="option in searchOptions"
        :key="option.item.path"
        :label="option.item.title.join(' > ')"
        :value="option.item"
      ></el-option>
    </el-select>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { filterRoutes } from '@/utils/route'
import { generateRoutes } from './fuse-data'
import { useRouter } from 'vue-router'
import Fuse from 'fuse.js'
import { watchSwitchLang } from '@/utils/i18n'

// 数据源
const router = useRouter()
let searchPool = computed(() => {
  const fRoutes = filterRoutes(router.getRoutes())
  return generateRoutes(fRoutes)
})

// 搜索库相关
let fuse
const initFuse = (searchPool) => {
  fuse = new Fuse(searchPool, {
    // 是否按照优先级进行排序
    shouldSort: true,
    // 匹配长度超过这个值才会被认为是匹配的
    minMatchCharLength: 1,
    keys: [
      { name: 'title', weight: 0.7 },
      { name: 'path', weight: 0.3 }
    ]
  })
}
initFuse(searchPool.value)

// 控制search 展示
const isShow = ref(false)
const onShowClick = () => {
  isShow.value = !isShow.value
}

watch(isShow, (val) => {
  if (val) {
    headerSearchSelectRef.value.focus()
    document.body.addEventListener('click', onclose)
  } else {
    document.body.removeEventListener('click', onclose)
  }
})

// 关闭事件
const headerSearchSelectRef = ref(null)
const onclose = () => {
  headerSearchSelectRef.value.blur()
  isShow.value = false
  searchOptions.value = []
}

// search 相关
const search = ref('')

// 搜索方法
const searchOptions = ref([])
const querySearch = (query) => {
  if (query !== '') {
    searchOptions.value = fuse.search(query)
  } else {
    searchOptions.value = []
  }
}

// 选中回调
const onselectChange = (val) => {
  router.push(val.path)
}

watchSwitchLang(() => {
  searchPool = computed(() => {
    const fRoutes = filterRoutes(router.getRoutes())
    return generateRoutes(fRoutes)
  })
  initFuse(searchPool.value)
})
</script>

<style lang="scss" scoped>
.header-search {
  font-size: 0 !important;
  ::v-deep .search-icon {
    cursor: pointer;
    font-size: 18px;
    vertical-align: middle;
  }
  .header-search-select {
    font-size: 18px;
    transition: width 0.2s;
    width: 0;
    overflow: hidden;
    background: transparent;
    border-radius: 0;
    display: inline-block;
    vertical-align: middle;
    ::v-deep .el-input__inner {
      border-radius: 0;
      border: 0;
      padding-left: 0;
      padding-right: 0;
      box-shadow: none !important;
      border-bottom: 1px solid #d9d9d9;
      vertical-align: middle;
    }
  }
  &.show {
    .header-search-select {
      width: 210px;
      margin-left: 10px;
    }
  }
}
</style>
