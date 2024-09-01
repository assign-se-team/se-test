<template>
  <!-- メニュー -->
  <Menu></Menu>
    
  <!-- ページのメイン部分 -->
   <div
    class="row justify-center q-pa-md"
   >
    <div
      class="main_menu"
      v-for="(quiz, index) in quizesArray"
    >

      <!-- 各問題のカード -->
      <q-card 
        flat 
        bordered 
        class="my-card"
      >
        <div
          class="row q-pa-md items-center"
        >
          <div class="text-h6 col-9">{{ quiz.name }}</div>
          <div class="text-grey-7 col-3">更新日：{{ quiz.date }}</div>
      </div>

        <q-card-section class="q-pt-none">
          {{ quiz.description }}
        </q-card-section>

        <q-separator inset/>

        <div class="row items-center q-pt-sm q-pl-md q-pr-md q-pb-sm">
          
          <div class="col-2 text-grey-7">作成者：{{ quiz.creator }}</div>
          <div class="col-2 text-grey-7">問題数：{{ quiz.totalQuestions }}</div>
          <div class="col-6"></div>
          <div class="col-2">
            <nuxt-link
              to="./answer"
            >
              <q-btn
                flat
                class="bg-red-5 text-white"
                style="width: 100%;"
                label="回答する"
              />
            </nuxt-link>
          </div>
        </div>
      </q-card>
    </div>
   </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Menu from "../components/Menu.vue";

// 問題一覧を表示するための変数
interface quizObject {
  id: number,
  name: string,
  description: string,
  date: string,
  creator: string,
  totalQuestions: number,
};
const quizesArray = ref<Array<quizObject>>([
  {
    id: 1,
    name: "SE職とは 基礎編",
    description: "育成メンバー向けのSE職に関する基本的な理解を問う問題です。",
    date: "2024/08/27 23:59",
    creator: "三浦",
    totalQuestions: 20,
  },
  {
    id: 2,
    name: "SE職とは 応用編",
    description: "戦力化AGT向けのSE職に関する深い理解を問う問題です。",
    date: "2024/08/27 23:59",
    creator: "三浦",
    totalQuestions: 20,
  },
  {
    id: 3,
    name: "プログラミング言語の種類(1)",
    description: "各プログラミング言語の性質や用途を問う問題です",
    date: "2024/08/28 10:10",
    creator: "矢田",
    totalQuestions: 10,
  },
  {
    id: 4,
    name: "プログラミング言語の種類(2)",
    description: "各プログラミング言語の性質や用途を問う問題です",
    date: "2024/08/28 10:15",
    creator: "矢田",
    totalQuestions: 15,
  },
]);


</script>

<style>
.main_menu{
  width: 800px;
  margin: 0px 0px 20px 0px;
}

/* スマホ用設定 */
@media screen and (max-width:480px) { 

  div.main_menu{
    width: 95%;
  }
}

</style>