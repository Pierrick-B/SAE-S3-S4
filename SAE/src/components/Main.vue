<script setup>
import { useLangStore } from "@/stores/langStore.js";
import { storeToRefs } from "pinia";

const langStore = useLangStore();
const { currentTranslations } = storeToRefs(langStore);
</script>

<template>
  <p>POPCON25</p>
</template>