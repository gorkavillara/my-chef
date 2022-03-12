import React, { useContext } from "react"
import { AdminContext } from ".."
import TablesTable from "../components/TablesTable"

const Tables = () => {
    const { store } = useContext(AdminContext)
    return store ? (
        <>
            <TablesTable tables={store.tables} />
        </>
    ) : null
}

export default Tables
