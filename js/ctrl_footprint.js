portfolioControllers.controller("FootprintCtrl",
	function($scope, $log){
        var infowindow = null;
        var clearClicked = function() {
            var imgs = document.getElementsByClassName("nav_img_container");
            for (var i=0; i<imgs.length; i++){
                imgs[i].classList.remove("selected_img");
            }
        }

        var showImage = function (elem) {
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
        };

        var addClickListener = function (marker, map, place) {
            marker.addListener('click', function(){
                var latLng = marker.getPosition();
                map.setCenter(latLng);
                map.setZoom(6);
                if (infowindow) {
                    infowindow.close();
                }
                //create info windows for the marker
                var string = place.place + '<br>' + place.time + '<br>' + place.description;
                infowindow = new google.maps.InfoWindow({
                    content: string,
                    disableAutoPan: true
                });

                infowindow.open(map, marker);
                showImage(marker);
            });
        };

        var addNaviListener = function(elem, map, marker, place) {
            elem.addEventListener("click", function(){
                clearClicked();
                elem.classList.add("selected_img");
                showImage(marker);
                //center the map into the marker;
                var latLng = marker.getPosition();
                map.setCenter(latLng); 
                map.setZoom(6);
                if (infowindow) {
                    infowindow.close();
                }
                //create info windows for the marker
                var string = place.place + '<br>' + place.time + '<br>' + place.description;
                infowindow = new google.maps.InfoWindow({
                    content: string,
                    disableAutoPan: true
                });

                infowindow.open(map, marker);
            });
        }

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
                var navi = document.getElementById("placelist");
                var map = new google.maps.Map(document.getElementById('map'), {
                  center: {lat: 35.096123, lng: -180.00000},
                  zoom: 2,
                  scrollwheel: false
                });

                for (var i=0; i < places.length; i++){
                    place = places[i];
                    //var latlng = new google.maps.LatLng(parseFloat(place.lat),parseFloat(place.lng));
                    var latLng = {lat: parseFloat(place.lat), lng: parseFloat(place.lng)};
                    //create the navigator div
                    var places_navi = createHtmlELement("div", null, "places_navi");
                    var nav_img_container = createHtmlELement("div", null, "nav_img_container");
                    var imgalign = createHtmlELement("div", null, "imgalign");
                    var img = createHtmlELement("img", null, "places_navi_thumbnail");
                    img.src = "../images/places/" + place.place + "/" + 0 + ".jpg";
                    nav_img_container.appendChild(imgalign);
                    nav_img_container.appendChild(img);
                    var name = createHtmlELement("div", null, "place");
                    name.innerHTML = place.place;
                    places_navi.appendChild(nav_img_container);
                    places_navi.appendChild(name);
                    navi.appendChild(places_navi);
                    var marker_img = '../images/pin.png';
                    //create markers in google map
                    var marker = new google.maps.Marker({
                        position: latLng,
                        icon: marker_img,
                        map: map,
                        title: place.place,
                        pictures: place.pictures
                    });
                    if (i == 0){
                        showImage(marker);
                    }
                    addClickListener(marker, map, place);

                    addNaviListener(nav_img_container, map, marker, place);
                }
            }
        }
	}
);