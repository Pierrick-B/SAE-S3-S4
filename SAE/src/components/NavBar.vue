<template>
  <nav id="navBar">
    <h1>Test</h1>
    <ul>
      <li><a href="#">Page 1</a></li>
      <li><a href="#">Page 2</a></li>
      <li><a href="#">Page 3</a></li>
    </ul>
  </nav>
</template>

<script setup>
const props = defineProps({
  title: String
})
</script>

<style scoped>
#navBar{
  background: aqua;
  width: 100%;
}
#navBar ul li{
  background: red;
  display: inline-block;
}
</style>