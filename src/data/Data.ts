import { TasksType, todoListType } from "./dataPropsTypes";
import { v1, v4 } from "uuid";

export const todolistId1 = v4();
export const todolistId2 = v4();

export const tasksArr: TasksType = {
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
    ]
};

export const todoListsData: todoListType[] = [
    {id: todolistId1, title: "What to learn", filter: 'active'},
    {id: todolistId2, title: "What to do", filter: 'all'},
]