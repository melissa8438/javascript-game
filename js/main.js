window.addEventListener('load', init);

var canvas;
var ctx;
//Canvas�T�C�Y��`
var SCREEN_WIDTH = 800;
var SCREEN_HEIGHT = 600;

//�݂���X���W�i�[�ϐ�
var mikanX = 0;
//�݂���Y���W�i�[�ϐ�
var mikanY = 0;

var mikanCnt = 0;

//�摜�t�@�C���ۑ��I�u�W�F�N�g
var Asset = {}

// �A�Z�b�g�̒�`
Asset.assets = [
  { type: 'image', name: 'back', src: '../assets/bluesky.png' },
  { type: 'image', name: 'box', src: '../assets/box.png' }
];

// �ǂݍ��񂾉摜
Asset.images = {};

// �A�Z�b�g�̓ǂݍ���
Asset.loadAssets = function(onComplete) {
  var total = Asset.assets.length; // �A�Z�b�g�̍��v��
  var loadCount = 0; // �ǂݍ��݊��������A�Z�b�g��

  // �A�Z�b�g���ǂݍ��ݏI��������ɌĂ΂��R�[���o�b�N�֐�
  var onLoad = function() {
    loadCount++; // �ǂݍ��݊�������1����
    if (loadCount >= total) {
        console.log('loadCount > total');
      // ���ׂẴA�Z�b�g�̓ǂݍ��݂��I�����
      onComplete();
    }
  };

  // ���ׂẴA�Z�b�g��ǂݍ���
  Asset.assets.forEach(function(asset) {
    switch (asset.type) {
      case 'image':
        Asset._loadImage(asset, onLoad);
        break;
    }
  });
};

// �摜�̓ǂݍ���
Asset._loadImage = function(asset, onLoad) {
    var image = new Image();
    image.src = asset.src;
    image.onload = onLoad;
    Asset.images[asset.name] = image;
};

/**
 * �����ݒ�
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
       //���t���[���Ppx�����Ɉړ�
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
   // �S�̂��N���A
   ctx.clearRect(0, 0, canvas.width, canvas.height);

   // �w�i��\��
  ctx.drawImage(Asset.images['back'], 0, 0);

  // �݂��񔠂�\��
  ctx.drawImage(Asset.images['box'], mikanX, mikanY);

 }

function rerender(){
    load();
}
