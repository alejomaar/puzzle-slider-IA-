var size=0;
var xactive=0;
var yactive=0;
var subdivitions = 8;
var puzzle;
function setup(){
    //UI preparate
    createCanvas(500,500);
    background(0,0,0);
    textSize(32);
    //Set init values 
    fillpuzzle(subdivitions);
    //Render 
    [yactive,xactive]= getIndexActive();
    squares(subdivitions,xactive,yactive);
    RandomizePuzzle(64);
   // console.log();
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
    for (var rowindex= 0; rowindex < subdivitions; rowindex++) {
        for (var colindex= 0; colindex < subdivitions; colindex++) {
            if(puzzle[rowindex][colindex]!=rowindex*subdivitions+colindex){
                return false;
            }
        }
    }
    return true;
}
function RandomizePuzzle(iterations){
    maxspace = subdivitions-1;
    //console.log("MaxSpace:"+xactive+yactive)
    lastMove = "up";
    
    for(iter=0;iter<iterations;iter++){
        console.log("iter:"+iter)
        Move = ["right","up","left","down"];
        MoveX=0;
        MoveY=0;
        Move = constrainMove(Move);
        Move =  constrainReturn(Move,lastMove);
        MoveRandom = random(Move);
        
        switch(MoveRandom){
            case "right":
                    MoveX=1;
            break;
            case "up":
                    MoveY=1;
            break;
            case "left":
                    MoveX=-1;
            break;
            case "down":
                    MoveY=-1;
            break;
        }

        Xselected= xactive+MoveX;
        Yselected= yactive+MoveY; 
        updatePaint(Xselected,Yselected);
        updateValues(Xselected,Yselected);
        lastMove = MoveRandom;
        console.log(MoveRandom); 
        
    }  
    function constrainMove(Move){
        constrain = Move;
        if(xactive==maxspace)
            Move.splice(Move.indexOf("right"),1); //Remove right movement if position is right extreme 
        if(xactive==0)
             Move.splice(Move.indexOf("left"),1);  //Remove left movement if position is left extreme
        if(yactive==maxspace)
             Move.splice(Move.indexOf("up"),1); //Remove up movement if position is up extreme 
        if(yactive==0)
            Move.splice(Move.indexOf("down"),1);  //Remove down movement if position is down extreme
        return constrain;
    }
    function constrainReturn(Move,lastMove){
        if(lastMove=="right")
            Move.splice(Move.indexOf("left"),1);
        if(lastMove=="left")
            Move.splice(Move.indexOf("right"),1);
        if(lastMove=="up")
            Move.splice(Move.indexOf("down"),1); 
        if(lastMove=="down")
            Move.splice(Move.indexOf("up"),1);
        return Move;    
             
    }
        
}

function fillpuzzle(){
    var sub = subdivitions;
    //Create empty two dimensional puzzle
    puzzle = new Array(sub)
    for (var row = 0; row < puzzle.length; row++) {
        puzzle[row] = new Array(sub);
    }
    //fill puzzle array
    for(rowindex=0;rowindex<sub;rowindex++){
        for(colindex=0;colindex<sub;colindex++){
            puzzle[rowindex][colindex]= rowindex*sub+colindex;
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
            document.getElementById("Titulo").innerHTML="Gane";
    }
}


function isNear(Xselected,Yselected){
    return Math.abs(Xselected-xactive)+Math.abs(Yselected-yactive)==1;
}

/*function draw(){
    
}*/

