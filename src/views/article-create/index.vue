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
          <markdown></markdown>
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

const title = ref('')
const activeName = ref('markdown')
</script>

<style lang="scss" scoped></style>
