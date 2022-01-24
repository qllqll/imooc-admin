import { articleCreate, articleEdit } from '@/api/article'
import { ElMessage } from 'element-plus'
import i18n from '@/i18n'

const t = i18n.global.t

/**
 * 新建文章
 * @param data
 * @returns {Promise<*>}
 */
export const commitArticle = async (data) => {
  const res = await articleCreate(data)
  ElMessage.success(t('article.createSuccess'))
  return res
}

export const editArticle = async (data) => {
  const res = await articleEdit(data)
  ElMessage.success(t('article.editorSuccess'))
  return res
}
