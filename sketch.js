var size=0; //grafica
var xactive=0;
var yactive=0;
var subdivitions = 4;
var puzzle;
function setup(){
    puzzle =  Puzzle.IdentityPuzzle(subdivitions);
    //UI preparate
    createCanvas(500,500);
    background(0,0,0);
    textSize(32);
    //Render 
    squares(subdivitions,puzzle.Xactive,puzzle.Yactive);
}
function getIndexActive(){
    lastIndex = subdivitions-1;
    //console.log(lastIndex)
    return [lastIndex,lastIndex]
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
    var puzzledata= puzzle.puzzle;
    for (var rowindex= 0; rowindex < subdivitions; rowindex++) {
        for (var colindex= 0; colindex < subdivitions; colindex++) {
            if(puzzledata[rowindex][colindex]!=rowindex*subdivitions+colindex){
                return false;
            }
        }
    }
    return true;
}


function mouseClicked() {
    Xselected = Math.trunc(mouseX/size);
    Yselected = Math.trunc(mouseY/size);
    if(isNear(Xselected,Yselected)){
        console.log("ismove")
        updatePaint(Yselected,Xselected);
        puzzle.updateValues(Yselected,Xselected);
        if(checkwin()==true)
            document.getElementById("Titulo").innerHTML="Gane";
    }
}


function isNear(Xselected,Yselected){
    [yactive,xactive]= puzzle.activeIndex();
    return Math.abs(Xselected-xactive)+Math.abs(Yselected-yactive)==1;
}

/*
node = new Node(puzzle)
node.AddBranch(2);
*/


