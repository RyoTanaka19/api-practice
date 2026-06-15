import { createRouter, createWebHistory } from "vue-router";
import PostIndex from "../views/PostIndex.vue";
import PostCreate from "../views/PostCreate.vue";

const routes = [
    {
        path: "/",
        name: "index",
        component: PostIndex,
    },
    {
        path: "/create",
        name: "create",
        component: PostCreate,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
