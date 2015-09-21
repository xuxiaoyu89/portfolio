portfolioControllers.controller("ContactCtrl",
	function($scope, $log){
		$scope.msg = "hello, this is my contact info!";
		var target = document.getElementById('page-body');
		target.className = "main";
	}
);