const APIUrl = "https://gruppe12.toni-barth.com/";
const playersURL = "https://gruppe12.toni-barth.com/players/";
const gamesURL = "https://gruppe12.toni-barth.com/games/";

export async function reset(){
    let response = await fetch("https://gruppe12.toni-barth.com/reset/",{
        method: "DELETE"
    }
    ).then(
        (response) => response.json()
    ).catch(ex => {
        console.error(ex)
    });

    return await response;
}

export async function fetchGames() {
    return fetchSomething(gamesURL);
}

export async function fetchGame(id){
    return fetchSomething(gamesURL + id);
}

export async function fetchPlayers() {
    return fetchSomething(playersURL);
}

export async function postPlayer(name, controllable){
    let response = await fetch(playersURL,{
        method: "POST",
        body: JSON.stringify({
            "name":name,
            "controllable":controllable
            }
        ),
        headers: {'Content-Type':'application/json'}
    }
    ).then(
        (response) => response.json()
    ).then(
        (player) => {return player}
    ).catch(ex => {
        console.error(ex)
    });

    return await response;
}

export async function postGame(squares, players){
    let response = await fetch(gamesURL,{
        method: "POST",
        body: JSON.stringify({
            "maxTurnTime":60000,
            "players":players,
            "board":{
                "gameSizeRows":10,
                "gameSizeColumns":10,
                "squares":[
                    [-1, -1, -1, 0, -1, -1, 0, -1, -1, -1],
                    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
                    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
                    [0, -1, -1, -1, -1, -1, -1, -1, -1, 0],
                    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
                    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
                    [1, -1, -1, -1, -1, -1, -1, -1, -1, 1],
                    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
                    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
                    [-1, -1, -1, 1, -1, -1, 1, -1, -1, -1]
            ]
            }
            }
        ),
        headers: {'Content-Type':'application/json'}
    }
    ).then(
        (response) => response.json()
    ).then(
        (game) => {return game}
    ).catch(ex => {
        console.error(ex)
    });

    return await response;
}

async function fetchSomething(URL){
    let response = await fetch(URL).then(
        (response) => response.json()
    ).then(
        (sth) => {return sth}
    ).catch(ex => {
        console.error(ex)
    });
    return await response;
}

async function deletePlayer(id){
    let response = await fetch(playersURL + id,{
        method:"DELETE"
    });
}

export async function postMove(playerId, gameId, from, to, shot){
    return await fetch(APIUrl + "move/" + playerId + "/" + gameId,{
        method: "POST",
        body: JSON.stringify({
            "move":{
                "start":{
                    "row":from[0],
                    "column":from[1],
                },
                "end":{
                    "row":to[0],
                    "column":to[1],
                }
            },
            "shot":{
                "row":shot[0],
                "column":shot[1],
            }
        }),
        headers:{'Content-Type':'application/json'}
    }).then(
        (response) => response.json
    ).catch(
        ex => console.error(ex)
    );
}
