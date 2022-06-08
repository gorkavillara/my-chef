import { useContext, useState } from "react"
import { AdminContext } from ".."
import { Dish, Group } from "../../../models"
import AllergiesList from "./AllergiesList"
import Badge from "./Badge"
import CompanionList from "./CompanionList"

export default function DishTable({ dishes }) {
    const { openModal, store } = useContext(AdminContext)
    const [search, setSearch] = useState("")
    return (
        <div className="w-full rounded-md bg-white p-8">
            <div className="flex items-center justify-between">
                <div className="flex items-center rounded-md bg-gray-50 p-2">
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
                        className="ml-1 block bg-gray-50 outline-none "
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search..."
                    />
                </div>
                <div className="ml-10 space-x-8 lg:ml-40">
                    <button
                        className="btn-primary-green"
                        onClick={() => openModal("newDish")}
                    >
                        New Dish
                    </button>
                </div>
            </div>
            {dishes ? (
                <div>
                    <div className="-mx-4 overflow-x-auto px-4 py-4 sm:-mx-8 sm:px-8">
                        <div className="inline-block min-w-full overflow-hidden rounded-lg shadow">
                            <table className="min-w-full leading-normal">
                                <thead>
                                    <tr>
                                        <th className="border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                                            Name
                                        </th>
                                        <th className="border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                                            Allergies
                                        </th>
                                        <th className="border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                                            Group
                                        </th>
                                        <th className="border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                                            Companions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {dishes
                                        .filter((dish: Dish) => {
                                            return search === ""
                                                ? true
                                                : dish.name.includes(search)
                                        })
                                        .map((dish: Dish, i: number) => (
                                            <tr
                                                key={i}
                                                onClick={() =>
                                                    openModal("editDish", dish)
                                                }
                                                className="cursor-pointer transition hover:bg-slate-50"
                                            >
                                                <td className="border-b border-gray-200 px-5 py-4">
                                                    <div className="flex items-center">
                                                        <div className="ml-3">
                                                            <p className="whitespace-no-wrap text-gray-900">
                                                                {dish.name}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="border-b border-gray-200 px-5 py-4 text-sm">
                                                    {dish.allergies.length >
                                                    0 ? (
                                                        <AllergiesList
                                                            allergies={
                                                                dish.allergies
                                                            }
                                                            style="table"
                                                        />
                                                    ) : (
                                                        "-"
                                                    )}
                                                </td>
                                                <td className="border-b border-gray-200 px-5 py-4 text-sm">
                                                    {dish.groupId &&
                                                    dish.groupId !== 0 ? (
                                                        <Badge
                                                            text={
                                                                store.groups.find(
                                                                    (
                                                                        g: Group
                                                                    ) =>
                                                                        g.id ===
                                                                        dish.groupId
                                                                )?.name
                                                            }
                                                            size="sm"
                                                            color="slate"
                                                        />
                                                    ) : null}
                                                </td>
                                                <td className="border-b border-gray-200 px-5 py-4 text-sm">
                                                    <CompanionList
                                                        dish={dish}
                                                    />
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
