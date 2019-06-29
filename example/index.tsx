import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import useDraftDataApi from '../src';

type Payload = {
  readonly data: Readonly<{
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    avatar: string;
  }>;
};

const App = () => {
  const [
    {
      data: { data },
      isLoading,
    },
    doFetch,
  ] = useDraftDataApi<Payload>(
    'https://reqres.in/api/users/2',
    {
      data: { id: 0, email: '', first_name: '', last_name: '', avatar: '' },
    },
    (prevState, action) => action.draft
  );

  const { id, email, first_name, last_name, avatar } = data;

  return (
    <div>
      {isLoading ? (
        '...Loading'
      ) : (
        <>
          <p>id: {id}</p>
          <p>email: {email}</p>
          <p>name: {`${first_name} ${last_name}`}</p>
          <img src={avatar} />
        </>
      )}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
