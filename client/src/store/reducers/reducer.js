import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utilities";

const initialState = {
    games: []
};

const fetchSuccess = (state, action) => {
    return updateObject(state, {
        games: action.games
    });
};

const addGameSuccess = (state, action) => {
    let newGame = updateObject(action.game.game, {
        id: action.game._id
    })
    return updateObject(state, {
        games: state.games.concat(newGame)
    });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_SUCCESS:
            return fetchSuccess(state, action);
        case actionTypes.ADD_GAME_SUCCESS:
            return addGameSuccess(state, action);
        default:
            return state;
    }
};

export default reducer;