import { NextApiRequest, NextApiResponse } from "next"
import { auth } from "../../../controllers/IntegrationsController"

const Integrations = async (req: NextApiRequest, res: NextApiResponse) => {
    const { action, integrations } = req.body
    if (action === "auth") {
        const r = await auth(integrations)
        return res.status(200).json(r)
    }
    return res.status(404).json(req.body)
}

export default Integrations
