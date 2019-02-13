import React, { Component } from 'react';
import * as styles from './ApexStats.module.scss'
import { connect } from "react-redux";

import ApexStatsForm from './ApexStatsForm/ApexStatsForm';
import * as actions from "../../store/actions/actions";

class ApexStats extends Component {
    
    render() {
        let games = (
            <div>
                {this.props.games.map(game => (
                    <div key={game.id}>
                        <p>{game.id}</p>
                        <p>player: {game.user}</p>
                        <p>Legend: {game.legend}</p>
                        <p>Kills: {game.kills}</p>
                        <p>Damage Dealt: {game.damage}</p>
                        <p>
                            Survive Time: {game.surviveMin}min.{game.surviveSec}
                            sec.
                        </p>
                        <p>Teammate Revives: {game.revive}</p>
                        <p>Teammate Respawns: {game.respawn}</p>
                        <p>Platform: {game.platform}</p>
                    </div>
                ))}
            </div>
        );
        return (
            <div className={styles.Apex}>
                <h1>Apex Legends: Shared Console Stats</h1>
                <ApexStatsForm />
                {games}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        games: state.games
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchGames: () => {dispatch(actions.fetchGames())}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ApexStats);