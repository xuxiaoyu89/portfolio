portfolioControllers.controller("AboutCtrl",
	function($scope, $log){
		$scope.msg = "hello, this is all about me!";
		var target = document.getElementById('page-body');
		target.className = "main";
	}
);