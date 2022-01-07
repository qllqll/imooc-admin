import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from './i18n'

// 初始化样式表
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import '@/styles/index.scss'

// 导入svgIcon
import install from '@/icons/svg/index.js'
// 导入路由鉴权
import './permission'

const app = createApp(App)
install(app)
app.use(store).use(router).use(ElementPlus).use(i18n).mount('#app')
