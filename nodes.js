class node{
    constructor(data,parent=null){  
        this.data = data;
        this.parent = parent;
        this.children = [];
        this.sub = this.data.length;
    }
    addchildren(data){
        var newChildren = new node(data,this);
        this.children.push(newChildren)
        return newChildren;
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


