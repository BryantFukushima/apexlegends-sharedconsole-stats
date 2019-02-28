import * as actionTypes from "./actionTypes";
import axios from "axios";

export const fetchStart = () => {
    return {
        type: actionTypes.FETCH_START
    };
};

export const fetchFail = err => {
    return {
        type: actionTypes.FETCH_FAIL,
        error: err
    };
};

export const fetchSuccess = results => {
    return {
        type: actionTypes.FETCH_SUCCESS,
        games: results
    };
};

export const fetchGames = () => {
    return dispatch => {
        dispatch(fetchStart());
        axios
            .get("http://localhost:3001/games")
            .then(res => {
                dispatch(fetchSuccess(res));
            })
            .catch(err => {
                console.log(err);
                dispatch(fetchFail(err));
            });
    };
};

export const addGameStart = () => {
    return {
        type: actionTypes.ADD_GAME_START
    };
};

export const addGameFail = err => {
    return {
        type: actionTypes.ADD_GAME_FAIL,
        error: err
    };
};

export const addGameSuccess = game => {
    return {
        type: actionTypes.ADD_GAME_SUCCESS,
        game
    };
};

export const addGame = game => {
    return dispatch => {
        dispatch(addGameStart());
        axios
            .post("http://localhost:3001/add-game", {
                game
            })
            .then(res => {
                dispatch(addGameSuccess(res.data, game));
            })
            .catch(err => {
                console.log(err);
                dispatch(addGameFail(err));
            });
    };
};

export const deleteGameStart = id => {
    return {
        type: actionTypes.DELETE_GAME_START,
        id: id
    };
};

export const deleteGameFail = err => {
    return {
        type: actionTypes.DELETE_GAME_FAIL,
        error: err
    };
};

export const deleteGameSuccess = id => {
    return {
        type: actionTypes.DELETE_GAME_SUCCESS,
        id: id
    };
};

export const deleteGame = id => {
    return dispatch => {
        dispatch(deleteGameStart());
        axios
            .post(`http://localhost:3001/delete-game/${id}`)
            .then(() => {
                dispatch(deleteGameSuccess(id));
            })
            .catch(err => {
                console.log(err);
                dispatch(deleteGameFail(err));
            });
    };
};

export const sortBy = sort => {
    switch (sort) {
        case "User":
            return {
                type: actionTypes.SORT_BY_USER
            };
        case "Legend":
            return {
                type: actionTypes.SORT_BY_LEGEND
            };
        case "Rank":
            return {
                type: actionTypes.SORT_BY_RANK
            };
        case "Kills":
            return {
                type: actionTypes.SORT_BY_KILLS
            };
        case "Damage":
            return {
                type: actionTypes.SORT_BY_DAMAGE
            };
        case "Revives":
            return {
                type: actionTypes.SORT_BY_REVIVES
            };
        case "Respawns":
            return {
                type: actionTypes.SORT_BY_RESPANWS
            };
        case "Platform":
            return {
                type: actionTypes.SORT_BY_PLATFORM
            };
        case "Date":
            return {
                type: actionTypes.SORT_BY_DATE
            };
        default:
            return null;
    }
};
