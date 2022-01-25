import { Booking } from "../models";

export const getBookingsByStore = ({ id }: { id: string }) => {};

export const initializeBookings = (bookings: Booking[]): Booking[] => {
  const bkngs: Booking[] = bookings;
  let newBookings = bkngs;
  bkngs.forEach((booking, i) => {
    const newBook = booking;
    const menu = newBook.menu;
    const dishes = menu.dishes.map((dish) => {
      return {
        ...dish,
        sideStatus: dish.side === true ? "pending" : "unnecessary",
        wineStatus: dish.wine === true ? "pending" : "unnecessary",
        juiceStatus: dish.juice === true ? "pending" : "unnecessary",
        done: false,
      };
    });
    newBook.menu.dishes = dishes;
    newBookings[i] = newBook;
  });
  return bkngs;
};
