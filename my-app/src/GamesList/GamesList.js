//legacy code
//is used at a later point

import React, { useEffect } from "react";
import {fetchGames} from "../FetchTasks";

function GamesList(){
    const [games, setGames] = useEffect();

    setGames(fetchGames);

    return(
        <div>
            {games.games.map((game)=>(
                <div className="list-item">
                    
                </div>
            ))}
        </div>
    )
}

export default GamesList;