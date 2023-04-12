import React, { useContext } from 'react';
import { Alert, Button, Form } from 'react-bootstrap';
import setting from '../setting';
import { DataContext } from '../src/DataContext';

export default function SignInPage() {

  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');

  const [error, setError] = React.useState<string | null>(null);

  const { sharedData, setSharedData } = useContext(DataContext);

  const Login = async (e) => {
    setError(null);
    e.preventDefault();
    const response = await fetch(`${setting.apiPath}/api/v1/auth/sign_in`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'cors',
      body: JSON.stringify({
        email,
        password,
      }),
    });
    if (response.status === 401) {
      setError('Invalid email or password');
      return;
    }
    if (response.status !== 200) {
      setError(`${response.status} ${response.statusText}`);
      return;
    }
    const response_headers = response.headers;

    console.log(response_headers);

    const uid = response.headers.get('uid');
    const client = response.headers.get('client');
    const access_token = response.headers.get('access-token');


    if (!uid) {
      setError(`Invalid response: uid is ${uid}`);
      return;
    }
    if (!client) {
      setError(`Invalid response: client is ${client}`);
      return;
    }
    if (!access_token) {
      setError(`Invalid response: access_token is ${access_token}`);
      return;
    }

    setSharedData({
      ...sharedData,
      devise: {
        ...sharedData.devise,
        is_login: true,
        uid,
        client,
        access_token,
      },
    });

  };

  return (
    <>
      <h1>Sign in</h1>
      <Form>
        <Form.Group className='mt-3'>
          <Form.Label>Mail</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className='mt-3'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button
          variant="primary"
          className='d-block mt-3 m-auto'
          type="submit"
          onClick={Login}
        >
          Sign in
        </Button>
      </Form>
      {
        error && (
          <Alert variant='danger' className='mt-3'>
            {error}
          </Alert>
        )
      }
    </>
  );
};
