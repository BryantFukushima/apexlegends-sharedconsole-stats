import React from "react";

import * as styles from "./Game.module.scss";

const Game = props => {
    let date = new Date(props.gameData.date)
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    if(day < 10) {
        day = "0" + day;
    }
    if(month < 10) {
        month = "0" + month;
    }
    let dateFormat = month + "-" + day + "-" + year;

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
