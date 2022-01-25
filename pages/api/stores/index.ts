import { NextApiRequest, NextApiResponse } from "next";
import { getStoresByUserEmail } from "../../../controllers/DBController";
import { initializeMenu } from "../../../controllers/StoresController";

const Stores = async (req: NextApiRequest, res: NextApiResponse) => {
  const { action, user } = req.body;
  if (action === "getByEmail") {
    const r = await getStoresByUserEmail({ userEmail: user.email });
    return res.status(200).json(r);
  } else if (action === "initializeMenu") {
    const r = await initializeMenu();
    return res.status(200).json(r);
  }
  return res.status(404).json(req.body);
};

export default Stores;
