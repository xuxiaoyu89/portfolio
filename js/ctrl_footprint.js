portfolioControllers.controller("FootprintCtrl",
	function($scope, $log){
		$scope.msg = "hello, welcome to my world!";
		var target = document.getElementById('page-body');
		target.className = "footprint";
	}
);