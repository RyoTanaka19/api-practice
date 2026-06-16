<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";

const route = useRoute();
const router = useRouter();

const post = ref(null);

const API_URL = "http://127.0.0.1:8000/api/posts";

const fetchPost = async () => {
    const res = await axios.get(`${API_URL}/${route.params.id}`);
    post.value = res.data;
};

onMounted(fetchPost);
</script>

<template>
    <div v-if="post">
        <h1>投稿詳細</h1>

        <h2>{{ post.title }}</h2>
        <p>{{ post.body }}</p>

        <button @click="router.push('/')">一覧へ戻る</button>

        <!-- 追加 -->
        <button @click="router.push(`/posts/${post.id}/edit`)">編集する</button>
    </div>
</template>
