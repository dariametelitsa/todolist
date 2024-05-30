import { v1 } from 'uuid'
import {
    addedTodolistAC,
    changedTodolistCoverAC,
    changedTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from "./todolistsReducer";
import { TodoListType } from "../data/dataPropsTypes";

//test data
let todolistId1: string;
let todolistId2: string;
let startState: TodoListType[] = [];

//initialization
beforeEach(() => {
    todolistId1 = v1();
    todolistId2 = v1();
    startState = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'},
    ];
});


test('correct todolist should be removed', () => {
    const endState = todolistsReducer(startState, removeTodolistAC(todolistId1));

    expect(endState.length).toBe(1);
    // удалится нужный тудулист, а не любой
    expect(endState[0].id).toBe(todolistId2);
});


test('correct todolist should be added', () => {
    const newTitle = 'New Todolist';
    const endState = todolistsReducer(startState, addedTodolistAC(newTitle));

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe(newTitle);
});


test('correct todolist should change its name', () => {
    const changedTitle = 'New Todolist';

    const endState = todolistsReducer(startState, changeTodolistTitleAC(todolistId2, changedTitle));
    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe(changedTitle);
});


test('correct filter of todolist should be changed', () => {
    const endState = todolistsReducer(startState, changedTodolistFilterAC(todolistId2, 'completed'));
    expect(endState[0].filter).toBe('all');
    expect(endState[1].filter).toBe('completed');
});

test('correct todolist cover changed', () => {
    const endState = todolistsReducer(startState, changedTodolistCoverAC(todolistId2, 'newImg'));
    expect(endState[0].coverImage).toBe(undefined);
    expect(endState[1].coverImage).toBe('newImg');

    const endState2 = todolistsReducer(endState, changedTodolistCoverAC(todolistId1, 'newImg'));
    expect(endState2[0].coverImage).toBe('newImg');
    expect(endState2[1].coverImage).toBe('newImg');
});

