portfolioControllers.controller("ProjectsCtrl",
	function($scope, $log){

		var showDiscription = function(event){
			var currElement = event.srcElement;
			var discriptions = currElement.parentNode.getElementsByClassName("project_discription");
			discriptions[0].style.display = "block";
		}

		var hideDiscription = function(event){
			var currElement = event.srcElement;
			var discriptions = currElement.parentNode.getElementsByClassName("project_discription");
			discriptions[0].style.display = "none";
		}

		$scope.msg = "hello, these are my projects.";
		var target = document.getElementById('page-body');
		target.className = "projects";
		var projects = document.getElementsByClassName('graphic_project');
		for (var i=0; i<projects.length; i++){
			projects[i].addEventListener("mouseover", showDiscription);
			projects[i].addEventListener("mouseout", hideDiscription);
		}
	}
);