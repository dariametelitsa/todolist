import { useAppDispatch } from 'app/store';
import { useMemo } from 'react';
import { ActionCreatorsMapObject, bindActionCreators } from 'redux';

export const useActions = <T extends ActionCreatorsMapObject>(action: T) => {
  const dispatch = useAppDispatch();

  const boundActions = useMemo(() => {
    return bindActionCreators(action, dispatch);
  }, [action, dispatch]);
};
