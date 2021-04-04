/*
var node = new Node(puzzle);
node.DeepFirst();
*/

class Node{
    constructor(data,parent=null,lastMove=null,depth=0){  
        this.data = data;
        this.parent = parent;
        this.children = [];
        this.lastMove = lastMove;
        this.AvaibleMovements = this.getAvaibleMovements();
        this.depth = depth;
        //this.sub = this.data.length;
    }

    getAvaibleMovements(){
        //Posible movements
        var Move = ["right","up","left","down"];
        //Add constrains to movements
        Move = this.data.constrainMove(Move);       
        if(this.parent!==null){
            Move = this.data.constrainReturn(Move,this.lastMove);
        }
        return Move;
    }
    //Breadth-first search
    BFS(){
        var isWin = false,WinRoute =false;
        var depth = 0;
        var currentNodes = [this];
        var newNodes= [];
        var node,childrenNode;
        function Add(MoveTxt){
            if(node.AvaibleMovements.includes(MoveTxt)){
                [childrenNode,isWin]= node.generateChildren(node,MoveTxt);
                newNodes.push(childrenNode);
                if(isWin){
                    WinRoute = childrenNode.PrintRute(childrenNode);
                    return true;
                }
            }
            return false;
        }
        while(depth<=20 ){
           // console.log("Level:  "+depth);
            for(var i=0;i<currentNodes.length;i++){
                node = currentNodes[i];
                //console.log(node.AvaibleMovements)
                Add("right");
                if(isWin)
                    break;  
                Add("up");
                if(isWin)
                    break;  
                Add("left");
                if(isWin)
                    break;  
                Add("down");
                if(isWin)
                    break;               
            }
            if(isWin)
               break;
            
            currentNodes= newNodes;
            newNodes =[];
            depth++;
        }
        return [isWin,WinRoute]

        
    }
    //Depth-first search
    DFS(){
        var isWin = false,WinRoute =false;
        var childrenNode;
        var currentNode = this;
        var maxdepth = 50;
        while(currentNode.depth<maxdepth){
            var MoveTxt = currentNode.SelectMoveTxt();
            [childrenNode,isWin]=  currentNode.generateChildren(currentNode,MoveTxt);
            if(isWin){
                console.log("Gane");
                WinRoute= this.PrintRute(childrenNode);
                break;
            }                   
            else{
                currentNode = childrenNode;
            }
        }
        return [isWin,WinRoute];
    }
    //Deep limited search
    DLS(maxdepth){
        var isWin = false,WinRoute =false;
        var currentNode = this;
        var childrenNode;
       // var maxdepth = 10;
        while((currentNode.isExplored() && currentNode.isRoot())==false){
            //Search only one branch to the end
            while(currentNode.depth<maxdepth){
                var MoveTxt = currentNode.SelectMoveTxt();
                [childrenNode,isWin]=  currentNode.generateChildren(currentNode,MoveTxt);
                if(isWin){
                    console.log("Gane");
                    WinRoute= this.PrintRute(childrenNode);
                    break;
                }                   
                else{
                    currentNode = childrenNode;
                }
            }
            if(isWin)
                break;
            else{
                //Change of branch
                currentNode= currentNode.parent;
                //Select no branch explored
                while(currentNode.isExplored()){
                    if(currentNode.isRoot()){
                        break;
                    }
                    currentNode = currentNode.parent;
                }
            }
        } 
        return [isWin,WinRoute];    
    }
    //Iterative deepening depth-first search
    IDS(maxdepth){
        var results,newNode;
        for(var i=1;i<=maxdepth;i++){
            newNode = new Node(this.data);
            results=newNode.DLS(i);
            if(results[0])
                break;            
        }
        this.DLS(i);
        console.log(this);
        return results;
    }
    
    


    isExplored(){
        if(this.AvaibleMovements.length==0)
            return true;
        else
            return false;
    }

    isRoot(){
        if(this.parent==null)
            return true;
        else
            return false;
    }
    
    SelectMoveTxt(){
        //Select Posible movements
        var MoveSelected = this.random(this.AvaibleMovements);
        //Delete of possible movements
        this.AvaibleMovements.splice(this.AvaibleMovements.indexOf(MoveSelected),1);
        return MoveSelected;
    }

    SelectMove(MoveRandom){
        switch(MoveRandom){
            case "right":
                return [0,1];    
            case "up":
                return [1,0];   
            case "left":
                return[0,-1];   
            case "down":
                return[-1,0];   
        }
    }

    generateChildren(node,lastMoveChildren){
        var [MoveY,MoveX]= node.SelectMove(lastMoveChildren);
        //Copy actual puzzle
        var ChildrenCopy = Puzzle.CopyPuzzle(this.data);
        //Move puzzle to new position
        var [yactive,xactive]= ChildrenCopy.activeIndex();
        ChildrenCopy.updateValues(yactive+ MoveY,xactive+MoveX);
        //console.log(ChildrenCopy.puzzle);
        //Add to tree
        var newNode = new Node(ChildrenCopy,this,lastMoveChildren,node.depth+1);
        this.children.push(newNode);
        var isWin = ChildrenCopy.isObjective();
        
        return [newNode,isWin];
    }

    random(values) {
        var randomvalue = Math.floor(Math.random()*values.length)
        return values[randomvalue];
    }
    
    

    PrintRute(NodeWinner){
        var currentNode = NodeWinner;
        var Movements=[];
        while(currentNode.parent!=null){
            Movements.push(currentNode.lastMove)
            //console.log("D:"+currentNode.depth+"Move:"+ currentNode.lastMove);
            currentNode = currentNode.parent;
        }
        return Movements.reverse();
    }

    JSON(){
        var Tree = {"Level0":[]
        }

        var currentNodes = [this];
        var newNodes = [];

        var nodeObject = {};
        nodeObject["data"]= this.data.puzzle;
        nodeObject["id"]= 0;
        nodeObject["idparent"]=-1;
        Tree["Level0"].push(nodeObject)

        for(var iter=1;iter<=50;iter++){
            Tree["Level"+iter]=[]; 
            var Xindex =0; 
            //Para cada nodo en el nivel actual
            currentNodes.forEach((node,indexparent) => {
                //Para cada hijo de los nodos en el nivel actual
                node.children.forEach((children,index)=>{
                    var nodeObject = {};
                    nodeObject["data"]= children.data.puzzle;
                    nodeObject["id"]= Xindex;
                    nodeObject["idparent"]=indexparent;
                    //Add to new breadth search
                    newNodes.push(children);
                    //añadir al json
                    Tree["Level"+iter].push(nodeObject)
                    Xindex++;
                });           
            });
            if(newNodes.length==0){
                delete Tree["Level"+iter];
                break;
            }
            currentNodes = newNodes;
            newNodes=[];
        }

        //console.log(Tree);
        return Tree;
    }

   
    

}


class Puzzle{
    static CopyPuzzle(puzzle){
       // var DeepCopyData = JSON.parse(JSON.stringify(puzzle.puzzle))
        var clone = [];
        for (var i=0; i<puzzle.puzzle.length; i++) {
            clone.push( puzzle.puzzle[i].slice(0));
        }
        return new Puzzle(puzzle.sub,clone,puzzle.Xactive,puzzle.Yactive)
        //[...] Operator clone a puzzle array
    }
    //Multimedia
    static IdentityPuzzle(subdivition){
        var puzzle =new Puzzle(subdivition,null,subdivition-1,subdivition-1);
        puzzle.puzzle = puzzle.fillPuzzle()
        puzzle.randomizePuzzle(10);
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
                    //console.log("X:"+colindex+"Y:"+rowindex)
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


