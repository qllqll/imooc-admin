/**
 * 判断是否是外部资源
 * */
export function isExternal (path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}
