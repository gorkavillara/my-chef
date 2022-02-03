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
  setDoc,
} from "firebase/firestore";
import { User, Store, Booking, Dish, Menu, Pairing } from "../models";

export const registerNewTable = async ({ table, store }) => {
  const storeRef = doc(db, "stores", store.id);
  await updateDoc(storeRef, {
    tables: arrayUnion(table),
  });
  const newStore = { ...store, tables: [...store.tables, table] };
  return { store: newStore };
};

export const registerMultipleTables = async ({ tables, store }) => {
  const newStore = { ...store, tables: [...store.tables, ...tables] };
  await setDoc(doc(db, "stores", store.id), newStore);
  return { store: newStore };
};
export const registerNewDish = async ({ dish, store }) => {
  const storeRef = doc(db, "stores", store.id);
  await updateDoc(storeRef, {
    dishes: arrayUnion(dish),
  });
  const newStore = { ...store, dishes: [...store.dishes, dish] };
  return { store: newStore };
};

export const updateDish = async ({ dish, store }) => {
  const dishes = store.dishes.map((d: Dish) =>
    d.name === dish.name ? dish : d
  );
  const newStore = { ...store, dishes };
  await setDoc(doc(db, "stores", store.id), newStore);
  return { store: newStore };
};

export const deleteDish = async ({ dish, store }) => {
  const dishes = store.dishes.filter((d: Dish) => dish.name !== d.name);
  const newStore = { ...store, dishes };
  await setDoc(doc(db, "stores", store.id), newStore);
  return { store: newStore };
};

export const registerNewPairing = async ({ pairing, store }) => {
  const storeRef = doc(db, "stores", store.id);
  await updateDoc(storeRef, {
    pairings: arrayUnion(pairing),
  });
  const newStore = { ...store, pairings: [...store.pairings, pairing] };
  return { store: newStore };
};

export const updatePairing = async ({ pairing, store }) => {
  const pairings = store.pairings.map((p: Pairing) =>
    p.name === pairing.name ? pairing : p
  );
  const newStore = { ...store, pairings };
  await setDoc(doc(db, "stores", store.id), newStore);
  return { store: newStore };
};
export const deletePairing = async ({ pairing, store }) => {
  const pairings = store.pairings.filter(
    (pair: Pairing) => pair.name !== pairing.name
  );
  const newStore = { ...store, pairings };
  await setDoc(doc(db, "stores", store.id), newStore);
  return { store: newStore };
};

export const registerNewMenu = async ({ menu, store }) => {
  const storeRef = doc(db, "stores", store.id);
  await updateDoc(storeRef, {
    menus: arrayUnion(menu),
  });
  const newStore = { ...store, menus: [...store.menus, menu] };
  return { store: newStore };
};

export const updateMenu = async ({ menu, store }) => {
  const menus = store.menus.map((m: Menu) => (m.name === menu.name ? menu : m));
  const newStore = { ...store, menus };
  await setDoc(doc(db, "stores", store.id), newStore);
  return { store: newStore };
};

export const deleteMenu = async ({ menu, store }) => {
  const menus = store.menus.filter((m: Menu) => menu.name !== m.name);
  const newStore = { ...store, menus };
  await setDoc(doc(db, "stores", store.id), newStore);
  return { store: newStore };
};

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

export const saveNotes = async ({
  handwrittenNotesUrl,
  booking,
  newNotes,
}: {
  handwrittenNotesUrl: string;
  booking: Booking;
  newNotes: string;
}) => {
  if (handwrittenNotesUrl === "") return false;
  const newBooking = {
    ...booking,
    notes: newNotes,
    handwrittenNotesUrl,
  };
  await setDoc(doc(db, "bookings", booking.id), newBooking);
  return { booking: newBooking };
};

export const editBookingStatus = async ({
  booking,
  bookings,
  newStatus,
}: {
  booking: Booking;
  bookings: Booking[];
  newStatus: string;
}) => {
  const newBooking = { ...booking, status: newStatus };
  await setDoc(doc(db, "bookings", booking.id), newBooking);
  const newBookings = bookings.map((book) =>
    book.id === booking.id ? newBooking : book
  );
  return { bookings: newBookings };
};

export const editBookingAllergies = async ({
  booking,
  bookings,
  newAllergies,
}: {
  booking: Booking;
  bookings: Booking[];
  newAllergies: string[];
}) => {
  const newBooking = { ...booking, allergies: newAllergies };
  await setDoc(doc(db, "bookings", booking.id), newBooking);
  const newBookings = bookings.map((book) =>
    book.id === booking.id ? newBooking : book
  );
  return { bookings: newBookings };
};

export const editBookingMenu = async ({
  booking,
  bookings,
  newMenu,
}: {
  booking: Booking;
  bookings: Booking[];
  newMenu: Menu;
}) => {
  const newBooking = { ...booking, menu: newMenu };
  await setDoc(doc(db, "bookings", booking.id), newBooking);
  const newBookings = bookings.map((book) =>
    book.id === booking.id ? newBooking : book
  );
  return { bookings: newBookings };
};

export const editBookingGreeting = async ({
  booking,
  bookings,
  greeted,
}: {
  booking: Booking;
  bookings: Booking[];
  greeted: string;
}) => {
  const newBooking = { ...booking, greeted };
  await setDoc(doc(db, "bookings", booking.id), newBooking);
  const newBookings = bookings.map((book) =>
    book.id === booking.id ? newBooking : book
  );
  return { bookings: newBookings };
};

export const setPairings = async ({
  booking,
  bookings,
  pairings,
}: {
  booking: Booking;
  bookings: Booking[];
  pairings: Pairing[];
}) => {
  const newBooking = { ...booking, pairings };
  await setDoc(doc(db, "bookings", booking.id), newBooking);
  const newBookings = bookings.map((book) =>
    book.id === booking.id ? newBooking : book
  );
  return { bookings: newBookings };
};
