// import { NextApiRequest, NextApiResponse } from "next";

// type Data = {
//   bookings: object[];
// };

// const Bookings = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
//   const { action, store } = req.body;
//   if (action === "getByStore") {
//     const r = await getBookingsByStore({ id: store.id });
//     return res.status(200).json(r);
//   }
//   return res.status(404).json(req.body);
// };

// export default Bookings;
export {}