import React, {
  useState,
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";
import axios from "axios";
import Head from "next/head";
import MainDashboard from "./views/MainDashboard";
import Sidebar from "./components/Sidebar";
import { Booking, Store } from "../../models";
import { initializeBookings } from "../../controllers/BookingsController";
import ModalController from "./components/ModalController";

import { query, collection, where, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/client";

interface ContextInterface {
  route?: string;
  bookings?: Booking[];
  setRoute?: Dispatch<SetStateAction<string>>;
  setBookings?: Dispatch<SetStateAction<object[]>>;
  openModal?: Function;
  closeModal?: Function;
  store?: Store;
  setStore?: Dispatch<SetStateAction<Store>>;
  date?: Date;
  setDate?: Dispatch<SetStateAction<Date>>;
  activeRole?: string;
}

export const AdminContext = createContext<ContextInterface>({});

const Admin = ({ user }) => {
  const [route, setRoute] = useState<string>("tables");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [activeModal, setActiveModal] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<string>("");
  const [modalData, setModalData] = useState<object>({});
  const [store, setStore] = useState<Store>();
  const [date, setDate] = useState<Date>(new Date());
  const [activeRole, setActiveRole] = useState<string>("");

  const goBackFunction = (event: any) => {
    event.preventDefault();
    setRoute("tables");
    closeModal();
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.history.pushState(null, null, window.location.pathname);
    window.addEventListener("popstate", goBackFunction);
    window.addEventListener("beforeunload", goBackFunction);
    return () => {
      window.removeEventListener("popstate", goBackFunction);
      window.removeEventListener("beforeunload", goBackFunction);
    };
  }, []);

  useEffect(() => {
    if (!store) return;
    const qRef = query(
      collection(db, "bookings"),
      where("store_id", "==", store.id)
    );
    const unsubscribe = onSnapshot(qRef, (docs) => {
      let storeBookings = [];
      docs.forEach((doc) => storeBookings.push({ ...doc.data(), id: doc.id }));
      setBookings(storeBookings);
    });
    return unsubscribe;
  }, [store]);

  useEffect(() => {
    if (!store) return;
    const us = store.settings.users.find((us) => user.email === us.email);
    setActiveRole(us.role);
  }, [store]);

  useEffect(() => {
    axios
      .post("/api/stores", {
        action: "getByEmail",
        user: { email: "gorkavillara@gmail.com" },
      })
      .then((r) => {
        const newBookings: Booking[] = initializeBookings(
          r.data.stores[0].bookings
        );
        setStore(r.data.stores[0]);
      })
      .catch((e) => console.log(e));
  }, []);

  useEffect(() => {
    if (!store) return;
    axios
      .post("/api/bookings", {
        action: "getByStore",
        store,
      })
      .then((r) => {
        const newBookings: Booking[] = initializeBookings(r.data.bookings);
        setBookings(newBookings);
      })
      .catch((e) => console.log(e));
  }, [store]);

  const openModal = (content: string, data: object = {}) => {
    setModalContent(content);
    setModalData(data);
    setActiveModal(true);
  };
  const closeModal = () => {
    setActiveModal(false);
  };
  return (
    <>
      <Head>
        <title>My Rapid Chef</title>
        <link rel="icon" href="/favicon_256x256.png" />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <AdminContext.Provider
        value={{
          route,
          setRoute,
          bookings,
          setBookings,
          openModal,
          closeModal,
          store,
          setStore,
          date,
          setDate,
          activeRole,
        }}
      >
        <div className="flex h-screen w-screen bg-slate-100 scroll-hidden">
          <Sidebar />
          <MainDashboard />
        </div>
        <ModalController
          visible={activeModal}
          onClose={closeModal}
          modalContent={modalContent}
          data={modalData}
        />
      </AdminContext.Provider>
    </>
  );
};

export default Admin;
