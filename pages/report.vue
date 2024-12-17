<template>
  <Menu></Menu>
  <div>
    <p>COMING SOON</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Menu from "../components/Menu.vue";

// ページのheadの設定
useHead({
  title: '報告 | SE知見テスト',
  meta: [
    { hid: 'robots', name: 'robots', content: 'noindex' }
  ]
});

</script>