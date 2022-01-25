import { db } from "./firebase-config";
import {
  doc,
  setDoc,
  query,
  getDocs,
  collection,
  where,
  deleteDoc,
  addDoc,
  getDoc,
} from "firebase/firestore";

interface User {
    email: string;
}

export const getStoresByUserEmail = async ({
  userEmail,
}: {
  userEmail: string;
}) => {
  const sRef = collection(db, "stores");
  const s = await getDocs(sRef);
  const allStores = s.docs.map((item) => ({ ...item.data(), id: item.id }));
  const stores = allStores.filter((st) =>
    st.settings.users.find((us: User) => us.email === userEmail)
  );
  if (stores.length === 0) return { stores };
  const user = stores[0].settings.users.find((us) => us.email === userEmail);
  return { stores, role: user.role };
};
