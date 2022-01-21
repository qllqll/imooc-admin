import i18n from '@/i18n'

const t = i18n.global.t

/**
 * @description: 导出函数用来实现国际化
 * @param {*}
 * @return {*}
 */
export default () => [
  {
    label: t('article.ranking'),
    prop: 'ranking'
  },
  {
    label: t('article.title'),
    prop: 'title'
  },
  {
    label: t('article.author'),
    prop: 'author'
  },
  {
    label: t('article.publicDate'),
    prop: 'publicDate'
  },
  {
    label: t('article.desc'),
    prop: 'desc'
  },
  {
    label: t('article.action'),
    prop: 'action'
  }
]
