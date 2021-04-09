const ipcRenderer = window.Electron.ipcRenderer;

// const ipc = require('electron').ipcRenderer

addGame  = document.querySelector('#addGame'),
showGame = document.querySelector('#showGame');

let myGame = document.querySelector('#myGame');

addGame.addEventListener('click', () => {
    let postGame = ipcRenderer.sendSync("post-game",{message: 'A sync message game to main'});
    myGame.innerHTML = postGame;
});


showGame.addEventListener('click', () => {
    const trucs = ipcRenderer.sendSync('fetch-games',{message:'on s en fou'})
    console.log(trucs);
    const myDivdejeu = document.createElement('div') 
    trucs.map(truc => {
        const jeu = document.createElement('h3');
        jeu.textContent = truc.jeu;
        myDivdejeu.appendChild(jeu);
        myGame.append(myDivdejeu);
    });

});



// ipcRenderer.send('post-game', { tuto: "ceci est un faux game" });

// setTimeout(() => {
//     const games = ipcRenderer.sendSync("fetch-games")
//     console.log("games", games);
// }, 2000)

// // Retrieve data from gestionGame.js
// ipcMain.on('data-game', (event, arg) => {
//     let gameJSON = JSON.parse(arg);
//     console.log(gameJSON);
//   })
