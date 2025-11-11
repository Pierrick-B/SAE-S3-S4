<script setup>
  import { useI18n } from 'vue-i18n'
  import { useLangStore } from "@/stores/langStore.js";

  const { t } = useI18n()
  let lgButton = useLangStore()
  function LanguageButtonClick(event){
    lgButton.toggleLanguage();
    event.target.textContent = lgButton.language;
  }
</script>

<template>
  <a v-if="lgButton.language==='fr'" class="lgButton" type="button" @click="LanguageButtonClick">
    <img class="lgImg" src="@/images/fr.png">
  </a>

  <a v-if="lgButton.language==='en'" class="lgButton" type="button" @click="LanguageButtonClick">
    <img class="lgImg" src="@/images/en.png">
  </a>
</template>

<style>
  .lgButton .lgImg{
    width: 35px;
    height: 30px;
    padding: 0px;
    margin: 0px;
  }
</style>