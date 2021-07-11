import * as VueRouter from "vue-router";
import Main from "../views/Main.vue";
import Archive from "../views/Archive.vue";

export default VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes: [
        {
            path: "/",
            name: "main",
            component: Main,
        },
        {
            path: "/archive",
            name: "archive",
            component: Archive,
        },
        {
            path: '/:pathMatch(.*)',
            redirect: '/'
        }
    ]
});