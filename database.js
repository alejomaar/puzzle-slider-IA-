const indexedDB =  window.indexedDB;
var Tree;
if(indexedDB){
    let db;
    const request = indexedDB.open('database',1);
    request.onsuccess=()=>{
        db = request.result;
        console.log('OPEN',db);
        ReadData();
    };
    request.onupgradeneeded =()=>{
        db = request.result;
        console.log('CREATE',db);
        const table = db.createObjectStore('Tree',{
            autoIncrement:true
        });
    }
    request.onerror =(error)=>{
        console.error(error)
    }
    function addData(data){
        const transaction = db.transaction(['Tree'],'readwrite');
        const objectStore = transaction.objectStore('Tree');
        const request = objectStore.add(data);   
    }
    function ReadData(){
        const transaction = db.transaction(['Tree'],'readonly');
        const objectStore = transaction.objectStore('Tree');
        const request = objectStore.openCursor();
        
        request.onsuccess = (e)=>{
            if(e.target.result){
                console.log(e.target.result.value);
                Tree = e.target.result.value;
            }
            //return e.target.result.value;
           
        }
    }
}