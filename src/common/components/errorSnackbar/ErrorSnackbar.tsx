import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Alert } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../app/store';
import { setAppError } from '../../../app/reducers/appSlice';

export function ErrorSnackbar() {
  const error = useAppSelector((state) => state.app.error);
  const dispatch = useAppDispatch();
  const isOpen = error !== null;

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(setAppError({ error: null }));
  };

  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button>
      <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <Snackbar
      open={isOpen}
      autoHideDuration={5000}
      onClose={handleClose}
      //message=""
      action={action}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
      <Alert onClose={handleClose} severity="error" variant="filled" sx={{ width: '100%' }}>
        {error}
      </Alert>
    </Snackbar>
  );
}
