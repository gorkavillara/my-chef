import { NextApiRequest, NextApiResponse } from "next";
import { getStoresByUserEmail } from "../../../controllers/DBController";

type Data = {
  stores: object[];
  role?: string;
};

const Stores = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { action, user } = req.body;
  if (action === "getByStore") {
    const r = await getStoresByUserEmail({ userEmail: user.email });
    return res.status(200).json(r);
  }
  return res.status(404).json(req.body);
};

export default Stores;
