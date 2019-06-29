import axios from 'axios';
import React from 'react';
import dataFetchReducer, { FetchAction, FetchState } from './dataFetchReducer';
import useDraftReducer, { DraftReducer } from 'use-draft-reducer';

const useDraftDataApi = <T extends object = object>(
  initialUrl: string,
  initialData: T,
  draftReducer?: DraftReducer<FetchState, FetchAction>
): [FetchState<T>, (url: string) => void] => {
  const [url, setUrl] = React.useState(initialUrl);

  const [state, dispatch] = useDraftReducer(
    dataFetchReducer,
    {
      isLoading: true,
      isError: false,
      error: null,
      data: initialData,
    },
    draftReducer
  );

  React.useEffect(() => {
    let didCancel = false;

    const fetchData = async () => {
      dispatch({ type: 'FETCH_INIT' });

      try {
        const result = await axios(url);

        if (!didCancel) {
          dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
        }
      } catch (error) {
        if (!didCancel) {
          dispatch({ type: 'FETCH_FAILURE', payload: error });
        }
      }
    };

    fetchData();

    return () => {
      didCancel = true;
    };
  }, [dispatch, url]);

  return [state as FetchState<T>, setUrl];
};

export default useDraftDataApi;
