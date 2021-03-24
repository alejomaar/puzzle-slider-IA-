var size=0;
var xactive=0;
var yactive=0;
var subdivitions = 3;
var puzzle;
function setup(){
    createCanvas(500,500);
    background(0,0,0);
    textSize(32);
    fillpuzzle(subdivitions);
    [yactive,xactive]= getIndexActive()
    squares(subdivitions,xactive,yactive);
    
   // console.log();
}
function getIndexActive(){
    for(rowindex=0;rowindex<subdivitions;rowindex++){
        lastvalue = subdivitions*subdivitions-1;
        var indexcol = puzzle[rowindex].indexOf(lastvalue);
        if(indexcol>-1){
            return [rowindex,indexcol]
        }
    }
}



function squares(sub,xactive,yactive){
    size = width/sub;
    xnow=0;
    ynow=0;
    for(yiter=0;yiter<sub;yiter++){
        for(xiter=0;xiter<sub;xiter++){
            rect(xnow,ynow,size,size)
            xnow+=size;
        }
        xnow=0
        ynow+=size;
    }
    renderpuzzlenumbers();
    empty(xactive,yactive);
}
function checkwin(){
    //var iswin=false;
    for (var rowindex= 0; rowindex < subdivitions; rowindex++) {
        for (var colindex= 0; colindex < subdivitions; colindex++) {
            if(puzzle[rowindex][colindex]!=rowindex*subdivitions+colindex){
                return false;
            }
        }
    }
    return true;
}


function fillpuzzle(sub){
    //Fill number posibles in array
    var numbers = [];
    for (var iter = 0; iter < sub*sub; iter++) {
        numbers.push(iter);
    }
    //Create empty two dimensional puzzle
    puzzle = new Array(sub)
    for (var row = 0; row < puzzle.length; row++) {
        puzzle[row] = new Array(sub);
    }
    //fill puzzle array
    for(yiter=0;yiter<sub;yiter++){
        for(xiter=0;xiter<sub;xiter++){
            let RandNumber = random(numbers);
            let RandIndex = numbers.indexOf(RandNumber);
            numbers.splice(RandIndex,1);
            puzzle[yiter][xiter]= RandNumber;
        }
    }
    //console.log(puzzle)
}



function updateValues(Xselected,Yselected){
    [puzzle[yactive][xactive],puzzle[Yselected][Xselected]]= [puzzle[Yselected][Xselected],puzzle[yactive][xactive]]
    xactive=Xselected;
    yactive=Yselected;
}

function mouseClicked() {
    Xselected = Math.trunc(mouseX/size);
    Yselected = Math.trunc(mouseY/size);
    if(isNear(Xselected,Yselected)){
        updatePaint(Xselected,Yselected);
        updateValues(Xselected,Yselected);
        if(checkwin()==true)
            console.log("Gane");
    }
}


function isNear(Xselected,Yselected){
    return Math.abs(Xselected-xactive)+Math.abs(Yselected-yactive)==1;
}

/*function draw(){
    
}*/

