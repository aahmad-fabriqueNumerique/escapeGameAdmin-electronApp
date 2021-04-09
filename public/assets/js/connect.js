
const ipcRenderer = window.Electron.ipcRenderer;

function connect(id,mdp){
    let result= ipcRenderer.sendSync("connect",{id,mdp});
    console.log (result);
    if(result == "ok") alert("vous etes connecté");
    else alert("connection refusée");
}

function disconnect(){
    ipcRenderer.sendSync("disconnect");
}

function connected(){
    return ipcRenderer.sendSync("connected");
}