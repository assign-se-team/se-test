<template>
  <Menu></Menu>
  <div
    class="row justify-center q-pa-md"
   >
    <div
      class="main_menu"
    >
      <q-tabs
        v-model="quizTabs"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="justify"
        narrow-indicator
        v-for="tab in quizes"
      >
        <q-tab 
          :name="tab.id" 
          :label="tab.id"
        />
      </q-tabs>

      <q-separator />

      <q-tab-panels 
        v-model="quizTabs" 
        v-for="tab in quizes"
      >
        <q-tab-panel 
          :name="tab.id"
        >
          <div class="text-h6">Q.{{ tab.id }}</div>
          <div class="text-h6">{{ tab.question }}</div>
          <div class="row q-pa-lg">
            
          </div>
        </q-tab-panel>

      </q-tab-panels>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Menu from "../../components/Menu.vue";
import quizJson from '../../quiz.json';

// ルートの設定
const route = useRoute();
const testId = ref<number>(Number(route.params.testId));

// 問題を取得
interface quizesObject{
  id: number,
  question: string,
  answer: number,
  1: string,
  2: string,
  3: string,
  4: string
}
const quizes = quizJson.main.map((e: any) => {
  if(e.id === testId.value){
    return e.quizes
  };
}).filter((e:any)=>e)[0];

// タブの作成
const quizTabs = ref<string>(String(quizes[0].id));
console.log(quizTabs.value)

</script>

<style>

</style>