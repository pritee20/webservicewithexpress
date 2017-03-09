var ngApp = angular.module('ngApp', []); 

ngApp.controller('mainController',['$scope', '$http', function($scope, $http){
	$scope.data = [];
	$scope.dataObj = {
		title: ''
	};

	// when landing on the page, get all data and show them
	$http.get('/api/books').success(function(data){
		$scope.data = data;
		console.log(data);
	}).error(function(data){
		console.log("Error"+ ' ' + data);
	});

	$scope.createData = function(){

		var dataObj = {
			title: $scope.dataObj.title
		};
		$scope.dataObj = dataObj;
		$http.post('/api/books', dataObj).success(function(data){
			$scope.data = data;
			$scope.dataObj.title = '';
			
		}).error(function(data){
			console.log("Error" + ' ' + data);
		});
	};
}]);

