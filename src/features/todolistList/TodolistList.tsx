import React, { useCallback } from 'react'
import Grid from '@mui/material/Unstable_Grid2'
import { AddItem } from '../../components/addItem/AddItem'
import Todolist from './todolist/Todolist'
import { useAppWithRedux } from '../../app/hooks/useAppWithRedux'
import { Navigate } from 'react-router-dom'
import { PATH } from '../../routes/PATH'
import { useAppDispatch, useAppSelector } from '../../app/store'
import { addTodolistTC } from './thunk/todolistsThunks'

// type TodolistListProps = {
//     todoLists: TodoListDomainType[]
//     addTodolist: (title: string) => void
// };
export const TodolistList: React.FC = () => {
  //const { addTodolist, todoLists, isLoggedIn } = useAppWithRedux()
  const todoLists = useAppSelector((state) => state.todolists)
  const isLoggedIn = useAppSelector<boolean>((state) => state.auth.isLoggedIn)
  const dispatch = useAppDispatch()

  const addTodolist = useCallback(
    (title: string) => {
      dispatch(addTodolistTC(title))
    },
    [dispatch]
  )

  if (!isLoggedIn) {
    return <Navigate to={PATH.LOGIN} />
  }

  return (
    <>
      <Grid container spacing={2} sx={{ m: 0, mb: 5 }}>
        <AddItem addItem={addTodolist}></AddItem>
      </Grid>

      <Grid container spacing={3}>
        {todoLists.map((td) => {
          return <Todolist todolist={td} key={td.id} />
        })}
      </Grid>
    </>
  )
}
