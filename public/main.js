
async function fpost(){
    const timestamp = Date.now();
    const version = 1
    const localTime = new Date(timestamp).toLocaleTimeString();
    const data = {version,timestamp,localTime};
    const options = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    };
    const res = await fetch('/api',options);
    const json = await res.json();
    console.log(json);
}
fpost()
