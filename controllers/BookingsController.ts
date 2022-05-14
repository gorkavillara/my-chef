import { Booking } from "../models"

export const initializeBookings = (bookings: Booking[]): Booking[] => {
    if (!bookings) return
    const bkngs: Booking[] = bookings
    let newBookings = bkngs
    bkngs.forEach((booking, i) => {
        const newBook = booking
        const menu = newBook.menu ? newBook.menu : null
        const dishes = menu
            ? menu.dishes?.map((dish) => {
                  return {
                      ...dish,
                      sideStatus:
                          dish.side === true ? "necessary" : "unnecessary",
                      wineStatus:
                          dish.wine === true ? "necessary" : "unnecessary",
                      juiceStatus:
                          dish.juice === true ? "necessary" : "unnecessary",
                      done: false,
                  }
              })
            : []
        if (menu) newBook.menu.dishes = dishes
        newBookings[i] = newBook
    })
    return bkngs
}
