import { NextApiRequest, NextApiResponse } from "next"
import {
    getStoresByUserEmail,
    registerUser,
    updateUser,
    deleteUser,
} from "../../../controllers/DBController"
import { initializeMenu } from "../../../controllers/StoresController"

const Stores = async (req: NextApiRequest, res: NextApiResponse) => {
    const { action, user, store } = req.body
    if (action === "getByEmail") {
        const r = await getStoresByUserEmail({ userEmail: user.email })
        return res.status(200).json(r)
    } else if (action === "initializeMenu") {
        const r = await initializeMenu()
        return res.status(200).json(r)
    } else if (action === "registerUser") {
        const r = await registerUser({ user, store })
        return res.status(200).json(r)
    } else if (action === "updateUser") {
        const r = await updateUser({ user, store })
        return res.status(200).json(r)
    } else if (action === "deleteUser") {
        const r = await deleteUser({ user, store })
        return res.status(200).json(r)
    }
    return res.status(404).json(req.body)
}

export default Stores
