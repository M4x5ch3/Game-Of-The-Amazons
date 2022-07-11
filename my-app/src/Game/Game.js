import React, {useState, useEffect} from "react";
import './Game.css';
import ChessBoard from "../ChessBoard/ChessBoard";
import {fetchGame, postMove} from "../FetchTasks";

//handles game logic
function Game(props){
    const [playersTurn, setPlayersTurn] = useState();
    const [game, setGame] = useState();
    const [board, setBoard] = useState([
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
    ]);

    let turn = 0;
    //is used to fetch game object every 0.1 seconds
    useEffect(() => {
        const interval = setInterval(async () => {
            await getGame(interval);
        }, 100);
      }, []);
    
    //fetches game
    const getGame = async (interval) =>{
        let game = await fetchGame(props.gameId);
        if(game.winningPlayer === undefined)
        {
            if(game.turns.length > turn)
            {
                turn = game.turns.length;
                setGame(game);
                setBoard(game.board.squares);
            }
        }
        else
        {
            clearInterval(interval);
            window.alert(game.players[game.winningPlayer].name + " hat gewonnen");
        }

    }

    const [moves, setMoves] = useState([]);

    //should move selected figure to destined position
    const movePlayer = (from, to) =>{
        let temp = board;
        let value = board[from[0]][from[1]];
        temp[from[0]][from[1]] = -1;
        temp[to[0]][to[1]] = value;
        setBoard(temp);
        setMoves([from, to]);
    }

    //should shoot arrow
    const setArrow = (to) =>{
        let temp = board;
        temp[to[0]][to[1]] = -1;
        postMove(props.userId, props.gameId, moves[0], moves[1], to);
    }

    return(
        <div className="Game_screen">
            {game === undefined ? <h1>{props.player}</h1> : <h1>{game.players[game.turnPlayer].name}</h1>}
            <ChessBoard board={board} playersTurn={playersTurn} movePlayer={movePlayer} setArrow={setArrow}/>
        </div>
        )
}

export default Game;
