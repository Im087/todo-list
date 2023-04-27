import { createApp } from 'vue'
import App from './App.vue'
import { store, key } from './store'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'

loadFonts()

const app = createApp(App)
app.use(store, key)
app.use(vuetify)
app.mount('#app')
