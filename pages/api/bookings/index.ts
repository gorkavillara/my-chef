import { NextApiRequest, NextApiResponse } from "next";
import {
  getBookingsByStore,
  saveNotesUrl,
  addNewBooking,
  saveNotes,
  editBookingStatus,
  editBookingAllergies,
  setPairings,
  editBookingMenu,
  editBookingGreeting,
  changeTime,
  changeNationality,
  updateBookingDish,
  deleteBookingDish,
  changeTable,
} from "../../../controllers/DBController";

const Bookings = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    action,
    store,
    url,
    handwrittenNotesUrl,
    newNotes,
    newAllergies,
    booking,
    bookings,
    pairings,
    newMenu,
    greeted,
    time,
    nationality,
    newDish,
    newTable,
  } = req.body;
  if (action === "getByStore") {
    const r = await getBookingsByStore({ id: store.id });
    return res.status(200).json(r);
  } else if (action === "saveNotesUrl") {
    const r = await saveNotesUrl({ url, booking, store });
    return res.status(200).json(r);
  } else if (action === "newBooking") {
    const r = await addNewBooking({ booking, store });
    return res.status(200).json(r);
  } else if (action === "saveNotes") {
    const r = await saveNotes({ handwrittenNotesUrl, newNotes, booking });
    return res.status(200).json(r);
  } else if (action === "closeBooking") {
    const r = await editBookingStatus({
      booking,
      bookings,
      newStatus: "closed",
    });
    return res.status(200).json(r);
  } else if (action === "openBooking") {
    const r = await editBookingStatus({ booking, bookings, newStatus: "open" });
    return res.status(200).json(r);
  } else if (action === "updateMenu") {
    const r = await editBookingMenu({ booking, bookings, newMenu });
    return res.status(200).json(r);
  } else if (action === "updateGreeting") {
    const r = await editBookingGreeting({ booking, bookings, greeted });
    return res.status(200).json(r);
  } else if (action === "updateAllergies") {
    const r = await editBookingAllergies({ booking, bookings, newAllergies });
    return res.status(200).json(r);
  } else if (action === "setPairings") {
    const r = await setPairings({ booking, bookings, pairings });
    return res.status(200).json(r);
  } else if (action === "changeTime") {
    const r = await changeTime({ booking, bookings, time });
    return res.status(200).json(r);
  } else if (action === "changeNationality") {
    const r = await changeNationality({ booking, bookings, nationality });
    return res.status(200).json(r);
  } else if (action === "updateBookingDish") {
    const r = await updateBookingDish({ booking, bookings, newDish });
    return res.status(200).json(r);
  } else if (action === "deleteBookingDish") {
    const r = await deleteBookingDish({ booking, bookings, newDish });
    return res.status(200).json(r);
  } else if (action === "changeTable") {
    const r = await changeTable({ booking, bookings, newTable });
    return res.status(200).json(r);
  }
  return res.status(404).json(req.body);
};

export default Bookings;
