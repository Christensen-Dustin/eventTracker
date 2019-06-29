function lastEntry() {
    
    var request = new XMLHttpRequest();
    
    request.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200) {
            document.getElementById("entry").innerHTML = request.responseText;
        }
    }
    request.open("GET", "/getLastEntry", true);
    request.send();
}

