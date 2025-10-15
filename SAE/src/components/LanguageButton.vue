<script setup>
  import langue from "@/datasource/lang.json"
  import { useLangStore } from "@/stores/langStore.js";

  let lgButton = useLangStore()
  function LanguageButtonClick(event){
    lgButton.toggleLanguage();
    event.target.textContent = lgButton.language;
  }
</script>

<template>
  <button type="button" @click="LanguageButtonClick">{{ lgButton.language }}</button>
  <label>{{ langue["test2"][lgButton.language] }}</label>
</template>