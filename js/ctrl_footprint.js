portfolioControllers.controller("FootprintCtrl",
	function($scope, $log){
        var createHtmlELement = function (type, id, className){
            elem = document.createElement(type);
            elem.className = className;
            elem.id = id;
            return elem;
        };

        var addClickListener = function (elem) {
            elem.addListener('click', function(){
                console.log(elem.title);
                var slides = document.getElementById('slides');
                while (slides.firstChild) {
                    slides.removeChild(slides.firstChild);
                }
                var nav_dots = createHtmlELement("li", null, 'nav-dots');
                for (var i=0; i<elem.pictures; i++){
                    id = 'img-'+(i+1);
                    next = i == elem.pictures-1 ? 1:i+2;
                    prev = i == 0 ? elem.pictures:i;

                    input = createHtmlELement("input", id);
                    input.setAttribute("type", "radio");
                    input.setAttribute("name", "radio-btn");
                    if (i === 0){
                        input.setAttribute("checked", "True");
                    }
                    //input.setAttribute("checked");
                    li = createHtmlELement('li', null, "slide-container");
                    slide = createHtmlELement("div", null, "slide");
                    nav = createHtmlELement("div", null, "nav");
                    img = createHtmlELement("img", null, "image");
                    img.src = "../images/places/" + elem.title + "/" + i + ".jpg";
                    imgalign = createHtmlELement("div", null, "imgalign");
                    labelprev = createHtmlELement("label", null, "prev");
                    labelnext = createHtmlELement("label", null, "next");
                    labelprev.setAttribute("for", "img-"+prev);
                    labelprev.innerHTML = "&#x2039;";
                    labelnext.setAttribute("for", "img-"+next);
                    labelnext.innerHTML = "&#x203a;";
                    nav.appendChild(labelprev);
                    nav.appendChild(labelnext);
                    slide.appendChild(imgalign);
                    slide.appendChild(img);
                    li.appendChild(slide);
                    li.appendChild(nav);
                    slides.appendChild(input);
                    slides.appendChild(li);

                    label_id = "img-dot-"+(i+1);
                    label = createHtmlELement('label', label_id, "nav-dot");
                    label.setAttribute("for", id);
                    nav_dots.appendChild(label);
                }
                slides.appendChild(nav_dots);

                //console.log($scope.pictures);
            });
        };

		$scope.msg = "hello, welcome to my world!";
		var target = document.getElementById('page-body');
		target.className = "footprint";
        var request = new XMLHttpRequest();
        request.open("GET", "../database/places.json");
        request.send(null);
        request.onreadystatechange = function() {
            if ( request.readyState === 4 && request.status === 200 ) {
                var response = request.responseText;
                var places = JSON.parse(response).places;
                var map = new google.maps.Map(document.getElementById('map'), {
                  center: {lat: 40.1022027, lng: -98.9141507},
                  zoom: 3
                });

                for (var i=0; i < places.length; i++){
                    place = places[i];
                    //var latlng = new google.maps.LatLng(parseFloat(place.lat),parseFloat(place.lng));
                    var latLng = {lat: parseFloat(place.lat), lng: parseFloat(place.lng)};
                    var marker = new google.maps.Marker({
                        position: latLng,
                        map: map,
                        title: place.place,
                        pictures: place.pictures
                    });
                    addClickListener(marker);
                }
            }
        }
	}
);