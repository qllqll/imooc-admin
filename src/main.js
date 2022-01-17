import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from './i18n'
import '@/styles/index.scss'

// 初始化样式表
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// 导入svgIcon
import installIcons from '@/icons/svg/index.js'
// 导入路由鉴权
import './permission'
// 全局属性
import installFilter from '@/filters'

const app = createApp(App)
installIcons(app)
installFilter(app)
app.use(store).use(router).use(ElementPlus).use(i18n).mount('#app')
