<template>
  <div id="app">
    <ul class="navigation">
      <li><router-link to="/">トップ</router-link></li>
      <li><router-link to="/items">一覧</router-link></li>
      <li><router-link to="/item">詳細</router-link></li>
    </ul>
    <div class="content">
      <router-view/>
    </div>
  </div>
</template>

<script>
</script>

<style>
</style>
