import React, { useContext, useState } from "react"
import { HiOutlinePlus } from "react-icons/hi"
import {
    BsFillCaretUpSquareFill,
    BsFillCaretDownSquareFill,
} from "react-icons/bs"
import { IoTrashBinOutline } from "react-icons/io5"
import { AdminContext } from "../.."
import {
    registerNewMenu,
    updateMenu,
    deleteMenu as delMenu,
} from "../../../../controllers/DBController"
import { Group, Menu } from "../../../../models"
import Badge from "../Badge"
import CompanionList from "../CompanionList"
import Input from "../forms/Input"

const MenusModal = ({ editMenu = null }) => {
    const [loading] = useState(false)
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

    const moveUp = (i: number) => {
        if (i < 0 || i >= newMenu.dishes.length) return
        const firstPart = newMenu.dishes.slice(0, i - 1)
        const secondPart = newMenu.dishes[i]
        const thirdPart = newMenu.dishes[i - 1]
        const lastPart = newMenu.dishes.slice(i + 1, newMenu.dishes.length)
        return setNewMenu({...newMenu, dishes: [...firstPart, secondPart, thirdPart, ...lastPart]})
    }
    const moveDown = (i: number) => {
        if (i < 0 || i >= newMenu.dishes.length) return
        const firstPart = newMenu.dishes.slice(0, i)
        const secondPart = newMenu.dishes[i + 1]
        const thirdPart = newMenu.dishes[i]
        const lastPart = newMenu.dishes.slice(i + 2, newMenu.dishes.length)
        return setNewMenu({...newMenu, dishes: [...firstPart, secondPart, thirdPart, ...lastPart]})
    }
    return (
        <div className="flex w-full flex-col gap-4">
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
                <div className="col-span-2 flex flex-col px-4">
                    <h2 className="text-lg">Dishes</h2>
                    <table>
                        <thead>
                            <tr>
                                <td className="border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                                    Name
                                </td>
                                <td className="border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                                    Allergies
                                </td>
                                <td className="border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                                    Group
                                </td>
                                <td className="border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                                    Companions
                                </td>
                                <td className="border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                                    Actions
                                </td>
                            </tr>
                        </thead>
                        <tbody>
                            {newMenu.dishes?.map((dish, i) => (
                                <tr key={i}>
                                    <td className="px-5 py-2">{dish.name}</td>
                                    <td className="px-5 py-2">
                                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-400 p-1 text-sm text-white">
                                            <span>
                                                {dish.allergies
                                                    ? dish.allergies.length
                                                    : "none"}
                                            </span>
                                        </span>
                                    </td>
                                    <td className="px-5 py-2">
                                        {dish.groupId && dish.groupId !== 0 ? (
                                            <Badge
                                                text={
                                                    store.groups.find(
                                                        (g: Group) =>
                                                            g.id ===
                                                            dish.groupId
                                                    )?.name
                                                }
                                                size="sm"
                                                color="slate"
                                            />
                                        ) : null}
                                    </td>
                                    <td className="px-5 py-2">
                                        <CompanionList dish={dish} />
                                    </td>
                                    <td className="flex items-center justify-around gap-1 px-5 py-2">
                                        <button
                                            className="flex w-full items-center justify-center disabled:opacity-25"
                                            disabled={loading || i === 0}
                                            onClick={() => moveUp(i)}
                                        >
                                            <BsFillCaretUpSquareFill className="text-2xl font-semibold text-slate-500" />
                                        </button>
                                        <button
                                            className="flex w-full items-center justify-center disabled:opacity-25"
                                            disabled={
                                                loading ||
                                                i === newMenu.dishes.length - 1
                                            }
                                            onClick={() => moveDown(i)}
                                        >
                                            <BsFillCaretDownSquareFill className="text-2xl font-semibold text-slate-500" />
                                        </button>
                                        <button
                                            className="flex w-full items-center justify-center disabled:opacity-25"
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
                                            <HiOutlinePlus className="rotate-45 text-2xl font-semibold text-red-500" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {emptyDish !== null && (
                                <tr>
                                    <td
                                        colSpan={4}
                                        className="justify-between gap-2 px-2 py-2"
                                    >
                                        <div className="flex gap-4">
                                            <select
                                                className="w-full rounded border p-2"
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
                                <td colSpan={5} className="py-2">
                                    <button
                                        disabled={emptyDish !== null || loading}
                                        className="w-full rounded-lg bg-slate-100 py-2 text-center font-semibold active:bg-slate-200 disabled:opacity-25"
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
                <div className="mx-6 flex gap-2">
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
