import React from "react";

import * as styles from "./Game.module.scss";

const Game = props => {
    let date = new Date(props.gameData.date)
    let y = date.getFullYear().toString();
    let m = date.getMonth().toString();
    let d = date.getDate().toString();
    let mm = (m.length < 2) ? '0' + m : m;
    let dd = (d.length < 2) ? '0' + d : d; 
    let dateFormat = mm + '/' + dd + '/' + y;

    return (
        <div className={styles.Game}>
            {/* <p>{props.gameData.id}</p> */}
            <p>{props.gameData.user}</p>
            <p>{props.gameData.legend}</p>
            <p>{props.gameData.rank}</p>
            <p>{props.gameData.kills}</p>
            <p>{props.gameData.damage}</p>
            <p>
                {props.gameData.surviveMin}:{props.gameData.surviveSec}
            </p>
            <p>{props.gameData.revive}</p>
            <p>{props.gameData.respawn}</p>
            <p>{props.gameData.platform}</p>
            <p>{dateFormat}</p>
            <div>
                <p onClick={props.clicked}>X</p>
            </div>
        </div>
    );
};

export default Game;
