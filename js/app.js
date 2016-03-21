'use strict';

var portfolioApp = angular.module("portfolioApp", [
	'ngRoute',
	'portfolioControllers'
	 ]);

portfolioApp.config(['$routeProvider',
	function($routeProvider){
		$routeProvider.
		when('/', {
			templateUrl: 'partials/about.html',
            controller: 'AboutCtrl'
		}).
		when('/About', {
			templateUrl: 'partials/about.html',
            controller: 'AboutCtrl'
		}).
		when('/Projects', {
			templateUrl: 'partials/projects.html',
			controller: 'ProjectsCtrl'
		}).
		when('/Footprint', {
			templateUrl: 'partials/footprint.html',
			controller: 'FootprintCtrl'
		}).
		when('/Blog', {
			templateUrl: 'partials/blog.html',
			controller: 'BlogCtrl'
		}).
		when('/Contact', {
			templateUrl: 'partials/contact.html',
			controller: 'ContactCtrl'
		}).
		otherwise({
			redirectTo: '/'
		});
	}
]);

var portfolioControllers = angular.module("portfolioControllers", []);