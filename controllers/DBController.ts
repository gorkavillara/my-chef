import { db } from "./firebase-config";
import {
  addDoc,
  doc,
  updateDoc,
  getDocs,
  collection,
  arrayUnion,
  query,
  where,
} from "firebase/firestore";
import { User, Store, Booking } from "../models";

export const getStoresByUserEmail = async ({
  userEmail,
}: {
  userEmail: string;
}) => {
  const sRef = collection(db, "stores");
  const s = await getDocs(sRef);
  const allStores = s.docs.map((item) => ({ ...item.data(), id: item.id }));
  const stores: Store[] = allStores.filter((st: Store) =>
    st.settings.users.find((us: User) => us.email === userEmail)
  );
  if (stores.length === 0) return false;
  const user: User = stores[0].settings.users.find(
    (us: User) => us.email === userEmail
  );
  return { stores, role: user.role };
};
export const getBookingsByStore = async ({ id }: { id: string }) => {
  const q = query(collection(db, "bookings"), where("store_id", "==", id));
  const querySnapshot = await getDocs(q);
  let bookings = [];
  querySnapshot.forEach((doc) => bookings.push({ ...doc.data(), id: doc.id }));
  return { bookings };
};

export const addNewMenu = async ({
  store,
  menu,
}: {
  store: Store;
  menu: object;
}) => {
  const storeRef = doc(db, "stores", store.id);
  await updateDoc(storeRef, {
    menus: arrayUnion(menu),
  });
  return true;
};

export const addNewBooking = async ({
  booking,
  store,
}: {
  booking: Booking;
  store: Store;
}) => {
  const r = await addDoc(collection(db, "bookings"), {
    ...booking,
    store_id: store.id,
  });
  console.log(r);
  return { booking };
};

export const saveNotesUrl = async ({
  url,
  booking,
  store,
}: {
  url: string;
  booking: Booking;
  store: Store;
}) => {
  if (url === "") return false;
};
