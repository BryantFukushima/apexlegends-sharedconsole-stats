import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utilities";

const initialState = {
    games: []
};

const fetchSuccess = (state, action) => {
    const fetchedGames = [];
    for (let i in action.games.data) {
        fetchedGames.push({
            id: action.games.data[i]._id,
            ...action.games.data[i].game
        });
    }
    return updateObject(state, {
        games: fetchedGames
    });
};

const addGameSuccess = (state, action) => {
    let newGame = updateObject(action.game.game, {
        id: action.game._id
    });
    return updateObject(state, {
        games: state.games.concat(newGame).reverse()
    });
};

const deleteGameSuccess = (state, action) => {
    return updateObject(state, {
        games: state.games.filter(game => game.id !== action.id)
    });
};

const sortByUser = (state, action) => {
    let sortedGames = [...state.games].sort((a, b) => {
        let userOne = a.user;
        let userTwo = b.user;
        return userOne > userTwo ? 1 : userOne < userTwo ? -1 : 0;
    });
    return updateObject(state, {
        games: sortedGames
    });
};

const sortByLegend = (state, action) => {
    let sortedGames = [...state.games].sort((a, b) => {
        let userOne = a.legend;
        let userTwo = b.legend;
        return userOne > userTwo ? 1 : userOne < userTwo ? -1 : 0;
    });
    return updateObject(state, {
        games: sortedGames
    });
};

const sortByRank = state => {
    let sortedGames = [...state.games].sort((a, b) => {
        let userOne = a.rank;
        let userTwo = b.rank;
        return userOne - userTwo;
    });
    return updateObject(state, {
        games: sortedGames
    });
};

const sortByKills = state => {
    let sortedGames = [...state.games].sort((a, b) => {
        let userOne = a.kills;
        let userTwo = b.kills;
        return userTwo - userOne;
    });
    return updateObject(state, {
        games: sortedGames
    });
};

const sortByDamage = state => {
    
    let sortedGames = [...state.games].sort((a, b) => {
        let userOne = a.damage;
        let userTwo = b.damage;
        return userTwo - userOne;
    });
    return updateObject(state, {
        games: sortedGames
    });
};

const sortByRevives = state => {
    let arr = [...state.games]
    let sortedGames = arr.sort((a, b) => {
        let userOne = a.revive;
        let userTwo = b.revive;
        return userTwo - userOne;
    });
    return updateObject(state, {
        games: sortedGames
    });
};

const sortByRespawns = state => {
    let sortedGames = [...state.games].sort((a, b) => {
        let userOne = a.respawn;
        let userTwo = b.respawn;
        return userTwo - userOne;
    });
    return updateObject(state, {
        games: sortedGames
    });
};

const sortByPlatform = state => {
    let sortedGames = [...state.games].sort((a, b) => {
        let userOne = a.platform;
        let userTwo = b.platform;
        return userOne - userTwo;
    });
    return updateObject(state, {
        games: sortedGames
    });
};

const sortByDate = state => {
    let sortedGames = [...state.games].sort((a, b) => {
        let userOne = Date.parse(a.date);
        let userTwo = Date.parse(b.date);
        return userTwo - userOne;
    });
    return updateObject(state, {
        games: sortedGames
    });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_SUCCESS:
            return fetchSuccess(state, action);
        case actionTypes.ADD_GAME_SUCCESS:
            return addGameSuccess(state, action);
        case actionTypes.DELETE_GAME_SUCCESS:
            return deleteGameSuccess(state, action);
        case actionTypes.SORT_BY_USER:
            return sortByUser(state);
        case actionTypes.SORT_BY_LEGEND:
            return sortByLegend(state);
        case actionTypes.SORT_BY_RANK:
            return sortByRank(state);
        case actionTypes.SORT_BY_KILLS:
            return sortByKills(state);
        case actionTypes.SORT_BY_DAMAGE:
            return sortByDamage(state);
        case actionTypes.SORT_BY_REVIVES:
            return sortByRevives(state);
        case actionTypes.SORT_BY_RESPANWS:
            return sortByRespawns(state);
        case actionTypes.SORT_BY_PLATFORM:
            return sortByPlatform(state);
        case actionTypes.SORT_BY_DATE:
            return sortByDate(state);
        default:
            return state;
    }
};

export default reducer;
