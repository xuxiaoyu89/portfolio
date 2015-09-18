'use strict';

var portfolioApp = angular.module("portfolioApp", [
	'ngRoute',
	'portfolioControllers'
	 ]);

portfolioApp.config(['$routeProvider',
	function($routeProvider){
		$routeProvider.
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