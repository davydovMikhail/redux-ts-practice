import { Dispatch } from "redux";
import { UserAction, UserActionType } from "../../types/user";
import axios from "axios";
import { ThunkAction } from 'redux-thunk';
import { initialState } from "../reducers/userReducer"; 
import { UserState } from "../../types/user";
import { TodoAction, TodoActionTypes } from "../../types/todo";


export const fetchTodos = (page = 1, limit = 10) => {
    return async (dispatch: Dispatch<TodoAction>) => {
        try {
            dispatch({type: TodoActionTypes.FETCH_TODOS})
            const response = await axios.get("https://jsonplaceholder.typicode.com/todos",{
                params: {_page: page, _limit: limit}
            })
            setTimeout(() => {
                dispatch({
                    type: TodoActionTypes.FETCH_TODOS_SUCCESS, 
                    payload: response.data
                })
            }, 500)
            dispatch({
                type: TodoActionTypes.FETCH_TODOS_SUCCESS, 
                payload: response.data
            })
        } catch (e) {
            dispatch({
                type: TodoActionTypes.FETCH_TODOS_ERROR, 
                payload: "Error while loading todos"
            })
        }
    }
}
export function SetTodoPage(page: number): TodoAction {
    return {type: TodoActionTypes.SET_TODO_PAGE, payload: page}
}