// counter code
var button = document.getElementById("counter");

button.onclick = function(){
    
    // create the request
    var request = new XMLHttpRequest();
    
    request.onreadystatechange = function(){
        if(request.readystate === XMLHttpRequest.DONE){
            // take some action
            
            if(request.status == 200){
                var counter = request.respinseText ;
                var span = document.getElementById("count");
                span.innerHTML = counter.toString();
            }
            
        }
        // if not done
    };
    
    // make the request
    request.open('GET','http://kanishk25.imad.hasura-app.io/counter', true);
    request.send(null);
};