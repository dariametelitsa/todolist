import React, { useEffect, useState } from 'react';
import { todolistAPI } from 'features/todolistList/api/todolistAPI';
import { taskAPI } from 'features/todolistList/api/taskAPI';

export default {
  title: 'API',
};

// export const GetTodolists = () => {
//   const [state, setState] = useState<any>(null);
//   useEffect(() => {
//     todolistAPI.getTodolist().then((response) => {
//       console.log(response.data);
//       setState(response.data);
//     });
//   }, []);
//   return <div>{JSON.stringify(state)}</div>;
// };

export const CreateTodolist = () => {
  const [state, setState] = useState<any>(null);
  const [title, setTitle] = useState<any>('');
  const onClickHandler = () => {
    todolistAPI
      .addTodolist(title)
      .then((res) => {
        setState(res.data);
      })
      .catch((err) => {
        console.log(err);
        setState(null);
      });
  };
  return (
    <div>
      <input value={title} onChange={(e) => setTitle(e.target.value)} />
      <button onClick={onClickHandler} disabled={!title}>
        Add todolist
      </button>
      <p>{JSON.stringify(state)}</p>
    </div>
  );
};

export const DeleteTodolist = () => {
  const [state, setState] = useState<any>(null);
  const [todoId, setTodoId] = useState<any>('');

  const onClickHandler = () => {
    todolistAPI
      .deleteTodolist(todoId)
      .then((res) => {
        setState(res.data);
      })
      .catch((err) => {
        console.log(err);
        setState(null);
      });
  };

  return (
    <div>
      <input value={todoId} onChange={(e) => setTodoId(e.target.value)} />
      <button onClick={onClickHandler} disabled={!todoId}>
        Delete todolist
      </button>
      <p>{JSON.stringify(state)}</p>
    </div>
  );
};

export const UpdateTodolistTitle = () => {
  const [state, setState] = useState<any>(null);
  const [todolistId, setTodoId] = useState<any>('');
  const [title, setTitle] = useState<any>('');

  const onClickHandler = () => {
    todolistAPI
      .updateTodolist({ todolistId, title })
      .then((res) => {
        setState(res.data);
      })
      .catch((err) => {
        console.log(err);
        setState(null);
      });
  };

  return (
    <div>
      <input placeholder={'Todolist ID'} value={todolistId} onChange={(e) => setTodoId(e.target.value)} />
      <input placeholder={'Title'} value={title} onChange={(e) => setTitle(e.target.value)} />
      <button onClick={onClickHandler} disabled={!todolistId || !title}>
        Update todolist
      </button>
      <p>{JSON.stringify(state)}</p>
    </div>
  );
};

export const GetTasksForTodolist = () => {
  const [state, setState] = useState<any>(null);
  const [todoId, setTodoId] = useState<any>('');

  const onClickHandler = () => {
    taskAPI.getTasks(todoId).then((res) => {
      setState(res.data);
    });
  };

  return (
    <div>
      <input placeholder={'ID todo'} value={todoId} onChange={(e) => setTodoId(e.target.value)} />
      <button onClick={onClickHandler} disabled={!todoId}>
        Get tasks
      </button>
      <p>{JSON.stringify(state)}</p>
    </div>
  );
};

export const CreateTaskForTodolist = () => {
  const [state, setState] = useState<any>(null);
  const [todolistId, setTodoId] = useState<any>('');
  const [title, setTitle] = useState<any>('');

  const onClickHandler = () => {
    taskAPI.addTask({ todolistId, title }).then((res) => {
      setState(res.data);
    });
  };
  return (
    <div>
      <input placeholder={'ID todo'} value={todolistId} onChange={(e) => setTodoId(e.target.value)} />
      <input placeholder={'title'} value={title} onChange={(e) => setTitle(e.target.value)} />
      <button onClick={onClickHandler} disabled={!title || !todolistId}>
        Add task
      </button>
      <p>{JSON.stringify(state)}</p>
    </div>
  );
};

export const DeleteTaskForTodolist = () => {
  const [state, setState] = useState<any>(null);
  const [todolistId, setTodoId] = useState<any>('');
  const [taskId, setTaskId] = useState<any>('');

  const onClickHandler = () => {
    taskAPI.deleteTask({ todolistId, taskId }).then((res) => {
      setState(res.data);
    });
  };

  return (
    <div>
      <input placeholder={'todolist ID'} value={todolistId} onChange={(e) => setTodoId(e.target.value)} />
      <input placeholder={'task ID'} value={taskId} onChange={(e) => setTaskId(e.target.value)} />
      <button onClick={onClickHandler} disabled={!todolistId || !taskId}>
        Delete task
      </button>
      <p>{JSON.stringify(state)}</p>
    </div>
  );
};

export const UpdateTaskForTodolistTitle = () => {
  const [state, setState] = useState<any>(null);
  const [todoId, setTodoId] = useState<any>('');
  const [taskId, setTaskId] = useState<any>('');
  const [title, setTitle] = useState<any>('');

  const onClickHandler = () => {
    taskAPI.updateTask(todoId, taskId, title).then((res) => {
      setState(res.data);
    });
  };

  return (
    <div>
      <input placeholder={'todolist ID'} value={todoId} onChange={(e) => setTodoId(e.target.value)} />
      <input placeholder={'task ID'} value={taskId} onChange={(e) => setTaskId(e.target.value)} />
      <input placeholder={'Title todo'} value={title} onChange={(e) => setTitle(e.target.value)} />
      <button onClick={onClickHandler} disabled={!todoId || !title || !taskId}>
        Update todolist
      </button>
      <p>{JSON.stringify(state)}</p>
    </div>
  );
};
