<template>
  <div class="top">

    <div class="jumbotron jumbotron-fluid jumbotron-bg-img text-center">
      <h1 class="display-4">Carsensor</h1>
      <p>
        <button type="button" class="btn btn-outline-primary">
          <i class="fa fa-user mr-2"></i>
          ログイン
        </button>
      </p>
    </div>

    <div class="container" style="margin-bottom: 60px;">
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

      <hr class="mb-4" />

      <div class="m-3 mb-4">
        <h4 class="d-flex justify-content-between align-items-center">
          <span><i class="fa fa-search mr-2"></i> 中古車情報検索</span>
          <span class="badge badge-secondary badge-pill">517,232 台掲載中</span>
        </h4>
      </div>

      <div class="m-3 mb-4">
        <h5>フリーワード<small>で検索</small></h5>
        <div class="input-group">
          <div class="input-group-prepend">
            <span class="input-group-text"><i class="fa fa-search"></i></span>
          </div>
          <input type="text" class="form-control" placeholder="車名、販売店名などで中古車検索">
        </div>
      </div>

      <div class="m-3 mb-4">
        <h5>検索履歴</h5>
        <div class="list-group">
          <a href="#" class="list-group-item list-group-item-action chevron-right">
            スズキ アルトラパン 青森県 ～50万円
          </a>
          <a href="#" class="list-group-item list-group-item-action chevron-right">
            キャンピングカー
          </a>
          <a href="#" class="list-group-item list-group-item-action chevron-right">
            スズキ アルトラパン
          </a>
          <a href="#" class="list-group-item list-group-item-action chevron-right">
            Rターボ
          </a>
        </div>
      </div>

      <div class="m-3 mb-4">
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
          <div class="tab-pane fade show active" id="item1" role="tabpanel" aria-labelledby="item1-tab">
            <div class="row m-3">
              <div class="col-3 text-center">
                <a href="#">
                  <img src="../assets/img/logo.png" class="img-thumbnail">
                  レクサス
                </a>
              </div>
              <div class="col-3 text-center">
                <a href="#">
                  <img src="../assets/img/logo.png" class="img-thumbnail">
                  トヨタ
                </a>
              </div>
              <div class="col-3 text-center">
                <a href="#">
                  <img src="../assets/img/logo.png" class="img-thumbnail">
                  ホンダ
                </a>
              </div>
              <div class="col-3 text-center">
                <a href="#">
                  <img src="../assets/img/logo.png" class="img-thumbnail">
                  日産
                </a>
              </div>
              <div class="col-3 text-center">
                <a href="#">
                  <img src="../assets/img/logo.png" class="img-thumbnail">
                  スズキ
                </a>
              </div>
              <div class="col-3 text-center">
                <a href="#">
                  <img src="../assets/img/logo.png" class="img-thumbnail">
                  ダイハツ
                </a>
              </div>
              <div class="col-3 text-center">
                <a href="#">
                  <img src="../assets/img/logo.png" class="img-thumbnail">
                  輸入車<br>すべて
                </a>
              </div>
            </div>
          </div>
          <div class="tab-pane fade" id="item2" role="tabpanel" aria-labelledby="item2-tab">
            <div class="row m-3">
              <div class="col-4 text-center">
                <a href="#">
                  <img src="../assets/img/logo.png" class="img-thumbnail">
                  軽自動車
                </a>
              </div>
              <div class="col-4 text-center">
                <a href="#">
                  <img src="../assets/img/logo.png" class="img-thumbnail">
                  コンパクトカー
                </a>
              </div>
              <div class="col-4 text-center">
                <a href="#">
                  <img src="../assets/img/logo.png" class="img-thumbnail">
                  SUV・クロカン
                </a>
              </div>
              <div class="col-4 text-center">
                <a href="#">
                  <img src="../assets/img/logo.png" class="img-thumbnail">
                  ミニバン
                </a>
              </div>
              <div class="col-4 text-center">
                <a href="#">
                  <img src="../assets/img/logo.png" class="img-thumbnail">
                  ハッチバック
                </a>
              </div>
              <div class="col-4 text-center">
                <a href="#">
                  <img src="../assets/img/logo.png" class="img-thumbnail">
                  セダン
                </a>
              </div>
              <div class="col-4 text-center">
                <a href="#">
                  <img src="../assets/img/logo.png" class="img-thumbnail">
                  ステーションワゴン
                </a>
              </div>
            </div>
          </div>
          <div class="tab-pane fade" id="item3" role="tabpanel" aria-labelledby="item3-tab">
            未実装
          </div>
        </div>
      </div>

      <hr class="mb-4" />

      <div class="m-3 mb-4">
        <h4>
          <i class="fa fa-hand-o-up"></i> カーセンサーアフター保証
        </h4>
      </div>

      <div class="jumbotron jumbotron-fluid">
        <div class="container">
          <h5 class="display-5">
            <span class="ml-5">業界最高水準</span><br>
            <span class="ml-5">万が一の際にも修理費0円</span>
          </h5>
          <p>
            カーセンサーアフター保証とは、購入後の不安を安心に変える、中古車専用のおすすめ補償制度です。<br>
            一台一台さまざまな状態の中古車だからこそ、業界最多水準の補償範囲とわかりやすい価格設定で安心の保証をご用意しました。
          </p>
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
  .jumbotron.jumbotron-bg-img {
    color: white;
    background-image: url("https://www.carsensor.net/contents/article_images/_64593/redslatfinal.jpg");
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    height: 50vh;
    position: relative; }

  .list-group-item.chevron-right:after {
    font-family: FontAwesome;
    content: "\f105";
    float: right; }
</style>