import * as actionTypes from './actionTypes';

export const addGame = game => {
    return {
        type: actionTypes.ADD_GAME,
        game
    }
}