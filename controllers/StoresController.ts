import menus from "../utils/menus"
import { addNewMenu } from "./DBController"

export const getStoresByUserEmail = ({ email }: { email: string }) => {}

export const initializeMenu = async () => {
    const store = { id: "IxHdTO6790ByUs2eGIMK" }
    const menu = menus[0]
    const r = await addNewMenu({ store, menu })
    return r
}
