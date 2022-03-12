import React, { useContext } from "react"
import { AdminContext } from ".."
import DishTable from "../components/DishTable"

const Dishes = () => {
    const { store } = useContext(AdminContext)
    return <>{store ? <DishTable dishes={store.dishes} /> : null}</>
}

export default Dishes
