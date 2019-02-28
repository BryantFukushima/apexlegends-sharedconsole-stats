import React, { Component } from "react";
import * as styles from "./ApexStats.module.scss";
import { connect } from "react-redux";

import ApexStatsForm from "./ApexStatsForm/ApexStatsForm";
import * as actions from "../../store/actions/action";
import Game from "../../components/Game/Game";

class ApexStats extends Component {

    state = {
        sorts: ['User','Legend', 'Rank', 'Kills', 'Damage', 'Revives', 'Respawns', 'Platform', 'Date' ]
    }

    deleteStatHandler = id => {
        this.props.onDeleteGame(id);
    };

    sortHandler = (sort) => {
        this.props.onSortBy(sort);
    }

    render() {
        let games = (
            <div>
                {this.props.games.map(game => (
                    <Game key={game.id} gameData={game} clicked={() => this.deleteStatHandler(game.id)}/>
                ))}
            </div>
        );

        let sortButtons = (
            <div>
                {this.state.sorts.map((sort, i) => (
                    <button key={i} onClick={() => this.sortHandler(sort)}>{sort}</button>
                ))}
            </div>
        )
        return (
            <div className={styles.Apex}>
                <h1>Apex Legends: Shared Console Stats</h1>
                <ApexStatsForm />
                {sortButtons}
                {games}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        games: state.games
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onDeleteGame: id => {
            dispatch(actions.deleteGame(id));
        },
        onSortBy: sort => {
            dispatch(actions.sortBy(sort));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ApexStats);
