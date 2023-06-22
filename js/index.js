

// carousel
// let navbar = document.querySelector('.navbar');

// document.querySelector('#menu-btn').onclick = () => {
//     navbar.classList.toggle('active');
// }

// window.onscroll = () => {
//     navbar.classList.remove('active');
// }



/*famework angular js */
// 
var myApp = angular.module('myApp', ["ngRoute"]);
myApp.config(function($routeProvider) {
    $routeProvider
    .when("/", {
      templateUrl : "./views/home.html"
    })
    .when("/shop", {
      templateUrl : "./views/shop.html"
    })
    .when("/contact", {
      templateUrl : "./views/contact.html"
    })
    .when("/about", {
      templateUrl : "./views/about.html"
    })
    .when("/detail", {
      templateUrl : "./views/detail.html"
    });
  });
 myApp.run(function ($rootScope, $http) {
    $http.get("./data/data.json").then(function (response) {
        $rootScope.data = response.data.details;
        console.log($rootScope.data)
        
    });
});
// home controller
myApp.controller("homeCtrl",function($scope){
    let fade = document.querySelectorAll('.fade');
  
    let index = 0;
    
    $scope.next = function(){
        fade[index].classList.remove('show');
        index = (index+1) % fade.length;
        fade[index].classList.add('show');
        
    }
    
    $scope.prev = function(){
        fade[index].classList.remove('show');
        index = (index - 1 + fade.length) % fade.length;
        fade[index].classList.add('show');
    }
})
// shop controller
myApp.controller("shopCtrl",function($scope,$http){
// logic input range
const rangeInputs = document.querySelectorAll('input[type="range"]')

function handleInputChange(e) {
  let target = e.target
  if (e.target.type !== 'range') {
    target = document.getElementById('range')
  } 
  const min = target.min
  const max = target.max
  const val = target.value
  
  target.style.backgroundSize = (val - min) * 100 / (max - min) + '% 100%'
}

rangeInputs.forEach(input => {
  input.addEventListener('input', handleInputChange)
})


console.log("test")
let listItem = []

$scope.currentPage = 1
,$scope.numPerPage = 12
,$scope.maxSize = 5;
$http.get("./data/data.json").then(function (response) {
  listItem = response.data.details;
  $scope.data = listItem.slice(0, 12);
});


$scope.changePage = function(page){
  console.log(page)
  $scope.currentPage = page;

  
}
$scope.nextPage = function(){
  let idNextBtn = document.getElementById("next-page");

  if($scope.currentPage >=3){
  
    $scope.currentPage = 1
  }else{
    $scope.currentPage++
  }
console.log($scope.currentPage)

};
$scope.prewPage = function(){
  let idprewtBtn = document.getElementById("prew-page");
console.log($scope.currentPage);
  if($scope.currentPage <=1){
    $scope.currentPage = 3
 
  }else{ 
    $scope.currentPage--

  }
}
$scope.$watch('currentPage + numPerPage', function() {
  var begin = (($scope.currentPage - 1) * $scope.numPerPage)
  , end = begin + $scope.numPerPage;
  
  $scope.data = listItem.slice(begin, end);
});
});
// contact controller
myApp.controller("contactCtrl",function($scope){

});
// detail controller
myApp.controller("detailCtrl",function($scope){
  // get by class tag
   let contentBody = document.querySelector(".content-product-body");
   let btnDown = document.querySelector(".content-product__down");
   let btnUp = document.querySelector(".content-product__up");
// show hiden content  body Product
$scope.showContent = function(){
  contentBody.classList.remove('product-active');

  contentBody.classList.add("product-active");

  btnDown.classList.add("hiden-btn");

  btnUp.classList.remove("hiden-btn");
  btnUp.classList.add("show-btn");
};
$scope.hidenContent = function(){
  contentBody.classList.remove('product-active');

  btnDown.classList.add("show-btn");
  btnDown.classList.remove("hiden-btn");


  btnUp.classList.add("hiden-btn");
  btnUp.classList.remove("show-btn");

};
// zoom img product
// $scope.zoomIn = function() {
//   document.querySelector('.zoom-img').style.transform = 'scale(1.5)';
// }

// $scope.zoomOut = function() {
//   document.querySelector('.zoom-img').style.transform = 'scale(1)';
// }


let magnifying_area = document.getElementById("magnifying_area");
let magnifying_img = document.getElementById("magnifying_img");
magnifying_area.addEventListener("mousemove",function(event){
 let  clientX = event.clientX - magnifying_area.offsetLeft;
  let clinetY = event.clientY - magnifying_area.offsetTop;

   mWidth = magnifying_area.offsetWidth;
   mHeight = magnifying_area.offsetHeight;

   clientX = clientX/mWidth*100;
   clinetY = clinetY/mWidth*100;

magnifying_img.style.transform = 'translate(-'+  clientX+'%,-'+clinetY+'%) scale(2.5)';
});
magnifying_area.addEventListener("mouseleave",function(){
  magnifying_img.style.transform = 'translate(-50%,-50%) scale(1)';

})


});

