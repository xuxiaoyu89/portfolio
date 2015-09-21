portfolioControllers.controller("ProjectsCtrl",
	function($scope, $log){
		$scope.msg = "hello, these are my projects.";
		var target = document.getElementById('page-body');
		target.className = "project";
	}
);