import React from 'react';
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { FormikHelpers, useFormik } from 'formik';
import { useAppDispatch } from 'app/store';
import { Navigate } from 'react-router-dom';
import { PATH } from 'common/routes/PATH';
import { useSelector } from 'react-redux';
import { login, selectIsLoggedIn } from '../model/authSlice';
import { LoginParams } from '../api/authAPI.types';
import { BaseResponse } from 'common/types';

type ErrorsType = {
  email?: string;
  password?: string;
};

export const Login = () => {
  const dispatch = useAppDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    validate: (values) => {
      const errors: ErrorsType = {};
      if (!values.email) {
        errors.email = 'Required email';
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
      }
      if (!values.password) {
        errors.password = 'Required pass';
      }
      return errors;
    },
    onSubmit: (values: LoginParams, formikHelpers: FormikHelpers<LoginParams>) => {
      dispatch(login(values))
        .unwrap()
        .catch((error: BaseResponse) => {
          console.log(error);
          if (error.messages) {
            formikHelpers.setFieldError('password', error.messages[0]);
            // error.messages?.forEach((el) => {
            //   formikHelpers.setFieldError(el.field, el.error);
            // });
          }
        });
      //res.payload.
      // if (res.payload) {
      //   const errorMessage = res.payload as string;
      //   formikHelpers.setFieldError('password', errorMessage);
      // }
      //alert(JSON.stringify(values, null, 2))
      //formik.resetForm()
    },
  });

  if (isLoggedIn) {
    return <Navigate to={PATH.TODOLISTS} />;
  }

  return (
    <Grid container justifyContent={'center'}>
      <Grid item justifyContent={'center'}>
        <form onSubmit={formik.handleSubmit}>
          <FormControl>
            <FormLabel>
              <p>
                To log in get registered{' '}
                <a href={'https://social-network.samuraijs.com/'} target={'_blank'}>
                  here
                </a>
              </p>
              <p>or use common test account credentials:</p>
              <p>Email: free@samuraijs.com</p>
              <p>Password: free</p>
            </FormLabel>
            <FormGroup>
              <TextField label="Email" margin="normal" {...formik.getFieldProps('email')} />
              {formik.touched.email && formik.errors.email && (
                <div style={{ color: 'tomato' }}>{formik.errors.email}</div>
              )}
              <TextField type="password" label="Password" margin="normal" {...formik.getFieldProps('password')} />
              {formik.touched.password && formik.errors.password && (
                <div style={{ color: 'tomato' }}>{formik.errors.password}</div>
              )}
              <FormControlLabel
                label={'Remember me'}
                control={<Checkbox />}
                checked={formik.values.rememberMe}
                {...formik.getFieldProps('rememberMe')}
              />
              <Button type={'submit'} variant={'contained'} color={'primary'}>
                Login
              </Button>
            </FormGroup>
          </FormControl>
        </form>
      </Grid>
    </Grid>
  );
};
