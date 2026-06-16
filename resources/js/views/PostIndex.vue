<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const router = useRouter();

const API_BASE = import.meta.env.VITE_API_BASE_URL;
const API_URL = `${API_BASE}/posts`;
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
    <div class="min-h-screen bg-gray-50 py-10 px-4">
        <div class="max-w-3xl mx-auto">
            <!-- ヘッダー -->
            <div class="flex justify-between items-center mb-6">
                <h1 class="text-2xl font-bold text-gray-800">投稿一覧</h1>

                <router-link to="/create">
                    <button
                        class="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg shadow"
                    >
                        ＋ 投稿する
                    </button>
                </router-link>
            </div>

            <!-- 空状態 -->
            <div
                v-if="posts.length === 0"
                class="text-center text-gray-500 mt-10"
            >
                投稿がありません
            </div>

            <!-- 投稿カード -->
            <div
                v-for="post in posts"
                :key="post.id"
                class="bg-white border border-gray-100 rounded-xl shadow-sm p-5 mb-4 hover:shadow-md transition"
            >
                <!-- タイトル -->
                <h3
                    @click="goDetail(post.id)"
                    class="text-lg font-semibold text-blue-600 cursor-pointer hover:underline"
                >
                    {{ post.title }}
                </h3>

                <!-- 本文 -->
                <p class="text-gray-600 mt-2">
                    {{ post.body }}
                </p>

                <!-- アクション -->
                <div class="flex justify-end mt-4">
                    <button
                        @click="deletePost(post.id)"
                        class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm"
                    >
                        削除
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
