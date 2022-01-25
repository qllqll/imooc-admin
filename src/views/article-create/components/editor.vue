<template>
  <div class="editor-container">
    <div id="editor-box"></div>
    <div class="bottom">
      <el-button type="primary" @click="onSubmitClick">{{
        $t('article.commit')
      }}</el-button>
    </div>
  </div>
</template>

<script setup>
import E from 'wangeditor'
import { onMounted, defineEmits, defineProps, watch } from 'vue'
import i18next from 'i18next'
import { useStore } from 'vuex'
import { commitArticle, editArticle } from './commit'

const props = defineProps({
  title: {
    required: true,
    type: String
  },
  detail: {
    type: Object
  }
})
const emits = defineEmits(['onSuccess'])
// 初始化editor 实例
let editor
// 获取到dom
let el

const store = useStore()

const initEditor = () => {
  editor = new E(el)
  editor.config.zIndex = 1
  // 菜单栏提示
  editor.config.showMenuTooltips = true
  editor.config.showMenuTooltipPosition = 'down'
  // 国际化
  editor.config.lang = store.getters.language === 'zh' ? 'zh-CN' : 'en'
  editor.i18next = i18next
  editor.create()
}
onMounted(() => {
  el = document.querySelector('#editor-box')
  initEditor()
})

const onSubmitClick = async () => {
  if (props.detail && props.detail._id) {
    await editArticle({
      id: props.detail._id,
      title: props.title,
      content: editor.txt.html()
    })
  } else {
    await commitArticle({
      title: props.title,
      content: editor.txt.html()
    })
  }
  editor.txt.html('')
  emits('onSuccess')
}
// 数据回显
watch(
  () => props.detail,
  (value) => {
    if (value && value.content) {
      editor.txt.html(value.content)
    }
  },
  {
    immediate: true
  }
)
</script>

<style lang="scss" scoped>
.editor-container {
  .bottom {
    margin-top: 20px;
    text-align: right;
  }
}
</style>
