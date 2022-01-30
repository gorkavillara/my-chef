import { NextApiRequest, NextApiResponse } from "next";
import { registerNewDish, updateDish } from "../../../controllers/DBController";

const Tables = async (req: NextApiRequest, res: NextApiResponse) => {
  const { action, store, dish } = req.body;
  if (action === "register") {
    const r = await registerNewDish({ dish, store });
    return res.status(200).json(r);
  } else if (action === "update") {
    const r = await updateDish({ dish, store });
    return res.status(200).json(r);
  }
  return res.status(404).json(req.body);
};

export default Tables;
