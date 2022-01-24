<template>
  <div class="article-create">
    <el-card>
      <el-input
        class="title-input"
        :placeholder="$t('article.titlePlaceholder')"
        v-model="title"
        maxlength="20"
        clearable
      ></el-input>
      <el-tabs v-model="activeName">
        <el-tab-pane :label="$t('article.markdown')" name="markdown">
          <markdown
            :title="title"
            :detail="detail"
            @onSuccess="onSuccess"
          ></markdown>
        </el-tab-pane>
        <el-tab-pane :label="$t('article.richText')" name="richText">
          <editor></editor>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Editor from './components/editor'
import Markdown from './components/markdown'
import { useRoute } from 'vue-router'
import { articleDetail } from '@/api/article'

const route = useRoute()
const articleId = route.params.id
const detail = ref({})
const getArticleDetail = async () => {
  detail.value = await articleDetail(articleId)
  title.value = detail.value.title
}

console.log('-----' + articleId)
if (articleId) {
  debugger
  getArticleDetail()
}
const title = ref('')
const activeName = ref('markdown')
const onSuccess = () => {
  title.value = ''
}
</script>

<style lang="scss" scoped></style>
