import { useContext, useState } from "react"
import { AdminContext } from ".."
import { Table } from "../../../models"

export default function TablesTable({ tables }) {
    const { openModal, store } = useContext(AdminContext)
    const [search, setSearch] = useState("")
    return (
        <div className="bg-white p-8 rounded-md w-full">
            <div className="flex items-center justify-between">
                <div className="flex bg-gray-50 items-center p-2 rounded-md">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-gray-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                            clipRule="evenodd"
                        />
                    </svg>
                    <input
                        className="bg-gray-50 outline-none ml-1 block "
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search..."
                    />
                </div>
                <div className="flex justify-between">
                    <div className="flex gap-4 items-center">
                        <button
                            onClick={() => openModal("tables", { store })}
                            className="btn-primary-green"
                        >
                            + Add Table
                        </button>
                        <button
                            onClick={() => openModal("tables-multiple")}
                            className="btn-primary-green"
                        >
                            + Add Multiple
                        </button>
                    </div>
                </div>
            </div>
            {tables ? (
                <div>
                    <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                        <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                            <table className="min-w-full leading-normal">
                                <thead>
                                    <tr>
                                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            Name
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tables
                                        .filter((table: Table) => {
                                            return search === ""
                                                ? true
                                                : table.name.includes(search)
                                        })
                                        .map((table: Table, i: number) => (
                                            <tr
                                                key={i}
                                                onClick={() =>
                                                    openModal(
                                                        "editTable",
                                                        table
                                                    )
                                                }
                                                className="cursor-pointer hover:bg-slate-50 transition"
                                            >
                                                <td className="px-5 py-4 border-b border-gray-200">
                                                    <div className="flex items-center">
                                                        <div className="ml-3">
                                                            <p className="text-gray-900 whitespace-no-wrap">
                                                                {table.name}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            ) : null}
        </div>
    )
}
