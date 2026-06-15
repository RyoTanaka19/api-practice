import { createRouter, createWebHistory } from "vue-router";
import PostIndex from "../views/PostIndex.vue";
import PostCreate from "../views/PostCreate.vue";
import PostShow from "../views/PostShow.vue";

const routes = [
    {
        path: "/",
        component: PostIndex,
    },
    {
        path: "/create",
        component: PostCreate,
    },
    {
        path: "/posts/:id",
        component: PostShow,
    },
];

export default createRouter({
    history: createWebHistory(),
    routes,
});
