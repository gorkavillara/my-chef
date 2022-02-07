import React, {
  useState,
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";
import Head from "next/head";
import MainDashboard from "./views/MainDashboard";
import Sidebar from "./components/Sidebar";
import { Booking, Store, User } from "../../models";
import { initializeBookings } from "../../controllers/BookingsController";
import ModalController from "./components/ModalController";

import {
  query,
  collection,
  where,
  onSnapshot,
  Firestore,
  enableIndexedDbPersistence,
} from "firebase/firestore";
import { db } from "../../firebase/client";
import {
  getBookingsByStore,
  getStoresByUserEmail,
} from "../../controllers/DBController";

enableIndexedDbPersistence(db).catch((err) => {
  if (err.code == "failed-precondition") {
    // Multiple tabs open, persistence can only be enabled
    // in one tab at a a time.
    console.error(err.code);
  } else if (err.code == "unimplemented") {
    // The current browser does not support all of the
    // features required to enable persistence
    console.error(err.code);
  }
});

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
  user?: User;
  db?: Firestore;
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
    getStoresByUserEmail({ userEmail: user.email })
      .then((data: { stores: Store[]; role: string }) =>
        setStore(data.stores[0])
      )
      .catch((e) => console.error(e));
  }, []);

  useEffect(() => {
    if (!store) return;
    getBookingsByStore({ id: store.id }).then((data) => {
      const newBookings: Booking[] = initializeBookings(data.bookings);
      setBookings(newBookings);
    });
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
          user,
          activeRole,
          db,
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
