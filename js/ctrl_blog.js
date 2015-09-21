portfolioControllers.controller("BlogCtrl",
	function($scope, $log){
		$scope.msg = "hello, this is my blog";
		var target = document.getElementById('page-body');
		target.className = "other";
	}
);