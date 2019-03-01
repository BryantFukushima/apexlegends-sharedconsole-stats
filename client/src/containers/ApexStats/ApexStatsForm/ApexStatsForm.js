import React, { Component } from "react";
import * as styles from "./ApexStatsForm.module.scss";
import { connect } from "react-redux";

import Input from "../../../components/UI/Input/Input";
import { updateObject } from "../../../shared/utilities";
import * as actions from "../../../store/actions/action";

class ApexStatsForm extends Component {
    state = {
        statForm: {
            user: {
                elemType: "input",
                config: {
                    type: "text",
                    placeholder: "Name"
                },
                value: "",
                label: "Player: ",
                class: "User"
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
                label: "Legend: ",
                class: "Legend"
            },
            rank: {
                elemType: "input",
                config: {
                    type: "number",
                    placeholder: "Rank"
                },
                value: "",
                label: "Match Rank: ",
                class: "Rank"
            },
            kills: {
                elemType: "input",
                config: {
                    type: "number",
                    placeholder: "Kills"
                },
                value: "",
                label: "Kill Count: ",
                class: "Kills"
            },
            damage: {
                elemType: "input",
                config: {
                    type: "number",
                    placeholder: "Damage"
                },
                value: "",
                label: "Total Damage Dealt: ",
                class: "Damage"
            },
            surviveMin: {
                elemType: "input",
                config: {
                    type: "number",
                    placeholder: "min."
                },
                value: "",
                label: "Total Survival Time: ",
                class: "Mins"
            },
            surviveSec: {
                elemType: "input",
                config: {
                    type: "number",
                    placeholder: "sec."
                },
                value: "",
                label: " :",
                class: "Secs"
            },
            revive: {
                elemType: "input",
                config: {
                    type: "number",
                    placeholder: "Revived"
                },
                value: "",
                label: "Total Players Revived: ",
                class: "Revive"
            },
            respawn: {
                elemType: "input",
                config: {
                    type: "number",
                    placeholder: "Respawns"
                },
                value: "",
                label: "Total Player Respawns: ",
                class: "Respawn"
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
                value: "ps4",
                label: "Platform: ",
                class: "Platform"
            }
        }
    };

    componentDidMount() {
        this.props.onFetchGames();
    }

    statFormHandler = event => {
        event.preventDefault();
        const formData = {};
        for (let formElemId in this.state.statForm) {
            formData[formElemId] = this.state.statForm[formElemId].value;
        }
        let date = new Date();
        let formComplete = updateObject(formData, {
            date: date
        });

        this.props.onAddGame(formComplete);

        let clearForm = {...this.state.statForm};

        for (let i in clearForm) {
            if (clearForm[i].elemType !== 'select') {
                clearForm[i].value = ""
            }
        }

        this.setState({
            statForm: clearForm
        })
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
                        classes={formElem.elementConfig.class}
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
                <button>SUBMIT</button>
            </form>
        );

        return <div>{form}</div>;
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddGame: game => dispatch(actions.addGame(game)),
        onFetchGames: () => {
            dispatch(actions.fetchGames());
        }
    };
};

export default connect(
    null,
    mapDispatchToProps
)(ApexStatsForm);
