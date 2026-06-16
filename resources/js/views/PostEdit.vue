<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";

const route = useRoute();
const router = useRouter();

const API_BASE = import.meta.env.VITE_API_BASE_URL;
const API_URL = `${API_BASE}/posts`;

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

    router.push(`/posts/${route.params.id}`);
};

onMounted(fetchPost);
</script>

<template>
    <div class="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div class="w-full max-w-xl bg-white rounded-xl shadow-md p-6">
            <!-- タイトル -->
            <h1 class="text-2xl font-bold text-gray-800 mb-6 text-center">
                投稿編集
            </h1>

            <!-- フォーム -->
            <div class="space-y-4">
                <!-- タイトル -->
                <div>
                    <label class="block text-sm font-medium text-gray-600 mb-1">
                        タイトル
                    </label>
                    <input
                        v-model="title"
                        type="text"
                        class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                <!-- 本文 -->
                <div>
                    <label class="block text-sm font-medium text-gray-600 mb-1">
                        本文
                    </label>
                    <textarea
                        v-model="body"
                        rows="6"
                        class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    ></textarea>
                </div>

                <!-- ボタン -->
                <button
                    @click="updatePost"
                    class="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg shadow transition"
                >
                    更新する
                </button>

                <!-- キャンセル -->
                <button
                    @click="router.push('/')"
                    class="w-full mt-2 text-gray-600 hover:text-gray-800 text-sm"
                >
                    キャンセル
                </button>
            </div>
        </div>
    </div>
</template>
