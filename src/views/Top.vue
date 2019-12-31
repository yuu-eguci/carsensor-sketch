<template>
  <div class="top">
    <div class="jumbotron jumbotron-fluid text-center">
      <h1 class="display-4">Carsensor</h1>
      <p>
        <button type="button" class="btn btn-outline-primary">
          <i class="fa fa-user mr-2"></i>
          ログイン
        </button>
      </p>
    </div>
    <div class="container">
      <div class="row m-3">
        <button type="button" class="btn btn-warning btn-block text-left">
          <i class="fa fa-caret-right mr-2"></i>
          年末年始の対応について
        </button>
        <button type="button" class="btn btn-warning btn-block text-left">
          <i class="fa fa-caret-right mr-2"></i>
          サポート対象外の OS をご利用の皆さまへ
        </button>
      </div>

      <div>
        <h4 class="d-flex justify-content-between align-items-center">
          <span><i class="fa fa-search mr-2"></i> 中古車情報検索</span>
          <span class="badge badge-secondary badge-pill">517,232 台掲載中</span>
        </h4>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Top'
  }
</script>

<style>
  .jumbotron {
    color: white;
    background-image: url("https://www.carsensor.net/contents/article_images/_64593/redslatfinal.jpg");
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    height: 50vh;
    position: relative; }
    .jumbotron .bottom {
      position: absolute;
      bottom: 32px; }
</style>