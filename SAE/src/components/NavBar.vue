<script setup>

const pages = [
  { id: 1, name: 'Accueil', href: '#' },
  { id: 2, name: 'À propos', href: '#' },
  { id: 3, name: 'Services', href: '#' },
  { id: 4, name: 'Contact', href: '#' }
]
</script>

<template>
  <nav id="navBar">
    <img src="/logo-placeholder.svg" alt="Logo" width="32" height="32">
    <h1>Test</h1>
    <ul v-for="page in pages" :key="page.id">
      <li>
        <a :href="page.href">{{ page.name }}</a>
      </li>
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