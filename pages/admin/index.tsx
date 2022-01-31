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

interface ContextInterface {
  route?: string;
  bookings?: object[];
  setRoute?: Dispatch<SetStateAction<string>>;
  setBookings?: Dispatch<SetStateAction<object[]>>;
  openModal?: Function;
  closeModal?: Function;
  store?: Store;
  setStore?: Dispatch<SetStateAction<Store>>;
}

export const AdminContext = createContext<ContextInterface>({});

const Admin = () => {
  const [route, setRoute] = useState<string>("tables");
  const [bookings, setBookings] = useState<object[]>([]);
  const [activeModal, setActiveModal] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<string>("");
  const [modalData, setModalData] = useState<object>({});
  const [store, setStore] = useState<Store>();

  const goBackFunction = (event) => {
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
  });

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
        }}
      >
        <div className="flex h-screen w-screen bg-slate-100">
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
