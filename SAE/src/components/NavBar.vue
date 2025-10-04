<script setup>
const props = defineProps({
  title: String
})
</script>

<template>
  <nav id="navBar">
    <img src="/logo-placeholder.svg" alt="Logo" width="32" height="32">
    <h1>Test</h1>
    <ul>
      <li><a href="#">Page 1</a></li>
      <li><a href="#">Page 2</a></li>
      <li><a href="#">Page 3</a></li>
    </ul>
  </nav>
</template>

<style>
body{
  margin: 0;

}
</style>

<style scoped>
#navBar{
  background: aqua;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
}
#navBar ul li{
  background: red;
  display: inline-block;
}
h1{
  padding: 0;
  margin: 0;
}
</style>