//import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'
import 'nprogress'
import './assets/style.css'

const app = createApp(App)
import { inject } from '@vercel/analytics'
inject()

app.use(createPinia())
app.use(router)

app.mount('#app')
