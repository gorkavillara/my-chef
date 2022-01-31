import { NextApiRequest, NextApiResponse } from "next";
import { registerNewMenu, updateMenu } from "../../../controllers/DBController";

const Tables = async (req: NextApiRequest, res: NextApiResponse) => {
  const { action, store, menu } = req.body;
  if (action === "register") {
    const r = await registerNewMenu({ menu, store });
    return res.status(200).json(r);
  } else if (action === "update") {
    const r = await updateMenu({ menu, store });
    return res.status(200).json(r);
  }
  return res.status(404).json(req.body);
};

export default Tables;
