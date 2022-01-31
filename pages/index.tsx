import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import Admin from "./admin";
import LoginPage from "./admin/views/LoginPage";

const Home: NextPage = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const us = localStorage.getItem("authUser");
    setUser(JSON.parse(us));
  });
  return (
    <div>
      <Head>
        <title>My Rapid Chef</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon_256x256.png" />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      {user ? (
        <Admin />
      ) : (
        <LoginPage setUser={setUser} />
      )}
    </div>
  );
};

export default Home;
