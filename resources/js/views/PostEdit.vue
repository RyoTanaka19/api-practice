<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";

const route = useRoute();
const router = useRouter();

const API_URL = "http://127.0.0.1:8000/api/posts";

const title = ref("");
const body = ref("");

const fetchPost = async () => {
    const res = await axios.get(`${API_URL}/${route.params.id}`);
    title.value = res.data.title;
    body.value = res.data.body;
};

const updatePost = async () => {
    await axios.put(`${API_URL}/${route.params.id}`, {
        title: title.value,
        body: body.value,
    });

    // 更新後は詳細へ戻る
    router.push(`/posts/${route.params.id}`);
};

onMounted(fetchPost);
</script>

<template>
    <div>
        <h1>投稿編集</h1>

        <input v-model="title" placeholder="タイトル" />
        <br />
        <input v-model="body" placeholder="本文" />
        <br />

        <button @click="updatePost">更新する</button>
        <button @click="router.push('/')">キャンセル</button>
    </div>
</template>
