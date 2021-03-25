

class node{
    constructor(data,parent=null){  
        this.data = data;
        this.parent = parent;
        this.children = [];
        //this.sub = this.data.length;
    }
    AddBranch(){
        var Move = ["right","up","left","down"];
        Move = this.data.constrainMove(Move);
        if(Move.includes("right")){
            this.generateChildren(0,1);
        }
        if(Move.includes("up")){
            this.generateChildren(1,0);
        }
        if(Move.includes("left")){
            this.generateChildren(0,-1);
        }
        if(Move.includes("down")){
            this.generateChildren(-1,0);
        }   
    }
    generateChildren(Ymove,Xmove){
        var ChildrenCopy = Object.assign({}, this.data);
        console.log(ChildrenCopy);
        [yactive,xactive]= ChildrenCopy.activeIndex();
        //new Object with right move
        ChildrenCopy.updateValues(yactive+ Ymove,xactive+Xmove);
        this.children.push(ChildrenCopy);
    }


    /*addchildren(data){
        var newChildren = new node(data,this);
        this.children.push(newChildren)
        return newChildren;
    }*/

}


class Puzzle{
   /* static IdentityPuzzle(){

    }*/

    constructor(subdivition){
        this.sub = subdivition;
        this.puzzle = this.fillPuzzle();
        this.Xactive = subdivition-1;
        this.Yactive = subdivition-1;
        this.lastMove = null;
        this.randomizePuzzle(4);   

    }
    fillPuzzle(){
        var sub = this.sub;
        var puzzle = new Array(sub);
        for (var row = 0; row < puzzle.length; row++) {
            puzzle[row] = new Array(sub);
        }
        //fill puzzle array
        for(var rowindex=0;rowindex<sub;rowindex++){
            for(var colindex=0;colindex<sub;colindex++){
                puzzle[rowindex][colindex]= rowindex*sub+colindex;
            }
        }
        return puzzle;
    }
    randomizePuzzle(iterations){
    //console.log("MaxSpace:"+xactive+yactive)
        var lastMove = "up";    
        for(var iter=0;iter<iterations;iter++){
            console.log("iter:"+iter)
            var Move = ["right","up","left","down"];
            var MoveX=0;
            var MoveY=0;
            Move = this.constrainMove(Move);
            Move =  this.constrainReturn(Move,lastMove);
            var MoveRandom = this.random(Move);
            
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

            var Xselected= this.Xactive+MoveX;
            var Yselected= this.Yactive+MoveY; 
            console.log(MoveRandom);
            //console.log(Xselected+"/"+Yselected);
            //updatePaint(Xselected,Yselected);
            this.updateValues(Yselected,Xselected);
            lastMove = MoveRandom;
        }
    }

    constrainMove(Move){
        var constrain = Move;
        var maxspace = this.sub-1;
        if(this.Xactive==maxspace)
            Move.splice(Move.indexOf("right"),1); //Remove right movement if position is right extreme 
        if(this.Xactive==0)
             Move.splice(Move.indexOf("left"),1);  //Remove left movement if position is left extreme
        if(this.Yactive==maxspace)
             Move.splice(Move.indexOf("up"),1); //Remove up movement if position is up extreme 
        if(this.Yactive==0)
            Move.splice(Move.indexOf("down"),1);  //Remove down movement if position is down extreme
        return constrain;
    }
    constrainReturn(Move,lastMove){
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

    random(values) {
        var randomvalue = Math.floor(Math.random()*values.length)
        //console.log(randomvalue);
        return values[randomvalue];
    }


    updateValues(Yselected,Xselected){
        var X = this.Xactive;
        var Y= this.Yactive;
        //console.log("new: "+Yselected+":"+Xselected)
        //console.log("old"+this.Yactive+":"+this.Xactive)
        var Data = this.puzzle;
        [Data[Y][X], Data[Yselected][Xselected]]=[Data[Yselected][Xselected], Data[Y][X]];
        //console.log(Data);
        this.puzzle= Data;
        this.Xactive=Xselected;
        this.Yactive=Yselected;
    }

    
    activeIndex(){
        return [this.Yactive,this.Xactive]
    }

}


/*
data1 = [[1,2,3],[4,5,6],[7,8,9]]
    data10 = [[2,2,3],[4,5,6],[7,8,9]]
        data100 = [[4,2,3],[4,5,6],[7,8,9]]
        data101 = [[5,2,3],[4,5,6],[7,8,9]]
    data11 = [[3,2,3],[4,5,6],[7,8,9]]
        data110 = [[6,2,3],[4,5,6],[7,8,9]]

node1 = new node(data1);
node10 = node1.addchildren(data10);
node11 = node1.addchildren(data11);
*/


