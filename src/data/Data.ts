import { TasksArrPropsType } from "./dataPropsTypes";
import { v1, v4 } from "uuid";

export const tasksArr: Array<TasksArrPropsType> = [
    {
        id: v4(),
        title: "What to learn",
        taskBlock: [
            {id: v4(), title: "XP", isDone: false},
            {id: v4(), title: "DDD", isDone: true},
            {id: v4(), title: "Scrum", isDone: false}
        ]
    },
    {
        id: v4(),
        title: "What to do",
        taskBlock: [
            {id: v4(), title: "CSS&HTML", isDone: true},
            {id: v4(), title: "JS", isDone: true},
            {id: v4(), title: "React", isDone: false},
            {id: v4(), title: "Redux", isDone: false}
        ]
    }
];