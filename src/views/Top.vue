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

      <div class="mb-3">
        <h4 class="d-flex justify-content-between align-items-center">
          <span><i class="fa fa-search mr-2"></i> 中古車情報検索</span>
          <span class="badge badge-secondary badge-pill">517,232 台掲載中</span>
        </h4>
      </div>

      <div class="mb-3">
        <h5>フリーワード<small>で検索</small></h5>
        <div class="input-group">
          <div class="input-group-prepend">
            <span class="input-group-text"><i class="fa fa-search"></i></span>
          </div>
          <input type="text" class="form-control" placeholder="車名、販売店名などで中古車検索">
        </div>
      </div>

      <div class="mb-3">
        <h5>こだわり条件<small>で検索</small></h5>
        <ul class="nav nav-tabs justify-content-around" role="tablist">
          <li class="nav-item">
            <a class="nav-link active" id="item1-tab" data-toggle="tab" href="#item1" role="tab" aria-controls="item1" aria-selected="true">
              メーカー検索
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" id="item2-tab" data-toggle="tab" href="#item2" role="tab" aria-controls="item2" aria-selected="false">
              車のタイプ検索
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" id="item3-tab" data-toggle="tab" href="#item3" role="tab" aria-controls="item3" aria-selected="false">
              複数条件検索
            </a>
          </li>
        </ul>
        <div class="tab-content">
          <div class="tab-pane fade show active" id="item1" role="tabpanel" aria-labelledby="item1-tab">This is a text of item#1.</div>
          <div class="tab-pane fade" id="item2" role="tabpanel" aria-labelledby="item2-tab">This is a text of item#2.</div>
          <div class="tab-pane fade" id="item3" role="tabpanel" aria-labelledby="item3-tab">This is a text of item#3.</div>
        </div>
      </div>

      <div class="mb-3">
        <h5>検索履歴</h5>
        <div class="list-group">
          <a href="#" class="list-group-item list-group-item-action">
            スズキ アルトラパン 青森県 ～50万円
          </a>
          <a href="#" class="list-group-item list-group-item-action">
            キャンピングカー
          </a>
          <a href="#" class="list-group-item list-group-item-action">スズキ アルトラパン</a>
          <a href="#" class="list-group-item list-group-item-action">Rターボ</a>
        </div>
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

  .list-group .list-group-item:after {
    font-family: FontAwesome;
    content: "\f105";
    float: right; }
</style>