var size=0; //grafica
var subdivitions;
var puzzle;

function setup(){
    subdivitions= 3;
    puzzle =  Puzzle.IdentityPuzzle(subdivitions);
    //UI preparate
    var MyCanvas= createCanvas(500,500);
    MyCanvas.parent("puzzle");
    background(0,0,0);
    textSize(32);
    //Render 
    squares(subdivitions,puzzle.Xactive,puzzle.Yactive);
}

function redrawSetup(){
    subdivitions= parseInt(document.getElementById("PuzzleSize").value);
    puzzle =  Puzzle.IdentityPuzzle(subdivitions);
    background(0,0,0);
    fill(color('white'));
    squares(subdivitions,puzzle.Xactive,puzzle.Yactive);
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

function AutoResolve(node,movementsTxt){
    var indexMove=0;
    //Update the interfaz with the solution movements
    var timer = setInterval(()=>{
        //Get active and actual move
        [yactive,xactive]= puzzle.activeIndex();
        [MoveY,MoveX] = node.SelectMove(movementsTxt[indexMove]);
        console.log("Active:",yactive,xactive)
        //console.log(yactive+MoveY,xactive+MoveX)
        //Update data and interfax
        updatePaint(yactive+MoveY,xactive+MoveX);
        puzzle.updateValues(yactive+MoveY,xactive+MoveX);
        //Finish operation when index is last
        if(indexMove>=movementsTxt.length-1){
            document.getElementById("Mensaje").innerHTML="Mensaje: Victoria";
            clearInterval(timer);
        }
        indexMove++;
    },500)

    
    
}


function mouseClicked() {
    Xselected = Math.trunc(mouseX/size);
    Yselected = Math.trunc(mouseY/size);
    CanvasLimitX = mouseX>0 && mouseX<width;
    CanvasLimitY = mouseY>0 && mouseY<height;
    CanvasLimit = CanvasLimitX&&CanvasLimitY;
    if(isNear(Xselected,Yselected) && CanvasLimit){
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





