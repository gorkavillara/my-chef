import { NextApiRequest, NextApiResponse } from "next";
import {
  registerNewTable,
  registerMultipleTables,
} from "../../../controllers/DBController";

const Tables = async (req: NextApiRequest, res: NextApiResponse) => {
  const { action, store, table, tables } = req.body;
  if (action === "register") {
    const r = await registerNewTable({ table, store });
    return res.status(200).json(r);
  } else if (action === "register-multiple") {
    const r = await registerMultipleTables({ tables, store });
    return res.status(200).json(r);
  }
  return res.status(404).json(req.body);
};

export default Tables;
