import React, { useContext, useState } from "react"
import { AdminContext } from "../.."
import { registerMultipleTables } from "../../../../controllers/DBController"

const TablesModalMultiple = () => {
    const [prefix, setPrefix] = useState<string>("")
    const [from, setFrom] = useState<number>(0)
    const [to, setTo] = useState<number>(0)

    const { store, setStore, closeModal } = useContext(AdminContext)

    const createTables = () => {
        let tables = []
        for (let i = from; i <= to; i++) {
            const name = `${prefix} ${i.toString().padStart(2, "0")}`
            const table = { name }
            tables.push(table)
        }
        return tables
    }
    const registerTables = () => {
        const tables = createTables()
        closeModal()
        registerMultipleTables({ tables, store })
            .then((data) => setStore({ ...data.store }))
            .catch((e) => console.error(e))
    }
    return (
        <div className="flex flex-col gap-4 w-full">
            <h1 className="text-2xl font-semibold">Add multiple tables</h1>
            <div className="border-t"></div>
            <label className="flex flex-col gap-2">
                <span className="text-gray-500">
                    Prefix-name for each table (Eg:{" "}
                    <span className="font-bold">Table</span> 01,{" "}
                    <span className="font-bold">Terrace</span> 01...)
                </span>
                <input
                    className="input-text"
                    type="text"
                    placeholder="Name"
                    value={prefix}
                    onChange={(e) => setPrefix(e.target.value)}
                />
            </label>
            <div className="flex gap-2">
                <label className="flex flex-col gap-2">
                    <span className="text-gray-500">From</span>
                    <input
                        className="input-text"
                        type="number"
                        placeholder="From"
                        value={from}
                        min={1}
                        onChange={(e) => setFrom(Number(e.target.value))}
                    />
                </label>
                <label className="flex flex-col gap-2">
                    <span className="text-gray-500">To</span>
                    <input
                        className="input-text"
                        type="number"
                        placeholder="To"
                        value={to}
                        min={Number(from) + 1}
                        onChange={(e) => setTo(Number(e.target.value))}
                    />
                </label>
            </div>
            <button
                className="btn-primary-green"
                onClick={registerTables}
                disabled={from >= to || prefix === ""}
            >
                Add Tables
            </button>
        </div>
    )
}

export default TablesModalMultiple
