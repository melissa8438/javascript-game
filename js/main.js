window.addEventListener('load', init);

var canvas;
var ctx;
//Canvasサイズ定義
var SCREEN_WIDTH = 800;
var SCREEN_HEIGHT = 600;

//みかん箱X座標格納変数
var mikanX = 0;
//みかん箱Y座標格納変数
var mikanY = 0;

var mikanCnt = 0;

//画像ファイル保存オブジェクト
var Asset = {}

// アセットの定義
Asset.assets = [
  { type: 'image', name: 'back', src: '../assets/bluesky.png' },
  { type: 'image', name: 'box', src: '../assets/box.png' }
];

// 読み込んだ画像
Asset.images = {};

// アセットの読み込み
Asset.loadAssets = function(onComplete) {
  var total = Asset.assets.length; // アセットの合計数
  var loadCount = 0; // 読み込み完了したアセット数

  // アセットが読み込み終わった時に呼ばれるコールバック関数
  var onLoad = function() {
    loadCount++; // 読み込み完了数を1つ足す
    if (loadCount >= total) {
        console.log('loadCount > total');
      // すべてのアセットの読み込みが終わった
      onComplete();
    }
  };

  // すべてのアセットを読み込む
  Asset.assets.forEach(function(asset) {
    switch (asset.type) {
      case 'image':
        Asset._loadImage(asset, onLoad);
        break;
    }
  });
};

// 画像の読み込み
Asset._loadImage = function(asset, onLoad) {
    var image = new Image();
    image.src = asset.src;
    image.onload = onLoad;
    Asset.images[asset.name] = image;
};

/**
 * 初期設定
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

 function update() {
   requestAnimationFrame(update);
   mikanCnt ++;
   if(mikanCnt < 250){
       //毎フレーム１pxずつ横に移動
       mikanX ++;
       //
       mikanY ++;
   }else{
       mikanX  += 2;
       mikanY += 2;
   }
   render();
 }

 function render() {
   // 全体をクリア
   ctx.clearRect(0, 0, canvas.width, canvas.height);

   // 背景を表示
  ctx.drawImage(Asset.images['back'], 0, 0);

  // みかん箱を表示
  ctx.drawImage(Asset.images['box'], mikanX, mikanY);

 }

function rerender(){
    load();
}
