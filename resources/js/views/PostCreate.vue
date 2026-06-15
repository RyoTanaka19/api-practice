<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const router = useRouter();

const API_URL = "http://127.0.0.1:8000/api/posts";

const title = ref("");
const body = ref("");

const createPost = async () => {
    await axios.post(API_URL, {
        title: title.value,
        body: body.value,
    });

    // 入力クリア
    title.value = "";
    body.value = "";

    // 一覧へ遷移
    router.push("/");
};
</script>

<template>
    <div>
        <h1>投稿作成</h1>

        <input v-model="title" placeholder="タイトル" />
        <br />
        <input v-model="body" placeholder="本文" />
        <br />

        <button @click="createPost">投稿する</button>

        <br /><br />

        <router-link to="/">← 戻る</router-link>
    </div>
</template>
