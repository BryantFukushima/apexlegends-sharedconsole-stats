import React from "react";

import * as styles from "./Game.module.scss";

const Game = props => {
    return (
        <div className={styles.Game}>
            <p>{props.gameData.id}</p>
            <p>player: {props.gameData.user}</p>
            <p>Legend: {props.gameData.legend}</p>
            <p>Rank: {props.gameData.rank}</p>
            <p>Kills: {props.gameData.kills}</p>
            <p>Damage Dealt: {props.gameData.damage}</p>
            <p>
                Survive Time: {props.gameData.surviveMin}min.{props.gameData.surviveSec}
                sec.
            </p>
            <p>Teammate Revives: {props.gameData.revive}</p>
            <p>Teammate Respawns: {props.gameData.respawn}</p>
            <p>Platform: {props.gameData.platform}</p>
            <p>Date: {props.gameData.date}</p>
            <button onClick={props.clicked}>
                delete
            </button>
        </div>
    );
};

export default Game;
