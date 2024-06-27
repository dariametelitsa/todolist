import { v4 } from "uuid";
import { TasksType } from "../data/dataPropsTypes";
import { addTaskAC, cleanTasksListAC, removeTaskAC, renameTaskTitleAC, tasksReducer } from "./tasksReduser";
import { addedTodolistAC, removeTodolistAC, setTodolistsAC } from "./todolistsReducer";
import { TaskStatuses, TodoTaskPriorities } from "../api/todolist-api";

const todolistId1 = v4();
const todolistId2 = v4();

let state: TasksType = {};

beforeEach(() => {
    state = {
        [todolistId1]: [
            {id: '1', status: TaskStatuses.New, title: 'XP', todoListId: todolistId1, description: '', priority: TodoTaskPriorities.Low, order: 0, addedDate: '', startDate: '', deadline: ''},
            {id: '2', status: TaskStatuses.Completed, title: 'DDD', todoListId: todolistId1, description: '', priority: TodoTaskPriorities.Low, order: 0, addedDate: '', startDate: '', deadline: ''},
            {id: '3', status: TaskStatuses.New, title: 'Scrum', todoListId: todolistId1, description: '', priority: TodoTaskPriorities.Low, order: 0, addedDate: '', startDate: '', deadline: ''},
        ],
        [todolistId2]: [
            {id: '1', status: TaskStatuses.Completed, title: 'CSS&HTML', todoListId: todolistId2, description: '', priority: TodoTaskPriorities.Low, order: 0, addedDate: '', startDate: '', deadline: ''},
            {id: '2', status: TaskStatuses.Completed, title: 'JS', todoListId: todolistId2, description: '', priority: TodoTaskPriorities.Low, order: 0, addedDate: '', startDate: '', deadline: ''},
        ]
    };
});

test('correct task should be removed', () => {
    const endState = tasksReducer(state, removeTaskAC(todolistId1, '1'));

    expect(endState[todolistId1].length).toBe(2);
    expect(endState[todolistId1][0].title).toBe("DDD");
    expect(Object.keys(endState).length).toBe(2);
    expect(endState[todolistId2][0].title).toBe("CSS&HTML");
});

test('task should be add correct', () => {
    const newTitle = 'I\'m new here!'
    const newTask = {id: '1', status: TaskStatuses.New, title: newTitle, todoListId: todolistId1, description: '', priority: TodoTaskPriorities.Low, order: 0, addedDate: '', completed: false, startDate: '', deadline: ''};
    const endState = tasksReducer(state, addTaskAC(newTask));

    expect(endState[todolistId1].length).toBe(4);
    expect(endState[todolistId1][0].title).toBe(newTitle);
    expect(endState[todolistId1][0].status).toBe(TaskStatuses.New);
    expect(Object.keys(endState).length).toBe(2);

    expect(endState[todolistId2].length).toBe(2);
    expect(endState[todolistId2][0].title).toBe("CSS&HTML");

    const newTask2 = {id: '1', status: TaskStatuses.New, title: newTitle, todoListId: todolistId2, description: '', priority: TodoTaskPriorities.Low, order: 0, addedDate: '', completed: false, startDate: '', deadline: ''};
    const endState2 = tasksReducer(state, addTaskAC(newTask2));
    expect(endState2[todolistId2].length).toBe(3);
    expect(endState2[todolistId2][0].title).toBe(newTitle);
});

test('correct rename task title', () => {
    const newTask = 'I\'m was changed';
    const endState = tasksReducer(state, renameTaskTitleAC(todolistId1, '1', newTask));

    expect(endState[todolistId1].length).toBe(3);
    expect(endState[todolistId1][0].title).toBe(newTask);
    expect(endState[todolistId1][1].title).toBe('DDD');
    expect(Object.keys(endState).length).toBe(2);
    expect(endState[todolistId2][0].title).toBe("CSS&HTML");
});

test('clean all tasks list from correct todolist', () => {
    const endState = tasksReducer(state, cleanTasksListAC(todolistId2));

    expect(Object.keys(endState).length).toBe(2);
    expect(endState[todolistId1].length).toBe(3);
    expect(endState[todolistId2].length).toBe(0);
});

test('task status should be changed correctly', () => {
    // let newStatus = TaskStatuses.Completed;
    // const endState = tasksReducer(state, setNewTaskStatusAC(todolistId1, '1', newStatus));
    //
    // expect(endState[todolistId1].length).toBe(3);
    // expect(endState[todolistId1][0].completed).toBe(newStatus);
    // expect(Object.keys(endState).length).toBe(2);
    // expect(endState[todolistId2][0].completed).toBe(true);
    //
    // newStatus = TaskStatuses.New;
    // const endState2 = tasksReducer(state, setNewTaskStatusAC(todolistId1, '1', newStatus));
    // expect(endState2[todolistId1][0].completed).toBe(newStatus);
    // expect(endState[todolistId2][0].completed).toBe(true);
});

test('clean all tasks from todolist, todolist should be empty', () => {
    const endState = tasksReducer(state, cleanTasksListAC(todolistId1));

    expect(Object.keys(endState).length).toBe(2);
    expect(endState[Object.keys(endState)[0]].length).toBe(0);
});

test('create new tasks list to correct todolist', () => {
    const endState = tasksReducer(state, addedTodolistAC('new todo'));

    const {[todolistId1]: first, todolistId2: second, ...newTasks} = endState;
    expect(Object.keys(endState).length).toBe(3);
    expect(Object.keys(endState)[2]).toBe(todolistId2);

    const keyId = Object.keys(newTasks)[0];
    expect(newTasks[keyId].length).toBe(0);
});

test('correct task should be added to correct array', () => {
    const newTask = {id: '1', status: TaskStatuses.New, title: 'juice', todoListId: todolistId2, description: '', priority: TodoTaskPriorities.Low, order: 0, addedDate: '', completed: false, startDate: '', deadline: ''};

    const action = addTaskAC(newTask);
    const endState = tasksReducer(state, action)

    expect(endState[todolistId1].length).toBe(3);
    expect(endState[todolistId2].length).toBe(3);
    expect(endState[todolistId2][0].id).toBeDefined();
    expect(endState[todolistId2][0].title).toBe('juice');
    expect(endState[todolistId2][0].status).toBe(TaskStatuses.New);
});

test('new array should be added when new todolist is added', () => {

    const action = addedTodolistAC('new todolist');
    const endState = tasksReducer(state, action);

    const keys = Object.keys(endState);
    const newKey = keys.find(k => k !== todolistId1 && k !== todolistId2);
    if (!newKey) {
        throw Error('new key should be added');
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
});

test('property with todolistId should be deleted', () => {

    const action = removeTodolistAC(todolistId2);
    const endState = tasksReducer(state, action);
    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState[todolistId2]).not.toBeDefined();
});

test('empty arrays should be added when we set todolists', () => {

    const action = setTodolistsAC([
        {id: todolistId1, title: 'What to learn', addedDate: Date(), order: 0},
        {id: todolistId2, title: 'What to buy', addedDate: Date(), order: 0},]);

    const endState = tasksReducer({}, action);
    const keys = Object.keys(endState);

    expect(keys.length).toBe(2);
    expect(endState[todolistId1]).toStrictEqual([]);
    expect(endState[todolistId2]).toStrictEqual([]);
});
