import React, { useContext } from "react"
import { AdminContext } from ".."
import AllergiesTable from "../components/AllergiesTable"

const Allergies = () => {
    const { store } = useContext(AdminContext)
    return <>{store ? <AllergiesTable allergies={store.allergies} /> : null}</>
}

export default Allergies
