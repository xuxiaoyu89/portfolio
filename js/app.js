'use strict';

var portfolioApp = angular.module("portfolioApp", [
	'ngRoute',
	'portfolioControllers'
	 ]);

portfolioApp.config(['$routeProvider',
	function($routeProvider){
		$routeProvider.
		when('/Home', {
			templateUrl: 'partials/main.html',
            controller: 'MainCtrl'
		}).
		when('/Projects', {
			templateUrl: 'partials/projects.html',
			controller: 'ProjectsCtrl'
		}).
		otherwise({
			redirectTo: '/'
		});
	}
]);

var portfolioControllers = angular.module("portfolioControllers", []);