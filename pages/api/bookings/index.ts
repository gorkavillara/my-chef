import { NextApiRequest, NextApiResponse } from "next";
import {
  getBookingsByStore,
  saveNotesUrl,
  addNewBooking,
  saveNotes
} from "../../../controllers/DBController";

const Bookings = async (req: NextApiRequest, res: NextApiResponse) => {
  const { action, store, url, handwrittenNotesUrl, newNotes, booking } =
    req.body;
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
  }
  return res.status(404).json(req.body);
};

export default Bookings;
