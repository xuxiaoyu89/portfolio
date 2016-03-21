portfolioControllers.controller("BlogCtrl",
	function($scope, $log){
        var changeTagColor = function(){
            //
            var nodes = document.getElementsByClassName("timeline_node");
            for (var i=0; i<nodes.length; i++){
                nodes[i].classList.remove("selected_node");
                if (nodes[i].children[0].innerHTML == $scope.curr_year) {
                    nodes[i].classList.add("selected_node");
                }
            }
        }

        var displayBlog = function() {
            var tag = $scope.tag;
            var blogs = $scope.blogs;
            var shownblogs = [];
            var years = new Set();
            var year_positions = new Map();
            var curr_position = 70;
            for (var i=0; i<blogs.length; i++) {
                if (tag === "all" || tag === blogs[i].tag){
                    blogs[i].hiddenflag = false;
                    shownblogs.push(i);
                    var curr_year = blogs[i].time.substring(0,4);
                    years.add(curr_year);
                    if (!year_positions.has(curr_year)){
                        year_positions.set(curr_year, curr_position);
                    }
                    curr_position += $scope.heights.get(i);
                }
                else{
                    blogs[i].hiddenflag = true;
                }
            }
            $scope.$apply(function(){
                $scope.blogs = blogs;
                $scope.shownblogs = shownblogs;
                $scope.years = Array.from(years);
                $scope.year_positions = year_positions;
                $scope.curr_year = $scope.years[0];
            });

            var years = document.getElementsByClassName("timeline_node");
            for (var i=0; i<years.length; i++){
                addYearClickedListener(years[i]);
            }

            changeTagColor();
        }

        var addTagClickedListener = function(elem){
            elem.addEventListener("click", function(){
                var tag = elem.children[0].innerHTML;
                $scope.$apply(function(){
                    $scope.tag = tag;
                });
                displayBlog();
            });
        };

        var addYearClickedListener = function(elem){
            elem.addEventListener("click", function(){
                var year = elem.children[0].innerHTML;
                var position = $scope.year_positions.get(year);
                document.body.scrollTop = position - 70;
            });
        };

        var addImgLoadedListener = function (elem, i) {
            elem.addEventListener("load", function(){
                //console.log(i);
                //console.log(elem.height);
                var content = elem.parentNode.nextElementSibling;
                var infos = content.nextElementSibling;

                //get the height of the whole blog;
                var head_h = 71;
                var img_h = elem.height + 20; //img + margin
                var content_h = content.offsetHeight;
                var infos_h = infos.offsetHeight;
                var margin_h = 20;
                var blog_height = head_h + img_h + content_h + infos_h + margin_h;
                //console.log(blog_height);
                $scope.heights.set(i, blog_height);
                //all images are loaded;
                if ($scope.blogs.length === $scope.heights.size){
                    displayBlog();
                    //listen to scroll event
                    window.onscroll = function(){
                        var curr_position = document.body.scrollTop;
                        //console.log(document.body.scrollTop);
                        var keys = $scope.year_positions.keys();
                        var years = [];
                        for (var key of keys){
                            years.push(key);
                        }
                        years.push(1);

                        for (var i=0; i<years.length-1; i++) {
                            //console.log(curr_position);
                            var curr_year_position = $scope.year_positions.get(years[i]) - 70;
                            var next_year_position = 1000000;
                            if ($scope.year_positions.has(years[i+1])){
                                var next_year_position = $scope.year_positions.get(years[i+1]) - 70;
                            }
                            if (curr_position > curr_year_position && curr_position < next_year_position){
                                if ($scope.curr_year !== years[i]){
                                    $scope.$apply(function (){
                                        $scope.curr_year = years[i];
                                    });
                                    changeTagColor();
                                }
                                break;
                            }
                        }
                    };
                }
            });
        };

        //ids of blogs which should be shown;
        $scope.shownblogs = [];
        //heights of the blogs; key:id, value:height
        $scope.heights = new Map();
        //key:year, value:first blog position; for click;
        $scope.year_positions = new Map();
        $scope.tag = "all";
        $scope.time = "all";

		var target = document.getElementById('page-body');
		target.className = "blog";
        var request = new XMLHttpRequest();
        request.open("GET", "../database/blogs.json");
        request.send(null);
        request.onreadystatechange = function() {
            if ( request.readyState === 4 && request.status === 200 ) {
                var response = request.responseText;
                var blogs = JSON.parse(response).blogs;
                var tags = new Set();
                var years = new Set();
                for (var i=0; i<blogs.length; i++) {
                    tags.add(blogs[i].tag);
                    years.add(blogs[i].time.substring(0,4));
                    blogs[i].showflag = "blog_show"; //show or hidden  
                }   
                $scope.$apply(function () {
                    $scope.blogs = blogs;
                    $scope.tags = Array.from(tags);
                    $scope.years = Array.from(years);
                });

                var tags = document.getElementsByClassName("tag");
                for (var i=0; i<tags.length; i++){
                    addTagClickedListener(tags[i], blogs);
                } 

                var years = document.getElementsByClassName("timeline_node");
                for (var i=0; i<years.length; i++){
                    addYearClickedListener(years[i]);
                }
                //remember the position of each blog;
                var is = document.getElementsByClassName("blog_img");
                for (var i=0; i<is.length; i++){
                    addImgLoadedListener(is[i],i);
                }
            }
        }
	}
);