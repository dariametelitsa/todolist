import { Provider } from "react-redux";
import { AppRootState, store } from "../model/store";
import { v1, v4 } from "uuid";
import { combineReducers, createStore } from "redux";
import { todolistsReducer } from "../model/todolistsReducer";
import { tasksReducer } from "../model/tasksReduser";

const todolistId1 = v4();
const todolistId2 = v4();

const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer,
});

const initialGlobalState: AppRootState = {
    tasks: {
        [todolistId1]: [
            {id: v1(), title: "XP", isDone: false},
            {id: v1(), title: "DDD", isDone: true},
            {id: v1(), title: "Scrum", isDone: false}
        ],
        [todolistId2]: [
            {id: v1(), title: "CSS&HTML", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "React", isDone: false},
            {id: v1(), title: "Redux", isDone: false}
        ],
    },
    todolists: [
        {id: todolistId1, title: "What to learn", filter: 'all'},
        {id: todolistId2, title: "What to do", filter: 'all'},
    ]
};

export const storybookStore = createStore(rootReducer, initialGlobalState as AppRootState)

export const ReactStoreProviderDecorator = (story: any) => {
    return <Provider store={storybookStore}>{story()}</Provider>
}