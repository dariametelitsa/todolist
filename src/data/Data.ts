import { TasksArrPropsType, todoListType } from "./dataPropsTypes";
import { v1, v4 } from "uuid";

export const tasksArr: Array<TasksArrPropsType> = [
    {
        id: v4(),
        title: "What to learn",
        taskBlock: [
            {id: v1(), title: "XP", isDone: false},
            {id: v1(), title: "DDD", isDone: true},
            {id: v1(), title: "Scrum", isDone: false}
        ]
    },
    {
        id: v4(),
        title: "What to do",
        taskBlock: [
            {id: v1(), title: "CSS&HTML", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "React", isDone: false},
            {id: v1(), title: "Redux", isDone: false}
        ]
    }
];

export const todoListsData: todoListType[] = [
    {id: v4(), title: "What to learn", filter: 'active'},
    {id: v4(), title: "What to do", filter: 'all'},
]