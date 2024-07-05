import * as React from 'react'
import { getListItemSx } from '../Todolist.styles'
import styles from '../../../../components/trash/todolist/Todolist.module.scss'
import Checkbox from '@mui/material/Checkbox'
import { EditableSpan } from '../../../../components/editableSpan/EditableSpan'
import IconButton from '@mui/material/IconButton'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import ListItem from '@mui/material/ListItem'
import { TaskStatuses, TaskType } from '../../../../api/todolist-api'
import { useTask } from './hooks/useTask'
import { AppStatusTypes } from '../../../../app/reducers/appReducer'

type TasksProps = {
  task: TaskType
  todolistId: string
  entityStatus: AppStatusTypes
}
export const Task = React.memo(({ todolistId, task, entityStatus }: TasksProps) => {
  const { removeTaskHandler, changeTaskStatusHandler, changeTaskTitleHandler } = useTask(todolistId)
  const isDisable = entityStatus === 'loading'

  return (
    <ListItem key={task.id} sx={getListItemSx(task.status === TaskStatuses.Completed)}>
      <label className={styles.label}>
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
  )
})
