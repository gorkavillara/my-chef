import { NextApiRequest, NextApiResponse } from "next";
import { registerNewPairing, updatePairing, deletePairing } from "../../../controllers/DBController";

const Tables = async (req: NextApiRequest, res: NextApiResponse) => {
  const { action, store, pairing } = req.body;
  if (action === "register") {
    const r = await registerNewPairing({ pairing, store });
    return res.status(200).json(r);
  } else if (action === "update") {
    const r = await updatePairing({ pairing, store });
    return res.status(200).json(r);
  } else if (action === "delete") {
    const r = await deletePairing({ pairing, store });
    return res.status(200).json(r);
  }
  return res.status(404).json(req.body);
};

export default Tables;
