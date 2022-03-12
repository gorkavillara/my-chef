import React, { useContext, useState } from "react"
import { HiOutlinePlus } from "react-icons/hi"
import { IoTrashBinOutline } from "react-icons/io5"
import { AdminContext } from "../.."
import {
    registerNewMenu,
    updateMenu,
    deleteMenu as delMenu,
} from "../../../../controllers/DBController"
import { Menu } from "../../../../models"
import AllergiesList from "../AllergiesList"
import CompanionList from "../CompanionList"
import Input from "../forms/Input"

const MenusModal = ({ editMenu = null }) => {
    const [loading, setLoading] = useState(false)
    const { store, setStore, closeModal } = useContext(AdminContext)
    const emptyMenu = {
        name: "",
        dishes: [],
    }
    const [newMenu, setNewMenu] = useState<Menu>(
        editMenu ? editMenu : emptyMenu
    )
    const [emptyDish, setEmptyDish] = useState(null)
    const registerMenu = () => {
        closeModal()
        if (editMenu === null) {
            registerNewMenu({ menu: newMenu, store })
                .then((data) => setStore({ ...data.store }))
                .catch((e) => console.error(e))
        } else {
            updateMenu({ menu: newMenu, store })
                .then((data) => setStore({ ...data.store }))
                .catch((e) => console.error(e))
        }
    }
    const deleteMenu = () => {
        closeModal()
        delMenu({ menu: newMenu, store })
            .then((data) => setStore({ ...data.store }))
            .catch((e) => console.error(e))
    }
    const addDish = () => {
        setNewMenu({ ...newMenu, dishes: [...newMenu.dishes, emptyDish] })
        setEmptyDish(null)
    }
    return (
        <div className="flex flex-col gap-4 w-full">
            <h1 className="text-lg font-semibold">
                {editMenu ? "Edit menu" : "Add New Menu"}
            </h1>
            <div className="flex flex-col gap-8">
                <Input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={newMenu.name}
                    containerClassName="col-span-2"
                    disabled={editMenu !== null}
                    onChange={(e: any) =>
                        setNewMenu({ ...newMenu, name: e.target.value })
                    }
                />
                <div className="col-span-2 px-4 flex flex-col">
                    <h2 className="text-lg">Dishes</h2>
                    <table>
                        <thead>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Name
                            </th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Allergies
                            </th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Companions
                            </th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Actions
                            </th>
                        </thead>
                        <tbody>
                            {newMenu.dishes?.map((dish, i) => (
                                <tr key={i}>
                                    <td className="px-5 py-2">{dish.name}</td>
                                    <td className="px-5 py-2">
                                        <AllergiesList
                                            allergies={dish.allergies}
                                            style="modal"
                                        />
                                    </td>
                                    <td className="px-5 py-2">
                                        <CompanionList dish={dish} />
                                    </td>
                                    <td className="px-5 py-2">
                                        <button
                                            className="w-full flex justify-center items-center disabled:opacity-25"
                                            disabled={loading}
                                            onClick={() =>
                                                setNewMenu({
                                                    ...newMenu,
                                                    dishes: newMenu.dishes.filter(
                                                        (d, j) => j !== i
                                                    ),
                                                })
                                            }
                                        >
                                            <HiOutlinePlus className="text-2xl font-semibold text-red-500 rotate-45" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {emptyDish !== null && (
                                <tr>
                                    <td
                                        colSpan={4}
                                        className="px-2 py-2 gap-2 justify-between"
                                    >
                                        <div className="flex gap-4">
                                            <select
                                                className="w-full border rounded p-2"
                                                onChange={(e) =>
                                                    setEmptyDish(
                                                        store.dishes.find(
                                                            (dish) =>
                                                                dish.name ===
                                                                e.target.value
                                                        )
                                                    )
                                                }
                                            >
                                                {store.dishes?.map(
                                                    (dish, i) => (
                                                        <option
                                                            key={i}
                                                            value={dish.name}
                                                        >
                                                            {dish.name}
                                                        </option>
                                                    )
                                                )}
                                            </select>
                                            <button
                                                className="btn-primary-green"
                                                onClick={addDish}
                                            >
                                                Add
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )}
                            <tr className="my-4">
                                <td colSpan={4} className="py-2">
                                    <button
                                        disabled={emptyDish !== null || loading}
                                        className="bg-slate-100 py-2 w-full text-center font-semibold rounded-lg active:bg-slate-200 disabled:opacity-25"
                                        onClick={() =>
                                            setEmptyDish(store.dishes[0])
                                        }
                                    >
                                        Add Dish
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="flex gap-2 mx-6">
                    {editMenu && (
                        <button
                            className="btn-secondary-red"
                            onClick={() =>
                                confirm(
                                    "Are you sure you want to delete this Menu?"
                                ) && deleteMenu()
                            }
                            disabled={newMenu.name === "" || loading}
                        >
                            <IoTrashBinOutline className="text-xl" />
                        </button>
                    )}
                    <button
                        className="btn-primary-green flex-grow"
                        onClick={registerMenu}
                        disabled={newMenu.name === "" || loading}
                    >
                        {editMenu ? "Update Menu" : "Add Menu"}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default MenusModal
