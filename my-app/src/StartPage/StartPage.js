import React, { useState } from "react";
import Game from "../Game/Game";
import Help from "../Help/Help";
import LaunchGame from "../LaunchGame/LaunchGame";
import { fetchGame, fetchGames, reset } from "../FetchTasks";
import "./StartPage.css";
import Login from "../Login/Login";
import { postPlayer } from "../FetchTasks";

//repressents main component besides App
function StartPage(props){
    const[pageId, setPageId] = useState(0);
    const[gameId, setGameId] = useState();
    const[userName, setUserName] = useState("");
    const[userId, setUserId] = useState(null);
    const[secondUserId, setSecondUserId] = useState();
    const[login, setLogin] = useState(false);

    //reset();
    const loginDone = () => {
      setLogin(true);
    }

    //posts new player object to API
    const userNameRegistered = (name) => {
      setUserName(name);
      post(name);
    }

    const post = async (userName) => {
      let player = await postPlayer(userName, true);
      setUserId(player.id);
    } 

    //switches components
    const switchPage = () => {
      switch (pageId){
        //Login Page
        case 0:
          return(
            <div className="App">
            <div className="App_header">
                <h2>
                  Game of the Amazons
                </h2>
            </div>
            {login === false ?
              <div className="StartPage_login">
                <Login setUserName={userNameRegistered} setLogin={loginDone}/>
              </div>
              : 
              <>
              <div className="App_welcome">
                <h3>
                  Hallo {userName}!
                </h3>
                <h3>
                  ID:{userId}
                </h3>
              </div>
              <div className="StartPage_button_container">
                <button onClick={() => { setPageId(3); } } className="StartPage_button">
                  Spiel starten
                </button>
                <button onClick={() => {isGameOpen();}} className="StartPage_button">
                  Spiel beitreten
                </button>
              </div>
              <div className="StartPage_help_container">
                <button className="Help_button" onClick={() => setPageId(1)}>
                  Hilfe
                </button>
              </div>
            </> }
          </div>)

        //Help Page
        case 1:
          return(<Help setPageId={setPageId}/>)

        //Game Component with Chessboard
        case 2:
          return(<Game userId={userId} gameId={gameId} game={fetchGame(gameId)} player={userName}/>)

        //launching a game
        case 3:
          return(<LaunchGame setPageId={setPageId} playerId={userId} setSecondUserId={setSecondUserId} setGameId={setGameId}/>)

        default:
          break;
      }
    }

    const isGameOpen = async () =>{
      let games = await fetchGames();
      if(games.games.length !== 0)
      {
        games.games.map((game) => {
          if(game.players[1].id === userId)
          {

          }
        })
      }
      else
      {
        return(<div>{alert("Kein Spiel gefunden!")}</div>)
      }
    }

    return (switchPage());
}

export default StartPage;