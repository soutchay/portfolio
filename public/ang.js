angular.module('myApp', [])
.controller('myController', function($scope){
	$scope.clicked = function(){
		console.log('clicked');
	}
	$scope.style = "test";
})