angular.module('myApp', [])
.controller('myController', function($scope, $timeout){
	$scope.appliedStyle = "hide";
	$scope.clicked = function(){
		console.log(this);
		$timeout(function(){
			$scope.appliedStyle = "";
		}, 1500);
	};
	$scope.projects = [
	{name: "LivingRoom", link: "https://livingroom.herokuapp.com/", image: "image here"},
	{name: "Yabe", link: "https://livingroom.herokuapp.com/", image: "image here"},
	{name: "C*Splat", link: "https://csplat.herokua∫pp.com/", image: "image here"},
	{name: "TicTacToe", link: "https://tictacyo.firebaseapp.com/", image: "image here"},
	];
});
