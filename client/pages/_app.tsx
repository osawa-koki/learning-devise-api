import React, { useEffect } from 'react';
import { AppProps } from 'next/app';
import { useState } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';

import '../styles/styles.scss';
import '../styles/menu.scss';

import '../styles/index.scss';
import '../styles/about.scss';

import Head from 'next/head';

import setting from '../setting';
import { DataContext } from '../src/DataContext';
import SharedData from '../src/SharedData';

export default function MyApp({ Component, pageProps }: AppProps) {

  const [sharedData, setSharedData] = useState<SharedData>({
    devise: {
      is_login: false,
      uid: null,
      access_token: null,
      client: null,
    }
  });

  useEffect(() => {

    (async () => {
      const devise = localStorage.getItem('devise');
      if (!devise) return;
      const deviseJson = JSON.parse(devise);
      const response = await fetch(`${setting.apiPath}/api/v1/users`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'uid': deviseJson.uid,
          'client': deviseJson.client,
          'access-token': deviseJson.access_token,
        },
      });
      if (!response.ok) return;
      console.log('Retrieved devise from localStorage');
      setSharedData({
        devise: {
          is_login: true,
          uid: deviseJson.uid,
          access_token: deviseJson.access_token,
          client: deviseJson.client,
        }
      });
    })();
  }, []);

  useEffect(() => {
    if (sharedData.devise.is_login === false) return;
    localStorage.setItem('devise', JSON.stringify(sharedData.devise));
    console.log('Saved devise to localStorage');
  }, [sharedData.devise])


  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>{setting.title}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" type="image/png" href={`${setting.basePath}/favicon.ico`} />
      </Head>
      <DataContext.Provider value={{sharedData, setSharedData}}>
        <Component {...pageProps} />
      </DataContext.Provider>
    </>
  );
};
