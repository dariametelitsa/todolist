import { TasksArrPropsType } from "./dataPropsTypes";

// export const data1: TasksPropsType = {
//     title: "What to do",
//     tasks: [
//         {id: 1, title: "CSS&HTML", isDone: true},
//         {id: 2, title: "JS", isDone: true},
//         {id: 3, title: "React", isDone: false},
//         {id: 4, title: "Redux", isDone: false}
//     ]
// }
//
// export const data2: TasksPropsType =   {
//     title: "What to learn",
//     tasks: [
//         {id: 1, title: "HTML&CSS", isDone: true},
//         {id: 2, title: "JS", isDone: true}
//     ],
// }

export const tasksArr: Array<TasksArrPropsType> = [
    {
        id: 1,
        title: "What to learn",
        taskBlock: [
            {id: 1, title: "XP", isDone: false},
            {id: 2, title: "DDD", isDone: true},
            {id: 3, title: "Scrum", isDone: false}
        ]
    },
    {
        id: 2,
        title: "What to do",
        taskBlock: [
            {id: 1, title: "CSS&HTML", isDone: true},
            {id: 2, title: "JS", isDone: true},
            {id: 3, title: "React", isDone: false},
            {id: 4, title: "Redux", isDone: false}
        ]
    }
];