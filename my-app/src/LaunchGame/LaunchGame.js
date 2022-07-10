import React, {useState, useRef} from "react";
import {fetchPlayers, postGame, postPlayer} from "../FetchTasks";
import "./LaunchGame.css";

function LaunchGame(props){
    const [turnTime, setTurnTime] = useState(60000);
    const [secondPlayerId, setSecondPlayerId] = useState();
    const [isSeceondPlayerAI, setIsSecondPlayerAI] = useState(true);
    const setPageId = props.setPageId;
    const secondPlayer = props.setSecondUserId;

    //legacy code
    //is used for player vs. player
    const handleButtonClick = async () =>{
        //if(isSeceondPlayerAI)
        //{
            let player = await postPlayer("COM", false);
            let id = player.id;
            console.log(player.id);
            console.log(id);
            setSecondPlayerId(id);
            secondPlayer(id);
        //}
    }

    //legacy code
    //is used for player vs. player
    //should proof if secondPlayer exists
    const playerIdExists = async() => {
        let players = await fetchPlayers();
        players.players.map((player) =>{
            if(parseInt(player.id) === secondPlayerId)
            {
                return true;
            }
        })
        return false;
    }

    //posts game
    //in this case always with a NPC
    const post = async () =>{
        let player = await postPlayer("COM", false);
        let game = await postGame(turnTime, [props.playerId, player.id]);
        props.setGameId(game.id);
        setPageId(2);
    }

    return(
        <div className="Launch_screen">
            <div className="Launch_header">
                <h2>
                    Spiel starten
                </h2>
            </div>
            <div className="Launch_text">
                <p>
                    <span id="bold">Zugzeit:</span> {turnTime/1000}s
                </p>
                <p>
                    <span id="bold">Spieler 1:</span> {props.playerId}
                </p>
            </div>
            {
                /*isSeceondPlayerAI ? 
                <></>
                : 
                <h1>
                    Spieler 2:
                    <input type="number" ref={myRef} onChange={() => {setSecondPlayerId(parseInt(myRef.current.value)); props.secondPlayerId(parseInt(myRef.current.value))}}>

                    </input>
                </h1>*/
            }
            <div className="Launch_button_container">
                <button onClick={() => { post(); }} className="Launch_button">
                    Start
                </button>
            </div>
        </div>
    )
}

export default LaunchGame;


/*<label class="switch">
<input type="checkbox" onChange={() => {isSeceondPlayerAI ? setIsSecondPlayerAI(false) : setIsSecondPlayerAI(true)}}/>
<span class="slider round"></span>
</label>*/