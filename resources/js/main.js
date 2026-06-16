import { createApp } from "vue";
import App from "./app.vue";
import router from "./router";
import "./assets/tailwind.css";

const app = createApp(App);

app.use(router); // ←これが絶対必要

app.mount("#app");
