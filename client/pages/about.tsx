import React from "react";
import Layout from "../components/Layout";

export default function AboutPage() {
  return (
    <Layout>
      <div id="About">
        <h1>Here, About page.</h1>
        <div className="mt-3">
          Deviseモジュールを使って、認証機能を実装しています。<br />
          認証機能とは「あなたは本当に〇〇さんですか？」という確認機能です。<br />
          <br />
          認証機能の実現には、<br />
          <ul>
            <li>ID/PW (記憶)</li>
            <li>トークン (記憶)</li>
            <li>指紋認証 (生体)</li>
            <li>顔認証 (生体)</li>
            <li>ワンタイムパスワード (所有)</li>
          </ul>
          など、様々な方法があります。<br />
          <br />
          今回は、もっとも原始的なID/PWを使った認証機能を実装しています。
        </div>
      </div>
    </Layout>
  );
};
