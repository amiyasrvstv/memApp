angular.module('starter.controllers', [])


.controller('AppCtrl', function($scope, $ionicModal, $http, $interval, $timeout, $rootScope, $ionicPopup) {


$('#start__button').hide();
$('#frame').hide();
$('#frame img').addClass('blur__element');

$scope.__load = function(){
$('#load__button').removeClass('button-positive');
$('#load__button').addClass('button-royal');
$('#load__button').html('Calling APIs..');
//<----!!----->// The flickr api for random public photos is called here.

$http.get('http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?&format=json').then(function(e){
  
   var str = e.data;
   var r = str.slice(0);
   var len = r.length;
   var t = parseInt(len) - 1;
   var res = r.slice(1, t);
   var tru = JSON.parse(res);

   $rootScope.imgs = [
     {
      data: tru.items[0]['media']['m'].replace("_m", "_b")
     },
     {
      data: tru.items[1]['media']['m'].replace("_m", "_b")
     },
     {
      data: tru.items[2]['media']['m'].replace("_m", "_b")
     },
     {
      data: tru.items[3]['media']['m'].replace("_m", "_b")
     },
     {
      data: tru.items[4]['media']['m'].replace("_m", "_b")
     },
     {
      data: tru.items[5]['media']['m'].replace("_m", "_b")
     },
     {
      data: tru.items[6]['media']['m'].replace("_m", "_b")
     },
     {
      data: tru.items[7]['media']['m'].replace("_m", "_b")
     },
     {
      data: tru.items[8]['media']['m'].replace("_m", "_b")
    }];


    if($scope.imgs[0].data != null){
    $('#load__button').removeClass('button-royal');
    $('#load__button').addClass('button-balanced');
    $('#load__button').html('Loading Images..');
      var img_loaded = 0;
  $('#frame img').load( function(){
  img_loaded = img_loaded + 1;
  if(img_loaded == 9){
    $scope.enter();
  }
});
    }

}).catch(function(err){
  
  //alert('Please Tap again! The API is unreachable');
  //$('#content').html('<p>Please Tap again! The API is unreachable</p>')
  $('#spin').show();
  $scope.__load();
})

};

$scope.enter = function(){
      $('#content').hide();
      $('.new_button').hide();
      $('#frame').show();
      $('#start__button').show();
}

$scope.__start = function(){
  $scope.val = 0;
  $('#frame img').removeClass('blur__element');
  $('#start__button').hide();
  $('.progress__style').show();
  $interval(function(){ $scope.val = $scope.val + 1; }, 150);
  $timeout(function(){
    $('#find').show();
    $('.progress__style').hide();
    $('#frame img').attr('src','img/qm.png');
   $rootScope.pseudo_arr = [];
    for(var i=0;i<$rootScope.imgs.length;i++){
      $rootScope.pseudo_arr.push(i);
    }
    $scope.afterwards();
  },15000);
}

$scope.afterwards = function(){
    if($rootScope.pseudo_arr.length == 0){
      $('#find').hide();
      $ionicPopup.alert({title:'The End',template:'Congrats! You Won'});
    }
    var arr_val = $rootScope.pseudo_arr[Math.floor(Math.random()*$rootScope.pseudo_arr.length)];
    window.localStorage.setItem('token',arr_val);
    $scope.vim = $rootScope.imgs[arr_val].data;
    //$scope.tst = $rootScope.pseudo_arr;
}

$scope.getImg = function(img){
 var tok = window.localStorage.getItem('token');
 if(img == tok){
    $('#'+img).attr('src',$rootScope.imgs[img].data);
    
    for(var j = 0; j< $rootScope.pseudo_arr.length; j++){
      if($rootScope.pseudo_arr[j] == img){
        $rootScope.pseudo_arr.splice(j,1);  
      }      
    }
       
    $scope.afterwards();
 }
 else{
  alert('Wrong!');
 }
 
}
});
