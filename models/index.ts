import { Timestamp } from "firebase/firestore";

export interface User {
  email: string;
  name: string;
  role: string;
}

export interface Booking {
  id: string;
  allergies?: string[];
  name: string;
  nationality: string;
  notes: string;
  pax: number;
  table: Table;
  time: any;
  menu: Menu;
  status: string;
  handwrittenNotesUrl?: string;
  pairings?: Pairing[];
  greeted?: string;
}

export interface User {
  name: string;
  email: string;
  role: string;
}

export interface Table {
  name: string;
}

export interface Menu {
  dishes: Dish[];
  name: string;
}

export interface Dish {
  name: string;
  side: boolean;
  wine: boolean;
  juice: boolean;
  products?: Product[];
  allergies?: string[];
  description?: string;
  recipe?: string;
  sideStatus?: string;
  wineStatus?: string;
  juiceStatus?: string;
  done?: boolean;
  status?: string;
}

export interface Product {
  name: string;
  allergies?: string[];
}

export interface Pairing {
  name: string;
  color: string;
}

export interface Store {
  id: string;
  bookings?: Booking[];
  menus?: Menu[];
  settings?: {
    users: User[];
    name: string;
    subscription: string;
  };
  tables?: Table[];
  products?: Product[];
  dishes?: Dish[];
  pairings?: Pairing[];
}
