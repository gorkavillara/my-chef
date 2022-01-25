import { Timestamp } from "firebase/firestore";

export interface User {
  email: string;
  name: string;
  role: string;
}

export interface Booking {
  allergies?: string[];
  name: string;
  nationality: string;
  notes: string;
  pax: number;
  table: Table;
  time: Timestamp;
  menu: Menu;
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
  sideStatus?: string;
  wineStatus?: string;
  juiceStatus?: string;
  done?: boolean;
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
}
