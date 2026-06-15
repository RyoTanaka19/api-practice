<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/posts";

// 入力データ（作成）
const title = ref("");
const body = ref("");

// 編集状態
const isEditing = ref(false);
const editTitle = ref("");
const editBody = ref("");

// データ
const posts = ref([]);
const selectedPost = ref(null);

// 一覧取得
const fetchPosts = async () => {
    const response = await axios.get(API_URL);
    posts.value = response.data;
};

// 詳細取得
const fetchPost = async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    selectedPost.value = response.data;

    // 詳細クリック時は編集状態リセット
    isEditing.value = false;
};

// 編集開始
const startEdit = () => {
    isEditing.value = true;

    editTitle.value = selectedPost.value.title;
    editBody.value = selectedPost.value.body;
};

// 更新保存
const saveUpdate = async () => {
    await axios.put(`${API_URL}/${selectedPost.value.id}`, {
        title: editTitle.value,
        body: editBody.value,
    });

    // 画面反映
    selectedPost.value.title = editTitle.value;
    selectedPost.value.body = editBody.value;

    isEditing.value = false;

    await fetchPosts();
};

// キャンセル
const cancelEdit = () => {
    isEditing.value = false;

    editTitle.value = selectedPost.value.title;
    editBody.value = selectedPost.value.body;
};

// 投稿作成
const createPost = async () => {
    await axios.post(API_URL, {
        title: title.value,
        body: body.value,
    });

    title.value = "";
    body.value = "";

    await fetchPosts();
};

const deletePost = async (id) => {
    await axios.delete(`${API_URL}/${id}`);

    // 詳細表示中なら閉じる
    if (selectedPost.value?.id === id) {
        selectedPost.value = null;
        isEditing.value = false;
    }

    // 一覧更新
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

    <div v-for="post in posts" :key="post.id">
        <h3 @click="fetchPost(post.id)" style="cursor: pointer">
            {{ post.title }}
        </h3>

        <p>{{ post.body }}</p>

        <!-- 削除ボタン追加 -->
        <button @click="deletePost(post.id)">削除</button>
    </div>

    <hr />

    <div v-if="selectedPost">
        <h2>詳細</h2>

        <div v-if="!isEditing">
            <h3>{{ selectedPost.title }}</h3>
            <p>{{ selectedPost.body }}</p>

            <button @click="startEdit">編集</button>
        </div>

        <div v-else>
            <h2>編集フォーム</h2>

            <input v-model="editTitle" />
            <input v-model="editBody" />

            <button @click="saveUpdate">更新</button>
            <button @click="cancelEdit">キャンセル</button>
        </div>
    </div>
</template>
