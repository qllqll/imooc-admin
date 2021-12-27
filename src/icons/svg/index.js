// 1.导入所有的svg图标
// 2. 完成svgIcon的全局注册
import SvgIcon from '@/components/svg-icon/index.vue'

const svgRequire = require.context('./svg', false, /\.svg$/)

console.log(svgRequire.keys())
svgRequire.keys().forEach(svgIcon => svgRequire(svgIcon))

export default app => {
  app.component('svg-icon', SvgIcon)
}
