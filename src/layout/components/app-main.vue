<template>
  <div class="app-main">
    <router-view></router-view>
  </div>
</template>

<script setup>
import { watch } from 'vue'
import { useRoute } from 'vue-router'
import { isTags } from '@/utils/tags'
import { useStore } from 'vuex'
import { generateTitle, watchSwitchLang } from '@/utils/i18n'

/**
 * 生成title
 */
const getTitle = (route) => {
  let title = ''
  if (!route.meta) {
    const pathArr = route.path.split('/')
    title = pathArr[pathArr.length - 1]
  } else {
    title = generateTitle(route.meta.title)
  }
  return title
}

const store = useStore()
const route = useRoute()
watch(route, (to, from) => {
  console.log(to.path)
  if (!isTags(to.path)) return
  const { fullPath, meta, name, params, path, query } = to
  store.commit(
    'app/addTagsViewList',
    {
      fullPath,
      meta,
      name,
      params,
      path,
      query,
      title: getTitle(to)
    },
    {
      immediate: true
    }
  )
})
watchSwitchLang(() => {
  store.getters.tagsViewList.forEach((route, index) => {
    store.commit('app/changeTagsView', {
      index,
      tag: {
        ...route,
        title: getTitle(route)
      }
    })
  })
})
</script>

<style lang="scss" scoped>
.app-main {
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
  padding: 91px 20px 20px 20px;
  box-sizing: border-box;
}
</style>
