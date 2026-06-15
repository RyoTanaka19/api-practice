<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const router = useRouter();

const API_URL = "http://127.0.0.1:8000/api/posts";

const posts = ref([]);

const fetchPosts = async () => {
    const res = await axios.get(API_URL);
    posts.value = res.data;
};

const goDetail = (id) => {
    router.push(`/posts/${id}`);
};

const deletePost = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    await fetchPosts();
};

onMounted(fetchPosts);
</script>

<template>
    <div>
        <h1>投稿一覧</h1>

        <router-link to="/create">
            <button>投稿する</button>
        </router-link>

        <hr />

        <div v-for="post in posts" :key="post.id">
            <h3 @click="goDetail(post.id)" style="cursor: pointer; color: blue">
                {{ post.title }}
            </h3>

            <p>{{ post.body }}</p>

            <button @click="deletePost(post.id)">削除</button>
        </div>
    </div>
</template>
