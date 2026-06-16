import { createRouter, createWebHistory } from "vue-router";
import PostIndex from "../views/PostIndex.vue";
import PostCreate from "../views/PostCreate.vue";
import PostShow from "../views/PostShow.vue";
import PostEdit from "../views/PostEdit.vue";

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
    {
        path: "/posts/:id/edit",
        component: PostEdit,
    },
];

export default createRouter({
    history: createWebHistory(),
    routes,
});
