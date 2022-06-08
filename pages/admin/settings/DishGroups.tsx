import React, { useContext } from "react"
import { AdminContext } from ".."
import DishGroupsTable from "../components/DishGroupsTable"

const DishGroups = () => {
    const { store } = useContext(AdminContext)
    return <>{store && store.groups ? <DishGroupsTable groups={store.groups} /> : null}</>
}

export default DishGroups
