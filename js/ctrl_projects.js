portfolioControllers.controller("ProjectsCtrl",
	function($scope, $log){
		$scope.msg = "hello, these are my projects.";
		var target = angular.element('#page-body');
		target.className += "other";
	}
);