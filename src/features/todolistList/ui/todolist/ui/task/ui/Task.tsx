import * as React from 'react';
import { getListItemSx } from 'features/todolistList/ui/todolist/ui/Todolist.styles';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ListItem from '@mui/material/ListItem';
import { useTask } from 'features/todolistList/ui/todolist/ui/task/lib/useTask';
import { AppStatus } from 'app/model/appSlice';
import { TaskStatuses } from 'common/enums';
import { EditableSpan } from 'common/components/editableSpan/EditableSpan';
import { Task as TaskType } from 'features/todolistList/api/taskAPI.types';

type Props = {
  task: TaskType;
  todolistId: string;
  entityStatus: AppStatus;
};

const Task = React.memo(({ todolistId, task, entityStatus }: Props) => {
  const { removeTaskHandler, changeTaskStatusHandler, changeTaskTitleHandler } = useTask(todolistId);
  const isDisable = entityStatus === 'loading';

  return (
    <ListItem key={task.id} sx={getListItemSx(task.status === TaskStatuses.Completed)}>
      <label style={{ width: '100%', display: 'flex', alignItems: 'center' }}>
        <Checkbox
          checked={task.status === TaskStatuses.Completed}
          onChange={(e) => changeTaskStatusHandler(task.id, e.currentTarget.checked)}
          disabled={isDisable}
        />
        <EditableSpan
          oldTitle={task.title}
          idToChange={task.id}
          updateItem={changeTaskTitleHandler}
          isDisabled={isDisable}
        />
      </label>
      <IconButton aria-label="delete" onClick={() => removeTaskHandler(task.id)} disabled={isDisable}>
        <DeleteOutlineIcon />
      </IconButton>
    </ListItem>
  );
});

export default Task;
