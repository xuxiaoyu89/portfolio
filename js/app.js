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
		when('/Home', {
			templateUrl: 'partials/main.html',
            controller: 'MainCtrl'
		}).
		when('/Projects', {
			templateUrl: 'partials/projects.html',
			controller: 'ProjectsCtrl'
		}).
		when('/Footprint', {
			templateUrl: 'partials/footprint.html',
			controller: 'FootprintCtrl'
		}).
		otherwise({
			redirectTo: '/'
		});
	}
]);

var portfolioControllers = angular.module("portfolioControllers", []);