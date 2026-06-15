<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const posts = ref([]);

onMounted(async () => {
    const response = await axios.get("http://127.0.0.1:8000/api/posts");
    posts.value = response.data;
});
</script>

<template>
    <div v-for="post in posts" :key="post.id">
        <h2>{{ post.title }}</h2>
        <p>{{ post.body }}</p>
    </div>
</template>
