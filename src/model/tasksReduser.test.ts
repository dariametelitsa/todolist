import { v4 } from "uuid";
import { TasksType } from "../data/dataPropsTypes";
import {
    addTaskAC,
    cleanTasksListAC, createTasksListAC, deleteTasksListAC,
    removeTaskAC,
    renameTaskTitleAC,
    setNewTaskStatusAC,
    tasksReduser
} from "./tasksReduser";

const todolistId1 = v4();
const todolistId2 = v4();

let state: TasksType = {};

beforeEach(() => {
    state = {
        [todolistId1]: [
            {id: '1', title: "XP", isDone: false},
            {id: '2', title: "DDD", isDone: true},
            {id: '3', title: "Scrum", isDone: false}
        ],
        [todolistId2]: [
            {id: '1', title: "CSS&HTML", isDone: true},
            {id: '2', title: "JS", isDone: true},
        ]
    };
});

test('correct task should be removed', () => {
    const endState = tasksReduser(state, removeTaskAC(todolistId1, '1'));

    expect(endState[todolistId1].length).toBe(2);
    expect(endState[todolistId1][0].title).toBe("DDD");
    expect(Object.keys(endState).length).toBe(2);
    expect(endState[todolistId2][0].title).toBe("CSS&HTML");
});

test('task should be add correct', () => {
    const newTask = 'I\'m new here!';
    const endState = tasksReduser(state, addTaskAC(todolistId1, newTask));

    expect(endState[todolistId1].length).toBe(4);
    expect(endState[todolistId1][0].title).toBe(newTask);
    expect(endState[todolistId1][0].isDone).toBe(false);
    expect(Object.keys(endState).length).toBe(2);

    expect(endState[todolistId2].length).toBe(2);
    expect(endState[todolistId2][0].title).toBe("CSS&HTML");

    const endState2 = tasksReduser(state, addTaskAC(todolistId2, newTask));
    expect(endState2[todolistId2].length).toBe(3);
    expect(endState2[todolistId2][0].title).toBe(newTask);
});

test('correct rename task title', () => {
    const newTask = 'I\'m was changed';
    const endState = tasksReduser(state, renameTaskTitleAC(todolistId1, '1', newTask));

    expect(endState[todolistId1].length).toBe(3);
    expect(endState[todolistId1][0].title).toBe(newTask);
    expect(endState[todolistId1][1].title).toBe('DDD');
    expect(Object.keys(endState).length).toBe(2);
    expect(endState[todolistId2][0].title).toBe("CSS&HTML");
});

test('clean all tasks list from correct todolist', () => {
    const endState = tasksReduser(state, cleanTasksListAC(todolistId2));

    expect(Object.keys(endState).length).toBe(2);
    expect(endState[todolistId1].length).toBe(3);
    expect(endState[todolistId2].length).toBe(0);
});

test('task status should be changed correctly', () => {
    let newStatus = true;
    const endState = tasksReduser(state, setNewTaskStatusAC(todolistId1, '1', newStatus));

    expect(endState[todolistId1].length).toBe(3);
    expect(endState[todolistId1][0].isDone).toBe(newStatus);
    expect(Object.keys(endState).length).toBe(2);
    expect(endState[todolistId2][0].isDone).toBe(true);

    newStatus = false;
    const endState2 = tasksReduser(state, setNewTaskStatusAC(todolistId1, '1', newStatus));
    expect(endState2[todolistId1][0].isDone).toBe(newStatus);
    expect(endState[todolistId2][0].isDone).toBe(true);
});

test('delete all tasks from todolist', () => {
    const endState = tasksReduser(state, deleteTasksListAC(todolistId1));

    expect(Object.keys(endState).length).toBe(1);
    expect(Object.keys(endState)[0]).toBe(todolistId2);
});

test('create new tasks list to correct todolist', () => {
    const todolistId3 = v4();
    const endState = tasksReduser(state, createTasksListAC(todolistId3));

    expect(Object.keys(endState).length).toBe(3);
    expect(Object.keys(endState)[2]).toBe(todolistId2);
    expect(Object.keys(endState)[0]).toBe(todolistId3);
    expect(endState[todolistId3].length).toBe(0);

    //if rewrite arr;
    const endState2 = tasksReduser(state, createTasksListAC(todolistId1));
    expect(Object.keys(endState2).length).toBe(2);
    expect(Object.keys(endState2)[0]).toBe(todolistId1);
});