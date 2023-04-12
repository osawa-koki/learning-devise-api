import React, { useContext, useState } from "react";

import Layout from "../components/Layout";

import { DataContext } from "../src/DataContext";
import MypagePage from "../components/mypage";
import SignInPage from "../components/sign_in";
import { Button } from "react-bootstrap";
import SignUpPage from "../components/sign_up";

export default function ContactPage() {

  const [tab, setTab] = useState<'sign_up' | 'sign_in'>('sign_in');

  const { sharedData } = useContext(DataContext);

  return (
    <Layout>
      <div id="Mypage">
        {
          sharedData.devise.is_login ?
          <MypagePage /> : (
            <>
              <Button
                variant={tab === 'sign_in' ? 'primary' : 'outline-primary'}
                size="sm"
                onClick={() => setTab(tab === 'sign_in' ? 'sign_up' : 'sign_in')}
              >
              {tab === 'sign_in' ? 'Sign up' : 'Sign in'}
              </Button>
              <hr />
              {
                tab === 'sign_in' ? <SignInPage /> : <SignUpPage />
              }
            </>
          )
        }
      </div>
    </Layout>
  );
};
