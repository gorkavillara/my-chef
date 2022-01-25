import React, {
  useState,
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";
import MainDashboard from "./components/MainDashboard";
import RightBar from "./components/RightBar";
import Sidebar from "./components/Sidebar";
import Head from "next/head";
import axios from "axios";
import Rodal from "rodal";
import "rodal/lib/rodal.css";
import { Booking } from "../../models";
import { initializeBookings } from "../../controllers/BookingsController";
import FormNewBooking from "./components/FormNewBooking";

interface ContextInterface {
  route?: string;
  bookings?: object[];
  setRoute?: Dispatch<SetStateAction<string>>;
  setBookings?: Dispatch<SetStateAction<object[]>>;
  openModal?: Function;
}

export const AdminContext = createContext<ContextInterface>({});

const Admin = () => {
  const [route, setRoute] = useState<string>("tables");
  const [bookings, setBookings] = useState<object[]>([]);
  const [activeModal, setActiveModal] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<string>("");

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
        setBookings(newBookings);
      })
      .catch((e) => console.log(e));
  }, []);

  const openModal = (content: string) => {
    setModalContent(content);
    setActiveModal(true);
  };
  const closeModal = () => {
    setModalContent("");
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
        value={{ route, setRoute, bookings, setBookings, openModal }}
      >
        <div className="flex h-screen w-screen bg-slate-100">
          <Sidebar />
          <MainDashboard />
        </div>
      </AdminContext.Provider>
      <Rodal
        visible={activeModal}
        onClose={closeModal}
        animation="slideUp"
        width={800}
        height={600}
      >
        {modalContent === "newBooking" && <FormNewBooking />}
      </Rodal>
    </>
  );
};

export default Admin;
