import { SxProps } from '@mui/material'

export const filterButtonsContainerSx: SxProps = {
  display: 'flex',
  justifyContent: 'space-between',
  mt: 1,
}

export const getListItemSx = (isDone: boolean | undefined): SxProps => ({
  p: 0,
  justifyContent: 'space-between',
  // opacity: isDone ? 0.5 : 1,
  textDecoration: isDone ? 'line-through' : 'none',
  color: (theme) => (isDone ? 'grey' : 'inherit'),
})
