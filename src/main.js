import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import installElementPlus from './plugins/element'
// 初始化样式表
import '@/styles/index.scss'
// 导入svgIcon
import install from '@/icons/svg/index.js'

const app = createApp(App)
installElementPlus(app)
install(app)
app.use(store).use(router).mount('#app')
