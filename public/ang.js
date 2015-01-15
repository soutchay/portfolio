angular.module('myApp', [])
.controller('myController', function($scope){
	$scope.appliedStyle = "hide";
	$scope.clicked = function(){
		console.log('clicked');
		$scope.appliedStyle = "";
	};
	$scope.projects = [
	{name: "LivingRoom", link: "https://livingroom.herokuapp.com/", image: "image here"},
	{name: "Yabe", link: "https://livingroom.herokuapp.com/", image: "image here"},
	{name: "C*Splat", link: "https://csplat.herokuapp.com/", image: "image here"},
	{name: "TicTacToe", link: "https://tictacyo.firebaseapp.com/", image: "image here"},
	];
});
