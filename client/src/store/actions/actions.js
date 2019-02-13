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
                const fetchedGames = [];
                for (let i in res.data) {
                    fetchedGames.push({
                        id: res.data[i]._id,
                        ...res.data[i].game
                    });
                }
                dispatch(fetchSuccess(fetchedGames));
            })
            .catch(err => {
                console.log(err);
                dispatch(fetchFail(err));
            });
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
        dispatch(fetchStart());
        axios
            .post("http://localhost:3001/add-game", {
                game
            })
            .then(res => {
                dispatch(addGameSuccess(res.data, game));
            })
            .catch(err => {
                console.log(err);
                dispatch(fetchFail(err));
            });
    };
};
