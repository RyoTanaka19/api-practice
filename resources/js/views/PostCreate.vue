<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const router = useRouter();

const API_BASE = import.meta.env.VITE_API_BASE_URL;
const API_URL = `${API_BASE}/posts`;

const title = ref("");
const body = ref("");

const createPost = async () => {
    await axios.post(API_URL, {
        title: title.value,
        body: body.value,
    });

    title.value = "";
    body.value = "";

    router.push("/");
};
</script>

<template>
    <div class="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div class="w-full max-w-xl bg-white rounded-xl shadow-md p-6">
            <!-- タイトル -->
            <h1 class="text-2xl font-bold text-gray-800 mb-6 text-center">
                投稿作成
            </h1>

            <!-- フォーム -->
            <div class="space-y-4">
                <!-- タイトル入力 -->
                <div>
                    <label class="block text-sm font-medium text-gray-600 mb-1">
                        タイトル
                    </label>
                    <input
                        v-model="title"
                        type="text"
                        placeholder="タイトルを入力"
                        class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                <!-- 本文入力 -->
                <div>
                    <label class="block text-sm font-medium text-gray-600 mb-1">
                        本文
                    </label>
                    <textarea
                        v-model="body"
                        rows="5"
                        placeholder="本文を入力"
                        class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    ></textarea>
                </div>

                <!-- ボタン -->
                <button
                    @click="createPost"
                    class="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg shadow transition"
                >
                    投稿する
                </button>

                <!-- 戻る -->
                <div class="text-center mt-4">
                    <router-link
                        to="/"
                        class="text-sm text-gray-500 hover:text-gray-700"
                    >
                        ← 一覧へ戻る
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>
