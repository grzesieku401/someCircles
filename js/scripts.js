var container = document.querySelector(".container"),
    circletable = [],
    timerWithCircleAdding,
    timePassed = 0,
    counter= 0;

//zwroc losowy kolor
function randomColor(){
    var colorcomponents = [0,1,2,3,4,5,6,7,8,9,"a","b","c","d","e","f"],
        colortable = [];
        for (let i = 0; i < 6; i++) {
            colortable.push(colorcomponents[Math.floor(Math.random()*(colorcomponents.length))]);        
        }
    return "#"+colortable.join("");
}

//stworz okrag i dodaj do niego odpowiednie eventy
function createCircle() {
    var circle = document.createElement("div"),
        radius = Math.floor(Math.random()*(50-20)) +20;
    
    //wlasciwosci pozycj i poruszania
    circle.isfalling = 1; //czy leci na dol czy do gory
    circle.whereisgoing = Math.floor(Math.random()); //czy leci w prawo czy w lewo
    circle.velocity = Math.floor(Math.random()*(5 -1)+1);
    circle.angle = Math.floor(Math.random()*(5));
 

    //wlasciwosci wygladu
    circle.className = "circle";
    circle.style.width = radius*2+"px";
    circle.style.height = radius*2+"px";
    circle.style.borderRadius = radius+ "px"
    circle.style.background = randomColor();
    circle.style.left = window.innerWidth - radius*2 - Math.floor(Math.random()*window.innerWidth)+"px";
    circle.style.top = window.innerHeight - radius*2 - Math.floor(Math.random()*window.innerHeight)+"px";

    circle.onmouseover = function(){
        circle.style.width = parseInt(circle.style.width.replace("px",""))*1.5+"px";
        circle.style.height = parseInt(circle.style.height.replace("px",""))*1.5+"px";
        circle.style.borderRadius = parseInt(circle.style.borderRadius.replace("px",""))*1.5+"px";
};
    circle.onmouseleave = function(){
        circle.style.width = parseInt(circle.style.width.replace("px",""))/1.5+"px";
        circle.style.height = parseInt(circle.style.height.replace("px",""))/1.5+"px";
        circle.style.borderRadius = parseInt(circle.style.borderRadius.replace("px",""))/1.5+"px";
    };

    return circle;
}

//dodaj podana ilosc okregow do tablicy 
function addAllCircles(howmany) {
    for (let i = 0; i < howmany; i++) {
        circletable[i] = createCircle();
    }
}


//wszystkie potrzebne funkcje razem, obsluga dodawania okregow
function doInTime() {
    timePassed++;
    if (timePassed%20 === 0 && counter < circletable.length) {
        container.appendChild(circletable[counter]);
        counter++;
    }
    addTransformation();
}

//obsluga poruszania sie okregow
function addTransformation() {
    circletable.forEach(function(circle) {
        
        if(circle.parentNode){
            if (parseInt( circle.style.top.replace("px","")) + parseInt( circle.style.width.replace("px",""))  > window.innerHeight) {
                //console.log("zmiana na 0");
                circle.isfalling = 1;   
            }else if (parseInt( circle.style.top.replace("px","")) + parseInt( circle.style.width.replace("px","")) < parseInt( circle.style.width.replace("px","")) ) {
                    //console.log("zmiana na 1");
                circle.isfalling = 0;      
            }
    
            if (parseInt( circle.style.left.replace("px","")) + parseInt( circle.style.width.replace("px",""))  > window.innerWidth ) {
                circle.whereisgoing = 1;   
            }else if (parseInt( circle.style.left.replace("px","")) + parseInt( circle.style.width.replace("px",""))  < parseInt( circle.style.width.replace("px","")) ) {
                circle.whereisgoing = 0;
            }
    
            if (circle.isfalling == 1) {
                circle.style.top =circle.getBoundingClientRect().top-(circle.velocity) + "px";
            }else{
                circle.style.top =circle.getBoundingClientRect().top+( circle.velocity)+ "px";
            }
    
            if (circle.whereisgoing == 1) {
                circle.style.left = circle.getBoundingClientRect().left-(circle.velocity + circle.angle) +"px";
            }else{
                circle.style.left = circle.getBoundingClientRect().left+(circle.velocity + circle.angle )+"px";
            }
        }

    });    
}

addAllCircles(40); 
timerWithTransformation = window.setInterval(doInTime,20);

