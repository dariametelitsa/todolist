import { v1 } from 'uuid'
import {
    addedTodolistAC,
    changedTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from "./todolistsReducer";
import { TodoListType } from "../data/dataPropsTypes";

test('correct todolist should be removed', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    // 1. Стартовый state
    const startState: TodoListType[] = [{id: todolistId1, title: 'What to learn', filter: 'all'}, {
        id: todolistId2,
        title: 'What to buy',
        filter: 'all'
    },];

    // 2. Действие
    // const action = {
    //     type: 'REMOVE-TODOLIST',
    //     payload: {
    //         id: todolistId1,
    //     },
    // } as const; //action прикрыть as const

    //const endState = todolistsReducer(startState, action);
    const endState = todolistsReducer(startState, removeTodolistAC(todolistId1));

    // 3. Проверяем, что наши действия (изменения state) соответствуют ожиданию в массиве останется один тудулист
    expect(endState.length).toBe(1);
    // удалится нужный тудулист, а не любой
    expect(endState[0].id).toBe(todolistId2);
});



test('correct todolist should be added', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()
    let todolistId3 = v1()
    const startState: TodoListType[] = [
        { id: todolistId1, title: 'What to learn', filter: 'all'},
        { id: todolistId2, title: 'What to buy', filter: 'all' },
    ]
    const newTitle = 'New Todolist';
    const endState = todolistsReducer(startState, addedTodolistAC(todolistId3, newTitle));

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe(newTitle);
});


test('correct todolist should change its name', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();
    const startState: TodoListType[] = [
        { id: todolistId1, title: 'What to learn', filter: 'all' },
        { id: todolistId2, title: 'What to buy', filter: 'all' },
    ];
    const changedTitle = 'New Todolist';

    const endState = todolistsReducer(startState, changeTodolistTitleAC(todolistId2, changedTitle));
    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe(changedTitle);
});


test('correct filter of todolist should be changed', () => {

    let todolistId1 = v1();
    let todolistId2 = v1();
    const startState: TodoListType[] = [
        { id: todolistId1, title: 'What to learn', filter: 'all' },
        { id: todolistId2, title: 'What to buy', filter: 'all' }, ];

    const endState = todolistsReducer(startState, changedTodolistFilterAC(todolistId2, 'completed'));
    expect(endState[0].filter).toBe('all');
    expect(endState[1].filter).toBe('completed');
});
