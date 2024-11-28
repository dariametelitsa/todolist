import { useAppDispatch } from 'app/store';
import { useSelector } from 'react-redux';
import { FormikHelpers, useFormik } from 'formik';
import { LoginParams } from 'features/auth/api/authAPI.types';
import { BaseResponse } from 'common/types';
import { selectAppIsLogin, setIsLoggedIn } from 'app/model/appSlice';
import { useLoginMutation } from 'features/auth/api/authAPI';
import { StatusCode } from 'common/enums';

type Errors = {
  email?: string;
  password?: string;
};

export const useLogin = () => {
  const dispatch = useAppDispatch();
  const isLoggedIn = useSelector(selectAppIsLogin);
  const [login] = useLoginMutation();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    validate: (values) => {
      const errors: Errors = {};
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
      // dispatch(login(values))
      login(values)
        .unwrap()
        .then((res) => {
          if (res.resultCode === StatusCode.SUCCESS) {
            dispatch(setIsLoggedIn({ isLoggedIn: true }));
            localStorage.setItem('sn-token', res.data.token);
          }
        })
        .catch((error: BaseResponse) => {
          if (error.messages) {
            formikHelpers.setFieldError('password', error.messages[0]);
          }
        });
    },
  });

  return { formik, isLoggedIn };
};
