import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utilities";

const initialState = {
    games: []
};

const addGame = (state, action) => {
    let newGame = action.game;
    return updateObject(state, {
        games: state.games.concat(newGame)
    });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_GAME:
            return addGame(state, action);
        default:
            return state;
    }
};

export default reducer;
