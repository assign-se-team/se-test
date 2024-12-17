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
        style="display: none;"
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
          <div class="q-pa-lg">
            <div 
              :style="tab.answer === '1' ? 'background-color: #CCEBFF; border: 5px solid white;': 'background: rgba(0,0,0,.08); border: 5px solid white;'"
              class="row items-center"
            >
              <q-radio 
                v-model="tab.answer"
                checked-icon="task_alt" 
                unchecked-icon="panorama_fish_eye" 
                :val="tab.value1"
              />
              <div v-html="tab.option1"></div>
            </div>
            <div 
              :style="tab.answer === '2' ? 'background-color: #CCEBFF; border: 5px solid white;': 'background: rgba(0,0,0,.08); border: 5px solid white;'"
              class="row items-center"
            >
              <q-radio 
                v-model="tab.answer"
                checked-icon="task_alt" 
                unchecked-icon="panorama_fish_eye" 
                :val="tab.value2"
              />
              <div v-html="tab.option2"></div>
            </div>
            <div 
              :style="tab.answer === '3' ? 'background-color: #CCEBFF; border: 5px solid white;': 'background: rgba(0,0,0,.08); border: 5px solid white;'"
              class="row items-center"
            >
              <q-radio 
                v-model="tab.answer"
                checked-icon="task_alt" 
                unchecked-icon="panorama_fish_eye" 
                :val="tab.value3"
              />
              <div v-html="tab.option3"></div>
            </div>
            <div 
              :style="tab.answer === '4' ? 'background-color: #CCEBFF; border: 5px solid white;': 'background: rgba(0,0,0,.08); border: 5px solid white;'"
              class="row items-center"
            >
              <q-radio 
                v-model="tab.answer"
                checked-icon="task_alt" 
                unchecked-icon="panorama_fish_eye" 
                :val="tab.value4"
              />
              <div v-html="tab.option4"></div>
            </div>
          </div>
        </q-tab-panel>
      </q-tab-panels>
      <q-btn
        label="次へ"
        flat
        class="bg-red-6 text-white"
        style="float: right;"
      />
    </div>
    <!-- ページ分割 -->
    <div class="q-pa-lg flex flex-center">
    <q-pagination
      v-model="currentPage"
      :max="5"
      input 
      color="red-6"
      input-class="text-black text-bold"
    />
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

// ページのheadの設定
useHead({
  title: '問題回答 | SE知見テスト',
  meta: [
    { hid: 'robots', name: 'robots', content: 'noindex' }
  ]
});

// 問題を取得
interface quizesObject{
  id: number,
  question: string,
  answer: number,
  option1: string,
  option2: string,
  option3: string,
  option4: string
};

const quizes = quizJson.main.map((e: any) => {
  if(e.id === testId.value){
    return e.quizes
  };
}).filter((e:any)=>e)[0];

// タブの作成
const quizTabs = ref<string>(String(quizes[0].id));
console.log(quizTabs.value)

// ページの設定
const currentPage = ref<number>(1);


</script>

<style>


</style>