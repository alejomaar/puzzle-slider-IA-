
var sub;
var size;



function setup(){
    setTimeout(function(){
        if(NotExcessNodes()){    
            console.log("Segundo");
            sub = Tree.Level0[0].data.length;
            size= 20*sub;
            widthWindow = window.innerWidth;
            heightWindow =window.innerHeight;
            if(MaxWidth()>widthWindow)
                widthWindow= MaxWidth();
            if(MaxHeight()>heightWindow)
                heightWindow= MaxHeight();

            createCanvas( widthWindow,heightWindow);
            background(255,255,255);
            drawTree();     
        }else{
            console.log("Lo sentimos, son demasiados nodos :(")
        }
    }, 2000);
        
    
    
}
function MaxWidth(){
    var MaxWidth= 0;
    Object.keys(Tree).forEach(key => {
        if(Tree[key].length>MaxWidth)
            MaxWidth=Tree[key].length;
    });
    return MaxWidth*size*1.1;
}
function MaxHeight(){
    return Object.keys(Tree).length*size*1.5;
}
function NotExcessNodes(){
    var NumberNodes = 0;
    Object.keys(Tree).forEach(key => {
        NumberNodes+=Tree[key].length;
    });
    if(NumberNodes<450)
        return true;
    else
        return false;
}

function drawTree(){
    var y=20;
    var parentKey=null;
    var lastMargin=Infinity;

    Object.keys(Tree).forEach(key => {
        var NodesNumber = Tree[key].length;    
        var Margin = (width-NodesNumber*size)/(NodesNumber+1);
        if(Margin>lastMargin)
            Margin=lastMargin;           
        var x= Margin;
        console.log(key);
        Tree[key].forEach((nodeInThisDepth,index)=>{
           //console.log(nodeInThisDepth.id+"I:"+nodeInThisDepth.idparent);
           drawpuzzle(nodeInThisDepth.data,x,y);
           drawConnections(x,y,nodeInThisDepth,parentKey)
           x+=Margin+size;
        });
        y+=size*1.5;
        parentKey =  key;
        lastMargin= Margin;
        
        //console.log("A:"+AvaibleSpace+"M:"+Margin);
        //console.log( Tree[key]);
    });
    console.log("finish");
}

//Up flow connections
function drawConnections(xi, yi,node,lastKey){
    if(lastKey!=null){
        let idparent =node.idparent;
        let lengthLastLevel = Tree[lastKey].length;
        let MarginLast = (width-lengthLastLevel*size)/(lengthLastLevel+1);
        let xf = (idparent+1)*MarginLast+idparent*size;
        let yf = yi-size*0.5;
       // strokeWeight(1);
        //stroke(0,0,0);
        line(xi+size*0.5,yi, xf+size*0.5, yf);
    }
}

function drawpuzzle(values,x,y){
    textAlign(CENTER);
    let currentX=x;
    let currentY=y;
    let KeyValue = sub*sub-1
    for(var yiter=0;yiter<values.length;yiter++){
        //currentX=x;
        for(var xiter=0;xiter<values.length;xiter++){
            let currentValue = values[yiter][xiter];
            if(currentValue== KeyValue){
                rect( currentX,currentY, 20, 20);
            }else{
                fill(color('white'));
                rect( currentX,currentY, 20, 20);
                fill(color('black'));
                text(currentValue, currentX+10, currentY+15);
            }
            currentX+=20;
        }   
        currentX=x; 
        currentY+=20;
    }
}

function black(x,y){
    
}

function white(x,y,value){
    
}

