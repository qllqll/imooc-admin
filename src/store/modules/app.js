import { getItem, setItem } from '@/utils/storage'
import { LANG, TAGS_VIEW } from '@/constant'
export default {
  namespaced: true,
  state: () => ({
    sidebarOpened: true,
    language: getItem(LANG) || 'zh',
    tagsViewList: getItem(TAGS_VIEW) || []
  }),
  mutations: {
    triggerSidebarOpened(state) {
      state.sidebarOpened = !state.sidebarOpened
    },
    setLanguage(state, lang) {
      setItem(LANG, lang)
      state.language = lang
    },

    /**
     * 添加tags
     */
    addTagsViewList(state, tag) {
      //  处理重复
      const isFind = state.tagsViewList.find((item) => {
        return item.path === tag.path
      })

      if (!isFind) {
        state.tagsViewList.push(tag)
        setItem(TAGS_VIEW, state.tagsViewList)
      }
    },

    /**
     * 为指定tag 修改title
     */
    changeTagsView(state, { index, tag }) {
      state.tagsViewList[index] = tag
      setItem(TAGS_VIEW, state.tagsViewList)
    },

    /**
     * {type: 'other' || 'right' || 'index'}
     */
    removeTagsView(state, playload) {
      if (playload.type === 'index') {
        state.tagsViewList.splice(playload.index, 1)
      } else if (playload.type === 'other') {
        state.tagsViewList.splice(
          playload.index + 1,
          state.tagsViewList.length - playload.index + 1
        )
        state.tagsViewList.splice(0, playload.index)
      } else if (playload.type === 'right') {
        state.tagsViewList.splice(
          playload.index + 1,
          state.tagsViewList.length - playload.index + 1
        )
      }
      setItem(TAGS_VIEW, state.tagsViewList)
    }
  }
}
