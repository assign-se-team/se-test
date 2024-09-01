<template>
  <div 
    class="q-pa-sm bg-red-6"
  >
    <q-toolbar 
      class="text-white"
    >
      <!-- メニューボタン -->
      <q-btn 
        flat 
        round 
        dense 
        icon="menu"
        @click="openMenu"
      />

      <!-- メニューのダイアログ -->
      <q-dialog 
        v-model="menuDialog" 
        position="left"
      >
      <q-card style="width: 350px">
        <q-list>

          <!-- メニューに戻る -->
          <q-item 
            clickable 
            v-close-popup
            class="row items-center"
          >
            <nuxt-link
              to="/"
            >
              <q-icon 
                name="home"
                size="20px"
                class="text-red-6 q-pr-sm"
              />
              <span class="text-red-6">メニューに戻る</span>
            </nuxt-link>
          </q-item>

          <!-- 問題を作成する -->
          <q-item 
            clickable 
            v-close-popup
            class="row items-center"
          >
            <nuxt-link
              to="/create"
            >
              <q-icon 
                name="add_circle"
                size="20px"
                class="text-red-6 q-pr-sm"
              />
              <span class="text-red-6">問題を作成する</span>
            </nuxt-link>
          </q-item>

          <!-- 区切り線 -->
          <q-separator />

          <!-- 報告する -->
          <q-item 
            clickable 
            v-close-popup
            class="row items-center"
          >
            <nuxt-link
              to="/report"
            >
              <q-icon 
                name="flag"
                size="20px"
                class="text-red-6 q-pr-sm"
              ></q-icon>
              <span class="text-red-6">報告する</span>
            </nuxt-link>
          </q-item>
        </q-list>
      </q-card>
    </q-dialog>

      <!-- タイトル -->
      <q-toolbar-title>
        <span>SE知見共有テスト</span>
      </q-toolbar-title>
    
    </q-toolbar>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// メニューを開く処理
const menuDialog = ref<boolean>(false);
const openMenu = () => {
  menuDialog.value = true;
};

</script>

<style>
a {
  text-decoration: none !important;
}
</style>