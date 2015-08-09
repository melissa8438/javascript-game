window.addEventListener('load', init);

var canvas;
var ctx;
//Canvas幅高さ定義
var SCREEN_WIDTH = 800;
var SCREEN_HEIGHT = 600;

//みかん箱横軸移動初期値設定
var mikanX = 0;
//みかん箱縦軸移動初期値設定
var mikanY = 0;

//直前の経過時間格納変数
var lastTimestamp = null;

//Asset格納オブジェクト
var Asset = {}

//ファイルタイプ、ファイル名、ファイルパス格納オブジェクト
Asset.assets = [
  { type: 'image', name: 'back', src: '../assets/bluesky.png' },
  { type: 'image', name: 'box', src: '../assets/box.png' }
];

//読込画像格納オブジェクト
Asset.images = {};

//Asset読込メソッド
Asset.loadAssets = function(onComplete) {
  var total = Asset.assets.length; //総ファイル数
  var loadCount = 0; //読込回数カウント変数

  //
  var onLoad = function() {
    loadCount++; //読込カウントインクリメント
    if (loadCount >= total) {
      // 読込完了
      onComplete();
    }
  };

  //ファイルタイプが画像の場合、画像を読み込む
  Asset.assets.forEach(function(asset) {
    switch (asset.type) {
      case 'image':
        Asset._loadImage(asset, onLoad);
        break;
    }
  });
};

//画像読み込みメソッド
Asset._loadImage = function(asset, onLoad) {
    var image = new Image();
    image.src = asset.src;
    image.onload = onLoad;
    Asset.images[asset.name] = image;
};

/**
 * 初期化
 */
 function init() {
   canvas = document.getElementById('maincanvas');
   ctx = canvas.getContext('2d');

   canvas.width = SCREEN_WIDTH;
   canvas.height = SCREEN_HEIGHT;

   Asset.loadAssets(function(){
       requestAnimationFrame(update);
   });

 }

 function update(timestamp) {
     var delta = 0;//前回フレーム時間からの経過時間(単位：秒)
     requestAnimationFrame(update);

     if(lastTimestamp != null){
         delta = (timestamp - lastTimestamp) / 1000;// ミリ秒を1000で割ると秒に
     }
     lastTimestamp = timestamp;
     //１秒ごとに100px横移動
     mikanX += 100 * delta;

     render();
 }

 function render() {
   //Canvas表示
   ctx.clearRect(0, 0, canvas.width, canvas.height);

   //背景画像表示
  ctx.drawImage(Asset.images['back'], 0, 0);

  //箱表示
  ctx.drawImage(Asset.images['box'], mikanX, mikanY);

 }
//画面再描画メソッド
function reRender(){
    window.location.reload();	//ページをリロード
}
