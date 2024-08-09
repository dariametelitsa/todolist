export type UpdateTodolistTitle = {
  todolistId: string;
  title: string;
};

export type TodolistType = {
  addedDate: string;
  id: string;
  order: number;
  title: string;
};

export type ErrorResponseType = {
  statusCode: number;
  messages: [
    {
      message: string;
      field: string;
    },
  ];
  error: string;
};
