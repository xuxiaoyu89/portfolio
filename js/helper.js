function redirect(elem) {
    var dirs = document.getElementsByClassName("direction");
    for (var i=0; i<dirs.length; i++){
        dirs[i].classList.remove("selected_dir");
    }
    elem.classList.add("selected_dir");
}


var createHtmlELement = function (type, id, className){
    elem = document.createElement(type);
    elem.className = className;
    elem.id = id;
    return elem;
};

var tagClicked = function (elem) {
    var tags = document.getElementsByClassName("tag");
    for (var i=0; i<tags.length; i++){
        tags[i].classList.remove("selected_tag");
    }
    elem.classList.add("selected_tag");
}

var nodeClicked = function (elem) {
    var nodes = document.getElementsByClassName("timeline_node");
    for (var i=0; i<nodes.length; i++){
        nodes[i].classList.remove("selected_node");
    }
    elem.classList.add("selected_node");
}
