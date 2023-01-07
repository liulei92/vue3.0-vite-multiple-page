import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import './assets/main.css'

import ElementPlus from 'element-plus'

const app = createApp(App)

app.use(createPinia())
app.use(router)

//全局配置Element-ui 层级 大小
app.use(ElementPlus, { size: 'small', zIndex: 3000 })

app.mount('#app')
