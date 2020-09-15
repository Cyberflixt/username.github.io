console.clear()

const Datastore = require('nedb');
const express = require('express');
require('dotenv').config();

const app = express();
app.listen(3000, ()=> console.log('listening at 3000'));
app.use(express.static('public'));
app.use(express.json({ limit: '1mb'}));

const database = new Datastore('database.db');
database.loadDatabase();

app.get('/api',(request,response)=>{
    database.find({},(err,data)=>{
        if (err){
            response.end();
            return;
        }
        response.json(data);
    });
});

function databaseLength(){
    return new Promise(resolve => {
        database.find({},(err,data)=>{
            if (!err){
                const len = Object.keys(data).length;
                resolve(len);
            }
        });
    });
}

app.post('/api',async function(request,response){
    console.log('Server got a request :',request.body);
    
    var length = 'base value'
    length = await databaseLength()
    
    var data = request.body
    const timestamp = Date.now();
    const utcTime = new Date(timestamp).toUTCString();
    
    if (length){
        data['itemInt'] = length;
    }else{
        data['itemInt'] = 0;
    }
    data['timestamp'] = timestamp;
    data['utcTime'] = utcTime;
    
    database.insert(data);
    response.json({ 
        status : 'success',
        description : 'got aswer back !',
        data
    })
    response.end();
});


// --- \\ UTILITIES // --- \\


function tweenTxt(txt,target,del){
    function tweenA(obj,str,target,del){
        var len = str.length;
        obj.innerHTML = str
        if (len>0){
            var newval = str.substring(0,len-1);   
            setTimeout(()=>{tweenA(obj,newval,target,del)},del);
        }else{
            tweenB(obj,str,target,del);
        }
    }
    function tweenB(obj,str,target,del){
        var len = str.length;
        var tlen = target.length;
        obj.innerHTML = str
        if (len<tlen){
            var newval = target.substring(0,len+1);   
            setTimeout(()=>{tweenB(obj,newval,target,del)},del);
        }
    }
    var str1 = txt.innerHTML;
    tweenA(txt,str1,target,del);
}