'use strict';

var portfolioApp = angular.module("portfolio", [
	'ng-route',
	'portfolioControllers'
	 ]);

portfolioApp.config(['$routeprovider',
	function($routeprovider){
		$routeprovider.
		when('/', {
			templateUrl: 'partials/main.html',
            controller: 'MainCtrl'
		}).
		otherwise({
			redirectTo: '/'
		});
	}
]);

var portfolioControllers = angular.module("portfolioControllers", []);