
async function getData(){
    const res = await fetch('/api');
    const data = await res.json();
    
    const root = document.createElement('ol');
    document.body.append(root);
    for (item of data) {
        const root1 = document.createElement('li');
        const root2 = document.createElement('ul');
        const br = document.createElement('br');
        
        const int = document.createElement('div');
        int.textContent = `Item ${item.itemInt}`;
        const v = document.createElement('li');
        v.textContent = `Version: ${item.version}`;
        const date = document.createElement('li');
        date.textContent = `Utc time: ${item.utcTime}`;
        
        root2.append(br,int,v,date);
        root1.append(root2);
        root.append(root1);
      }
}
getData();
