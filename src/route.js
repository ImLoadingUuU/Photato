import home from './home.vue';
import imageEditor from './edit.vue'
const routes = [
    { path: '/', component: home },
    { path: '/edit',component: imageEditor }
]
const VueRouter = require("vue-router");
// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = VueRouter.createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: VueRouter.createWebHashHistory(),
    routes, // short for `routes: routes`
})

export default  router
