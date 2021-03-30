var pieces =[];
var black;
function preload(){
    for(var i=0;i<8;i++){
        pieces.push(loadImage('pieces/'+i+'.svg'));    
    }
    black= loadImage('pieces/black.svg')
}

function setup(){
    createCanvas( window.innerWidth,window.innerHeight);
    background(255,0,0);
    drawTree();
    //drawpuzzle([[0,7,1],[2,3,4],[5,6,8]],20,20);
}

function drawTree(){
    var y=20;
    var parentKey=null;
    Object.keys(Tree).forEach(key => {
        var NodesNumber = Tree[key].length;
        //var SpentSpace =NodesNumber*60;
        //var AvaibleSpace = width-SpentSpace;
        //var Margin = AvaibleSpace/(NodesNumber+1);
        var Margin = (width-NodesNumber*60)/(NodesNumber+1);
        var x= Margin;
        
        
        Tree[key].forEach((nodeInThisDepth,index)=>{
           //console.log(nodeInThisDepth.id+"I:"+nodeInThisDepth.idparent);
           drawpuzzle(nodeInThisDepth.data,x,y);
           drawConnections(x,y,nodeInThisDepth,parentKey)
           x+=Margin+60;
        });
        y+=90;
        parentKey =  key;
        //console.log("///");
        //console.log("A:"+AvaibleSpace+"M:"+Margin);
        //console.log( Tree[key]);
    });
}

//Up flow connections
function drawConnections(xi, yi,node,lastKey){
    if(lastKey!=null){
        var idparent =node.idparent;
        var lengthLastLevel = Tree[lastKey].length;
        var MarginLast = (width-lengthLastLevel*60)/(lengthLastLevel+1);
        var xf = (idparent+1)*MarginLast+idparent*60;
        var yf = yi-30;
        strokeWeight(4);
        stroke(0,0,0);
        line(xi+30,yi, xf+30, yf);
    }
}

function drawpuzzle(values,x,y){
    //image(pieces[2],0,0,20,20);
    var w = 20,h=20;
    var currentX=x;
    var currentY=y;
    for(var yiter=0;yiter<values.length;yiter++){
        //currentX=x;
        for(var xiter=0;xiter<values.length;xiter++){
            let currentValue = values[yiter][xiter];
            if(currentValue==8){
                image(black,currentX,currentY,20,20);
            }else{
                image(pieces[currentValue],currentX,currentY,20,20);
            }
           //console.log("x:"+currentX+"y:"+currentY+"$:"+currentValue)
            currentX+=20;
        }   
        currentX=x; 
        currentY+=20;
    }
}

function mousePressed() {
    console.log("X:"+mouseX);
}