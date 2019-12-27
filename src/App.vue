<template>
  <div id="app">
    <div class="content">
      <router-view/>
    </div>
    <!-- NOTE: スマホアプリっぽいデザインにしたいので、 navbar を下に持ってきています。 -->
    <nav class="navbar fixed-bottom navbar-expand-sm navbar-dark bg-dark">
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#nav-content"
        aria-controls="nav-content" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="nav-content">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link to="/" class="nav-link">トップ</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/items" class="nav-link">検索</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/item" class="nav-link">履歴</router-link>
          </li>
          <li class="nav-item">
            <!-- NOTE: SPA ではないページも作るつもりです。 -->
            <a class="nav-link" href="#">nonSPA</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">nonSPA2</a>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
</script>

<style>
</style>
