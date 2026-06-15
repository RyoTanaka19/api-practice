<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/posts";

// 入力データ
const title = ref("");
const body = ref("");

// 投稿一覧
const posts = ref([]);

// 一覧取得
const fetchPosts = async () => {
    const response = await axios.get(API_URL);
    posts.value = response.data;
};

// 投稿作成
const createPost = async () => {
    await axios.post(API_URL, {
        title: title.value,
        body: body.value,
    });

    // 入力リセット
    title.value = "";
    body.value = "";

    // 再読み込み
    await fetchPosts();
};

// 初回読み込み
onMounted(fetchPosts);
</script>

<template>
    <div>
        <h2>投稿作成フォーム</h2>

        <input v-model="title" placeholder="タイトル" />
        <br />
        <input v-model="body" placeholder="本文" />
        <br />

        <button @click="createPost">投稿する</button>
    </div>

    <hr />

    <div>
        <h2>投稿一覧</h2>

        <div v-for="post in posts" :key="post.id">
            <h3>{{ post.title }}</h3>
            <p>{{ post.body }}</p>
        </div>
    </div>
</template>
