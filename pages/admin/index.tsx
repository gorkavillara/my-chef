import React from "react";
import MainDashboard from "./components/MainDashboard";
import RightBar from "./components/RightBar";
import Sidebar from "./components/Sidebar";
import Head from "next/head";

const Admin = () => {
  return (
    <>
      <Head>
        <title>My Rapid Chef</title>
        <link rel="icon" href="/favicon_256x256.png" />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <div className="flex h-screen w-screen bg-slate-100">
        <Sidebar />
        <MainDashboard />
      </div>
    </>
  );
};

export default Admin;
