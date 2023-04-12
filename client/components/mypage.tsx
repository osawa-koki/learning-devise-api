import React, { useContext, useEffect, useState } from 'react';

import { Alert, Button, Form } from 'react-bootstrap';

import setting from '../setting';
import { DataContext } from '../src/DataContext';

export default function MypagePage() {

  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [message, setMessage] = useState<['info' | 'danger', string] | null>(null);

  const { sharedData, setSharedData } = useContext(DataContext);

  const Signout = async () => {
    if (sharedData.devise.is_login === false) return;
    if (window.confirm('Are you sure to sign out?') === false) return;
    const response = await fetch(`${setting.apiPath}/api/v1/auth/sign_out`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'uid': sharedData.devise.uid,
        'client': sharedData.devise.client,
        'access-token': sharedData.devise.access_token,
      },
    });
    if (!response.ok) return;
    localStorage.removeItem('devise');
    setSharedData({
      devise: {
        is_login: false,
        uid: null,
        access_token: null,
        client: null,
      }
    });
  };

  useEffect(() => {
    (async () => {
      if (sharedData.devise.is_login === false) return;
      const res = await fetch(`${setting.apiPath}/api/v1/users`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'uid': sharedData.devise.uid,
          'client': sharedData.devise.client,
          'access-token': sharedData.devise.access_token,
        },
      });
      const data = await res.json();
      setName(data.name);
      setNickname(data.nickname);
      setEmail(data.email);
    })();
  }, [sharedData.devise.access_token, sharedData.devise.client, sharedData.devise.is_login, sharedData.devise.uid]);

  return (
    <>
      <h1>Mypage</h1>
      <Form>
        <Form.Group className='mt-3'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group className='mt-3'>
          <Form.Label>Nickname</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter nickname'
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
        </Form.Group>
        <Form.Group className='mt-3'>
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className='mt-3'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button
          variant='primary'
          className='d-block mt-3 m-auto'
          onClick={async () => {
            setMessage(null);
            await new Promise((resolve) => setTimeout(resolve, setting.smallWaitingTime));
            const body = {
              name,
              nickname,
              email,
            };
            if (password !== '') body['password'] = password;
            const res = await fetch(`${setting.apiPath}/api/v1/auth`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
                'uid': sharedData.devise.uid,
                'client': sharedData.devise.client,
                'access-token': sharedData.devise.access_token,
              },
              body: JSON.stringify(body),
            });
            if (res.ok) {
              setMessage(['info', 'Update success!']);
            } else {
              setMessage(['danger', 'Update failed...']);
            }
            setTimeout(() => setMessage(null), setting.waitingTime);
          }}
        >
          Update
        </Button>
      </Form>
      {
        message !== null &&
        <Alert variant={message[0]} className='mt-3'>
          {message[1]}
        </Alert>
      }
      <Button
        variant='outline-danger'
        size='sm'
        className='d-block mt-5 m-auto w-100'
        onClick={Signout}
      >
        Sign out
      </Button>
    </>
  );
};
