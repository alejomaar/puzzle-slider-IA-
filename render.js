function renderpuzzlenumbers(){
    fill(color('black')); 
    puzzle.puzzle.forEach((row,rowindex )=> {
        row.forEach((value,columnindex)=>{
            RenderNumber(value,rowindex,columnindex);
        })
    });
}
function updatePaint(Yselected,Xselected){
    [yactive,xactive]= puzzle.activeIndex();
    Noempty(xactive,yactive);
    empty(Xselected,Yselected);
    RenderNumber(puzzle.puzzle[Yselected][Xselected],yactive,xactive);
}

function RenderNumber(value,rowindex,columnindex){
    ypos = rowindex*size+size*0.5*1.2;
    xpos = columnindex*size +centertext(value);
    text(value,xpos,ypos)
}
function centertext(text){
    return (size - textWidth(text))*0.5
}


function empty(xactive,yactive){
    fill(0, 0, 0);
    rect(xactive*size,yactive*size,size,size)
}
function Noempty(xactive,yactive){
    fill(255, 255,2555);
    rect(xactive*size,yactive*size,size,size)
}




