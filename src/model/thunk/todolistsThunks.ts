import { AppThunkType } from "../store";
import { todolistAPI } from "../../api/todolist-api";
import { addTodolistAC, changeTodolistTitleAC, deleteTodolistAC, setTodolistsAC } from "../redusers/todolistsReducer";
import { setTasksAC } from "../redusers/tasksReduser";

//пример типирования thunk и dispatch
// export const fetchTodolistsTC = (): AppThunkType  => {
//     return (dispatch: Dispatch<TodolistActionsType>) => {
//         todolistAPI.getTodolist()
//             .then(res => {
//                 dispatch(setTodolistsAC(res.data));
//             })
//             .catch(err => {
//                 console.log(err);
//                 dispatch(setTodolistsAC([]));
//             })
//     }
// }

export const getTodolistsTC = (): AppThunkType => async dispatch => {
    try {
        const res = await todolistAPI.getTodolist();
        dispatch(setTodolistsAC(res.data));
    } catch (e) {
        dispatch(setTodolistsAC([]));
    }
}

export const addTodolistTC = (title: string): AppThunkType<Promise<void>> => async dispatch => {
    try {
        const todoRes = await todolistAPI.addTodolist(title);
        dispatch(addTodolistAC(todoRes.data.data.item));
        const taskRes = await todolistAPI.getTasks(todoRes.data.data.item.id);
        dispatch(setTasksAC(todoRes.data.data.item.id, taskRes.data.items));
    } catch (e) {
        console.log(e)
    }

}

export const deleteTodolistTC = (todolistId: string): AppThunkType => dispatch => {
   todolistAPI.deleteTodolist(todolistId)
       .then(() => {
           dispatch(deleteTodolistAC(todolistId));
       });
}

// type UpdateDomainTodolistModelType = {
//     order: number
//     title: string
// }

export const changeTodolistTitleTC = (todolistId: string, title: string): AppThunkType => dispatch => {
    todolistAPI.updateTodolist(todolistId, title)
        .then(() => dispatch(changeTodolistTitleAC(todolistId, title)));
}