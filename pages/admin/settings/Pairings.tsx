import React, { useContext } from "react"
import { AdminContext } from ".."
import PairingsTable from "../components/PairingsTable"

const Pairings = () => {
    const { store } = useContext(AdminContext)
    return <>{store ? <PairingsTable pairings={store.pairings} /> : null}</>
}

export default Pairings
