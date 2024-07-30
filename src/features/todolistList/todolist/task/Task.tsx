import * as React from 'react';
import { getListItemSx } from '../Todolist.styles';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ListItem from '@mui/material/ListItem';
import { useTask } from './hooks/useTask';
import { AppStatusTypes } from '../../../../app/reducers/appSlice';
import { TaskStatuses } from '../../../../common/enums/enums';
import { EditableSpan } from '../../../../common/components/editableSpan/EditableSpan';
import { TaskType } from '../../todolistAPI/todolistAPI.types';

type TasksProps = {
  task: TaskType;
  todolistId: string;
  entityStatus: AppStatusTypes;
};

export const Task = React.memo(({ todolistId, task, entityStatus }: TasksProps) => {
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
