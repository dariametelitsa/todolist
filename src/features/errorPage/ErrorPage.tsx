// @flow
import * as React from 'react'
import { PATH } from '../../routes/PATH'
import { Link } from 'react-router-dom'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'

export const ErrorPage = () => {
  return (
    <Grid container justifyContent={'center'}>
      <Grid item justifyContent={'center'}>
        <h1>Not found</h1>
        <Button variant="outlined" href="#outlined-buttons">
          <Link to={PATH.ROOT} style={{ color: 'inherit' }}>
            На главную
          </Link>
        </Button>
      </Grid>
    </Grid>
  )
}
