import React, { Component } from "react";
import * as styles from "./ApexStats.module.scss";
import { connect } from "react-redux";

import ApexStatsForm from "./ApexStatsForm/ApexStatsForm";
import * as actions from "../../store/actions/action";
import Game from "../../components/Game/Game";
import Sorts from "../../components/Sorts/Sorts";
import { updateObject } from "../../shared/utilities";

class ApexStats extends Component {
    state = {
        sorts: {
            user: {
                stat: "User",
                active: false
            },
            legend: {
                stat: "Legend",
                active: false
            },
            rank: {
                stat: "Rank",
                active: false
            },
            kills: {
                stat: "Kills",
                active: false
            },
            damage: {
                stat: "Damage",
                active: false
            },
            time: {
                stat: "Time",
                active: false
            },
            revives: {
                stat: "Revives",
                active: false
            },
            respawns: {
                stat: "Respawns",
                active: false
            },
            platform: {
                stat: "Platform",
                active: false
            },
            date: {
                stat: "Date",
                active: false
            }
        }
    };

    deleteStatHandler = id => {
        this.props.onDeleteGame(id);
    };

    sortHandler = sort => {
        let sortActive = {};
        for (let j in this.state.sorts) {
            let c = updateObject(sortActive[j], {
                stat: this.state.sorts[j].stat,
                active: false
            });

            let d = updateObject(sortActive, {
                [j]: c
            });

            sortActive = d;
        }

        let updateArr = sortActive;

        for (let i in sortActive) {
            if (sort === sortActive[i].stat) {
                let a = updateObject(sortActive[i], {
                    active: true
                });

                let b = updateObject(sortActive, {
                    [i]: a
                });

                updateArr = b;
            }
        }
        this.setState({
            sorts: updateArr
        });
        this.props.onSortBy(sort);
    };

    render() {
        let games = (
            <div className={styles.ApexGames}>
                {this.props.games.map(game => (
                    <Game
                        key={game.id}
                        gameData={game}
                        clicked={() => this.deleteStatHandler(game.id)}
                    />
                ))}
            </div>
        );
        let sortsArr = [];
        for (let i in this.state.sorts) {
            sortsArr.push({
                stat: this.state.sorts[i].stat,
                active: this.state.sorts[i].active
            });
        }
        let sortButtons = (
            <div className={styles.ApexSort}>
                {sortsArr.map((sort, i) => (
                    <Sorts
                        key={i}
                        sort={sort.stat}
                        isActive={sort.active}
                        clicked={() => this.sortHandler(sort.stat)}
                    />
                ))}
            </div>
        );
        return (
            <div className={styles.Apex}>
                <header className={styles.ApexHeader}>
                    <div className={styles.ApexHeader__logo}>
                        <p>APEX Legends</p>
                        <p>Stat Tracker</p>
                    </div>
                    <h1>Apex Mission Report:</h1>
                    <ApexStatsForm />
                </header>
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
