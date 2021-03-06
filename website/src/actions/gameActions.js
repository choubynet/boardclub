import axios from 'axios';
import {
    ADD_GAME,
    GET_GAMES,
    GET_GAME,
    LOADING_GAMES,
    DELETE_GAME,
    GET_ERRORS,
    JOIN_GAME,
    LEAVE_GAME
} from '../constants';


// loading action
export const loadGames = () => dispatch => {
    return {
        type: LOADING_GAMES
    }
}


// get game details by game Id
export function getGameById (gameId) {
    return fetch(`http://localhost:5000/api/games/find/${gameId}`, {
        method: 'GET'
    })
        .then((response) => {
            return response.json()
        })
}


// create a new game
export const createGame = (gameData, history) => dispatch => {
    axios.post('http://localhost:5000/api/games/create', gameData)
        .then(res => dispatch({
            type: ADD_GAME,
            payload: res.data
        }))
        .then(res => history.push(`/`))
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }))
}


// delete a game
export const deleteGame = gameData => dispatch => {
    axios.post('http://localhost:5000/api/games/delete', gameData)
        .then(res => dispatch({
            type: DELETE_GAME,
            payload: res.data
        }))
        .catch(err => console.log(err))
}


// edit a game from admin section
export const editGame = (gameData, history) => dispatch => {
    axios.post('http://localhost:5000/api/games/edit', gameData)
        .then(res => history.push(`/admin`))
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }))
}


// edit own game
export const editOwnGame = (gameData, history) => dispatch => {
    axios.post('http://localhost:5000/api/games/edit', gameData)
        .then(res => history.push(`/game/${gameData.gameId}`))
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }))
}


// search games
export const searchGames = gameData => dispatch => {
    axios.post('http://localhost:5000/api/games/search', gameData)
        .then(res => dispatch({
            type: GET_GAMES,
            payload: res.data,
            status: "search"
        }))
        .catch(err => console.log(err))
}


// get all games
export const getGames = () => dispatch => {
    dispatch(loadGames)
    axios.get('http://localhost:5000/api/games')
        .then(res => dispatch({
            type: GET_GAMES,
            payload: res.data
        }))
        .catch(err => console.log(err))
}


// get all upcoming games
export const getUpcomingGames = () => dispatch => {
    dispatch(loadGames)
    axios.get('http://localhost:5000/api/games/upcoming')
        .then(res => dispatch({
            type: GET_GAMES,
            payload: res.data,
            status: "upcoming"
        }))
        .catch(err => console.log(err))
}


// get game details by game Id
export function getUpcomingGamesFunction () {
    return fetch(`http://localhost:5000/api/games/upcoming`, {
        method: 'GET'
    })
        .then((response) => {
            return response.json()
        })
}


// get all upcoming games from friends
export const getFriendsUpcomingGames = () => dispatch => {
    dispatch(loadGames)
    axios.get('http://localhost:5000/api/games/friendsupcoming')
        .then(res => dispatch({
            type: GET_GAMES,
            payload: res.data,
            status: "friends"
        }))
        .catch(err => console.log(err))
}


// get all upcoming games from favorite board games
export const getFavoriteUpcomingGames = () => dispatch => {
    dispatch(loadGames)
    axios.get('http://localhost:5000/api/games/favoriteupcoming')
        .then(res => dispatch({
            type: GET_GAMES,
            payload: res.data,
            status: "favorite"
        }))
        .catch(err => console.log(err))
}


export const joinGame = (gameId) => dispatch => { 
    axios.post('http://localhost:5000/api/games/join', { gameId })
    .then(res => dispatch({
        type: JOIN_GAME,
        payload: res.data
    }))
    // .then(res => console.log(res))
    .catch(err => console.log(err))
}

export const leaveGame = (gameId) => dispatch => { 
    axios.post('http://localhost:5000/api/games/leave', { gameId })
    .then(res => dispatch({
        type: LEAVE_GAME,
        payload: res.data
    }))
    // .then(res => console.log(res))
    .catch(err => console.log(err))
}
// get all games schedulded for the current user
export const getScheduledGames = () => dispatch => {
    dispatch(loadGames)
    axios.get('http://localhost:5000/api/games/scheduled')
        .then(res => dispatch({
            type: GET_GAMES,
            payload: res.data,
            status: "scheduled"
        }))
        .catch(err => console.log(err))
}

// get all games from an user
export const getGamesFromUser = (userId) => dispatch => {
    console.log("test")
    dispatch(loadGames)
    axios.get(`http://localhost:5000/api/games/user/${userId}`)
        .then(res => dispatch({
            type: GET_GAMES,
            payload: res.data
        }))
        .catch(err => console.log(err))
}