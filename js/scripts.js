var container = document.querySelector(".container"),
    circletable = [],
    timerWithCircleAdding,
    timePassed = 0;
    


//zwroc losowy kolor
function randomColor(){
    var colorcomponents = [0,1,2,3,4,5,6,7,8,9,"a","b","c","d","e","f"],
        colortable = [];
        for (let i = 0; i < 6; i++) {
            colortable.push(colorcomponents[Math.floor(Math.random()*(colorcomponents.length))]);        
        }
    return "#"+colortable.join("");
}

//dodaj okrag
function addCircleToTable() {
    var circle = document.createElement("div"),
        radius = Math.round(Math.random()*(100-60)) +10;
    
    //ustaw wlasciwosci
    circle.className = "circle";
    circle.isfalling = "1";
    circle.whereisgoing = Math.round(Math.random());
    circle.style.width = radius*2+"px";
    circle.style.height = radius*2+"px";
    circle.style.borderRadius = radius+ "px"
    circle.style.background = randomColor();
    circle.style.left = Math.round(Math.random()*1000)+"px";

    circletable.push(circle);
    return circle;
}

//dodaje podana ilosc okregow do tablicy i do contener'a
function addAllCircles(howmany) {

    for (let i = 0; i < howmany; i++) {
        container.appendChild(addCircleToTable());

    }


}

function doInTime() {
    // timePassed++;
    // if (timePassed%10 === 0) {
    //     getFromTable();
    // }
    addTransformation();
}

function getFromTable(){
    if (circletable.length > 0){
        container.appendChild(circletable.pop());
    }
}

function addTransformation() {
    circletable.forEach(function(circle) {
        console.log(circle.style.left);
        if (parseInt( circle.style.top.replace("px","")) + parseInt( circle.style.width.replace("px",""))  > window.innerHeight - 10) {
            circle.falling = 0;   
       }else if (parseInt( circle.style.top.replace("px","")) + parseInt( circle.style.width.replace("px",""))  < parseInt( circle.style.width.replace("px","")) ) {
            circle.falling = 1;
       }

       if (parseInt( circle.style.left.replace("px","")) + parseInt( circle.style.width.replace("px",""))  > window.innerWidth) {
            circle.whereisgoing = 0;   
        }else if (parseInt( circle.style.left.replace("px","")) + parseInt( circle.style.width.replace("px",""))  < parseInt( circle.style.width.replace("px","")) ) {
            circle.whereisgoing = 1;
        }

        if (circle.falling == 1) {
            circle.style.top =circle.getBoundingClientRect().top+10+"px";
        }else{
            circle.style.top =circle.getBoundingClientRect().top-10+"px";
        }
        if (circle.whereisgoing == 1) {
            circle.style.left =circle.getBoundingClientRect().left+10+"px";
        }else{
            circle.style.left =circle.getBoundingClientRect().left-10+"px";
        }
    
    });    
}

addAllCircles(2); 
timerWithTransformation = window.setInterval(doInTime,100);

