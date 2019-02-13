import React, { Component } from "react";
import * as styles from "./ApexStatsForm.module.scss";
import { connect } from "react-redux";

import Input from "../../../components/UI/Input/Input";
import { updateObject } from "../../../shared/utilities";
import * as actions from '../../../store/actions/actions';

class ApexStatsForm extends Component {
    state = {
        statForm: {
            user: {
                elemType: "input",
                config: {
                    type: "text",
                    placeholder: "User"
                },
                value: "",
                label: "Player: "
            },
            legend: {
                elemType: "select",
                config: {
                    options: [
                        { value: "bloodhound", placeholder: "Bloodhound" },
                        { value: "gibraltar", placeholder: "Gibraltar" },
                        { value: "lifeline", placeholder: "Lifeline" },
                        { value: "pathfinder", placeholder: "Pathfinder" },
                        { value: "wraith", placeholder: "Wraith" },
                        { value: "bangalore", placeholder: "Bangalore" },
                        { value: "caustic", placeholder: "Caustic" },
                        { value: "mirage", placeholder: "Mirage" }
                    ]
                },
                value: "bloodhound",
                label: "Legend: "
            },
            kills: {
                elemType: "input",
                config: {
                    type: "number",
                    placeholder: "Kills"
                },
                value: "",
                label: "Kill Count: "
            },
            damage: {
                elemType: "input",
                config: {
                    type: "number",
                    placeholder: "Damage"
                },
                value: "",
                label: "Total Damage Dealt: "
            },
            surviveMin: {
                elemType: "input",
                config: {
                    type: "number",
                    placeholder: "min."
                },
                value: "",
                label: "Total Survival Time: "
            },
            surviveSec: {
                elemType: "input",
                config: {
                    type: "number",
                    placeholder: "sec."
                },
                value: ""
            },
            revive: {
                elemType: "input",
                config: {
                    type: "number",
                    placeholder: "Revived"
                },
                value: "",
                label: "Total Players Revived: "
            },
            respawn: {
                elemType: "input",
                config: {
                    type: "number",
                    placeholder: "Respawns"
                },
                value: "",
                label: "Total Player Respawns: "
            },
            platform: {
                elemType: "select",
                config: {
                    options: [
                        { value: "ps4", placeholder: "PS4" },
                        { value: "xbox", placeholder: "Xbox One" },
                        { value: "pc", placeholder: "PC" }
                    ]
                },
                label: "Total Player Respawns: "
            }
        }
    };

    statFormHandler = event => {
        event.preventDefault();
        const formData = {};
        for (let formElemId in this.state.statForm) {
            formData[formElemId] = this.state.statForm[formElemId].value;
        }
        console.log(formData);

        this.props.onAddGame(formData);
    };

    inputChangedHandler = (event, inputId) => {
        let updatedElem = updateObject(this.state.statForm[inputId], {
            value: event.target.value
        });

        let updateStatForm = updateObject(this.state.statForm, {
            [inputId]: updatedElem
        });
        this.setState({
            statForm: updateStatForm
        });
    };

    render() {
        const formElemArray = [];
        for (let i in this.state.statForm) {
            formElemArray.push({
                id: i,
                elementConfig: this.state.statForm[i]
            });
        }
        let form = (
            <form className={styles.ApexForm} onSubmit={this.statFormHandler}>
                {formElemArray.map(formElem => (
                    <Input
                        key={formElem.id}
                        elemType={formElem.elementConfig.elemType}
                        elemConfig={formElem.elementConfig.config}
                        value={formElem.elementConfig.value}
                        changed={event =>
                            this.inputChangedHandler(event, formElem.id)
                        }
                        label={formElem.elementConfig.label}
                    />
                ))}
                <button>Enter</button>
            </form>
        );

        let games = (
            <div>
                {this.props.games.map(game => (
                    <div key={Math.random()}>
                        <p>player: {game.user}</p>
                        <p>Legend: {game.legend}</p>
                        <p>Kills: {game.kills}</p>
                        <p>Damage Dealt: {game.damage}</p>
                        <p>Survive Time: {game.surviveMin}min.{game.surviveSec}sec.</p>
                        <p>Teammate Revives: {game.revive}</p>
                        <p>Teammate Respawns: {game.respawn}</p>
                        <p>Platform: {game.platform}</p>
                    </div>
                ))}
            </div>
        )
        return (
        <div>
        {form}
        {games}
        </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        games: state.games
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddGame: game => dispatch(actions.addGame(game))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ApexStatsForm);
