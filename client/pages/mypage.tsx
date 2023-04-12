import React, { useContext } from "react";

import Layout from "../components/Layout";

import { DataContext } from "../src/DataContext";
import MypagePage from "../components/mypage";
import SignInPage from "../components/sign_in";

export default function ContactPage() {

  const { sharedData } = useContext(DataContext);

  return (
    <Layout>
      <div id="Mypage">
        {
          sharedData.devise.is_login ?
          <MypagePage /> : <SignInPage />
        }
      </div>
    </Layout>
  );
};
