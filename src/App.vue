<template>
  <div id="app">
    <div class="content">
      <router-view/>
    </div>
    <!-- NOTE: nav-bar は App.vue でいいのかな? -->
    <!-- NOTE: スマホアプリっぽいデザインにしたいので、 navbar を下に持ってきています。 -->
    <nav class="navbar fixed-bottom navbar-expand navbar-dark bg-dark">
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#nav-content"
        aria-controls="nav-content" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <!-- NOTE: 左右を空けて等間隔にするため justify-content-around をつけ、全 nav-item に navbar-nav を割り振っています。 -->
      <div class="collapse navbar-collapse justify-content-around" id="nav-content">
        <ul class="navbar-nav">
          <li class="nav-item active">
            <router-link to="/" class="nav-link">
              <i class="fa fa-home"></i>
              トップ
            </router-link>
          </li>
        </ul>
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link to="/items" class="nav-link">
              <i class="fa fa-search"></i>
              検索
            </router-link>
          </li>
        </ul>
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link to="/item" class="nav-link">
              <i class="fa fa-history"></i>
              履歴
            </router-link>
          </li>
        </ul>
        <ul class="navbar-nav">
          <li class="nav-item">
            <!-- NOTE: SPA ではないページも作るつもりです。 -->
            <a class="nav-link" href="#">
              <i class="fa fa-address-card"></i>
              nonSPA
            </a>
          </li>
        </ul>
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link" href="#">
              <i class="fa fa-bars"></i>
              nonSPA2
            </a>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
</script>

<style>
  /* icon + text リンクのための style です。 */
  .nav-link {
    text-align:center;
    display:table-cell;
    padding: 0; }
    .nav-link .fa {
      display:block;
      font-size:20px; }
</style>
