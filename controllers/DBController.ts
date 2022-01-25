import { db } from "./firebase-config";
import {
  doc,
  updateDoc,
  getDocs,
  collection,
  arrayUnion,
} from "firebase/firestore";
import { User, Store } from "../models";

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
