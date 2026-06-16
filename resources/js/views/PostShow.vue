<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";

const route = useRoute();
const router = useRouter();

const post = ref(null);

const API_BASE = import.meta.env.VITE_API_BASE_URL;
const API_URL = `${API_BASE}/posts`;

const fetchPost = async () => {
    const res = await axios.get(`${API_URL}/${route.params.id}`);
    post.value = res.data;
};

onMounted(fetchPost);
</script>

<template>
    <div class="min-h-screen bg-gray-50 py-10 px-4">
        <div class="max-w-2xl mx-auto">
            <!-- ローディング -->
            <div v-if="!post" class="text-center text-gray-500">
                読み込み中...
            </div>

            <!-- 本体 -->
            <div v-else class="bg-white rounded-xl shadow-md p-6">
                <!-- タイトル -->
                <h1 class="text-2xl font-bold text-gray-800 mb-4">
                    {{ post.title }}
                </h1>

                <!-- 本文 -->
                <p
                    class="text-gray-700 leading-relaxed whitespace-pre-line mb-6"
                >
                    {{ post.body }}
                </p>

                <!-- ボタン -->
                <div class="flex justify-between">
                    <!-- 戻る -->
                    <button
                        @click="router.push('/')"
                        class="text-gray-600 hover:text-gray-900 text-sm"
                    >
                        ← 一覧へ戻る
                    </button>

                    <!-- 編集 -->
                    <button
                        @click="router.push(`/posts/${post.id}/edit`)"
                        class="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg shadow"
                    >
                        編集する
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
