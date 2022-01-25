import React, {
  useState,
  createContext,
  Dispatch,
  SetStateAction,
} from "react";
import MainDashboard from "./components/MainDashboard";
import RightBar from "./components/RightBar";
import Sidebar from "./components/Sidebar";
import Head from "next/head";

interface ContextInterface {
  route?: string;
  bookings?: object[];
  setRoute?: Dispatch<SetStateAction<string>>;
  setBookings?: Dispatch<SetStateAction<object[]>>;
}

export const AdminContext = createContext<ContextInterface>({});

const Admin = () => {
  const [route, setRoute] = useState<string>("tables");
  const [bookings, setBookings] = useState<object[]>([]);
  return (
    <>
      <Head>
        <title>My Rapid Chef</title>
        <link rel="icon" href="/favicon_256x256.png" />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <AdminContext.Provider value={{ route, setRoute, bookings, setBookings }}>
        <div className="flex h-screen w-screen bg-slate-100">
          <Sidebar />
          <MainDashboard />
        </div>
      </AdminContext.Provider>
    </>
  );
};

export default Admin;
