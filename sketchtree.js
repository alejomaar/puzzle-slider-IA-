var pieces =[];
function preload(){
    for(var i=0;i<8;i++){
        pieces.push(loadImage('pieces/'+i+'.svg'));    
    }
}

function setup(){
    createCanvas( window.innerWidth,window.innerHeight);
    background(255,0,0);
    drawpuzzle([0,7,1],20,20);
    //image(pieces[2],0,0,20,20);
}

function drawpuzzle(values,x,y){
    //image(pieces[2],0,0,20,20);
    var w = 20,h=20;
    var currentX=x;
    var currentY=y;
    for(var x=0;x<values.length;x++){
        let currentValue = values[x];
        image(pieces[currentValue],currentX,currentY,20,20);
        currentX+=20;
    }
}