

class Node{
    constructor(data,parent=null,lastMove=null){  
        this.data = data;
        this.parent = parent;
        this.children = [];
        this.lastMove = lastMove;
        //this.sub = this.data.length;
    }
    AddBranch(depth){
        if(depth>0){
            var Move = ["right","up","left","down"];
            Move = this.data.constrainMove(Move);

            //Remove Last movement 
            if(this.parent!==null){
               // console.log("Constrain:(-)"+this.lastMove);
                Move = this.data.constrainReturn(Move,this.lastMove);
            }
            //Add childrens avaibles

            if(Move.includes("right")){
                //console.log("Depth:"+depth+" Move:Right");
                this.generateChildren(0,1,depth,"right");
            }
            if(Move.includes("up")){
                //console.log("Depth:"+depth+" Move:Up");
                this.generateChildren(1,0,depth,"up");
            }
            if(Move.includes("left")){
               // console.log("Depth:"+depth+" Move:Left");
                this.generateChildren(0,-1,depth,"left");
            }
            if(Move.includes("down")){
                ///console.log("Depth:"+depth+" Move:Down");
                this.generateChildren(-1,0,depth,"down");
            }
        }
           
    }
    generateChildren(Ymove,Xmove,depth,lastMoveChildren){
        //Copy actual puzzle
        var ChildrenCopy = Puzzle.CopyPuzzle(this.data);
        //Move puzzle to new position
        [yactive,xactive]= ChildrenCopy.activeIndex();
        ChildrenCopy.updateValues(yactive+ Ymove,xactive+Xmove);
       // console.log("Gane:"+ChildrenCopy.isObjective());
        //console.log(ChildrenCopy.puzzle);
        
        //Add to tree
        var newNode = new Node(ChildrenCopy,this,lastMoveChildren);
        this.children.push(newNode);

        /*if(ChildrenCopy.isObjective()){
            console.log("Gane");
            this.PrintRute(newNode);
        }*/

        //Generate new Childrens
        newNode.AddBranch(depth-1);     
    }

    PrintRute(NodeWinner){
        var lastMove = this.lastMove;
        var currentNode = NodeWinner;
        while(lastMove!==null){
            console.log("Mov:"+lastMove);
            currentNode= NodeWinner.parent;
            lastMove= currentNode.lastMove;
        }
    }

    constrainReturn(Move){
        if(Move.includes(this.lastMove)){
            if(this.lastMove=="right")
                Move.splice(Move.indexOf("left"),1);
            else if(this.lastMove=="left")
                Move.splice(Move.indexOf("right"),1);
            else if(this.lastMove=="up")
                Move.splice(Move.indexOf("down"),1); 
            else if(this.lastMove=="down")
                Move.splice(Move.indexOf("up"),1);
        }
        return Move;     
    }
    

    /*addchildren(data){
        var newChildren = new node(data,this);
        this.children.push(newChildren)
        return newChildren;
    }*/

}


class Puzzle{
    static CopyPuzzle(puzzle){
        var DeepCopyData = JSON.parse(JSON.stringify(puzzle.puzzle))
        return new Puzzle(puzzle.sub,DeepCopyData,puzzle.Xactive,puzzle.Yactive)
        //[...] Operator clone a puzzle array
    }
    //Multimedia hpta vida gonorrea :'v mk ya, quiero disfrutar semana santa alv
    static IdentityPuzzle(subdivition){
        var puzzle =new Puzzle(subdivition,null,subdivition-1,subdivition-1);
        puzzle.puzzle = puzzle.fillPuzzle()
        puzzle.randomizePuzzle(3);
        return puzzle;
    }

    constructor(subdivition,puzzle,Xactive,Yactive){
        this.sub = subdivition;
        this.puzzle = puzzle;
        this.Xactive = Xactive;
        this.Yactive = Yactive;
        //this.lastMove = null;
        //this.randomizePuzzle(4);   

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
        var lastMove = "up";    
        for(var iter=0;iter<iterations;iter++){
            //console.log("iter:"+iter)
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
    isObjective(){
        var puzzledata= this.puzzle;
        var puzzleIdentidad = this.fillPuzzle();
        for (var rowindex= 0; rowindex < this.sub; rowindex++) {
            for (var colindex= 0; colindex < this.sub; colindex++) {
                if(puzzledata[rowindex][colindex]!=rowindex*this.sub+colindex){
                //if(puzzledata[rowindex][colindex]!=puzzleIdentidad[rowindex][colindex]){
                    console.log("X:"+colindex+"Y:"+rowindex)
                    return false;
                }
            }
        }
        return true;
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


