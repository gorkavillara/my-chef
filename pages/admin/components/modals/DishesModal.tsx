import React, { useContext, useState } from "react"
import { IoTrashBinOutline } from "react-icons/io5"
import { AdminContext } from "../.."
import {
    registerNewDish,
    updateDish,
    deleteDish as delDish,
} from "../../../../controllers/DBController"
import { Allergy, Dish, Group, Pairing } from "../../../../models"
import Color from "../Color"
import Input from "../forms/Input"

const DishesModal = ({ editDish = null }) => {
    const [loading, setLoading] = useState(false)
    const { store, setStore, closeModal } = useContext(AdminContext)
    const emptyDish = {
        name: "",
        products: [],
        allergies: [],
        description: "",
        recipe: "",
        side: false,
        wine: false,
        juice: false,
    }
    const [newDish, setNewDish] = useState<Dish>(
        editDish ? editDish : emptyDish
    )
    const registerDish = () => {
        setLoading(true)
        if (editDish === null) {
            registerNewDish({ dish: newDish, store })
                .then((data) => {
                    setStore({ ...data.store })
                })
                .finally(() => {
                    setLoading(false)
                    closeModal()
                })
        } else {
            updateDish({ dish: newDish, store })
                .then((data) => {
                    setStore({ ...data.store })
                })
                .finally(() => {
                    setLoading(false)
                    closeModal()
                })
        }
    }
    const deleteDish = () => {
        setLoading(true)
        delDish({ dish: newDish, store })
            .then((data) => {
                setLoading(false)
                setStore({ ...data.store })
            })
            .catch((e) => console.error(e))
            .finally(() => closeModal())
    }

    const toggleAllergy = (allergy: string) => {
        if (newDish.allergies.includes(allergy)) {
            const all = newDish.allergies.filter((all) => all !== allergy)
            setNewDish({ ...newDish, allergies: all })
        } else {
            setNewDish({
                ...newDish,
                allergies: [...newDish.allergies, allergy],
            })
        }
    }

    const togglePairing = (pairingName: string) => {
        if (newDish.pairings?.some((p: Pairing) => p.name === pairingName)) {
            const pairings = newDish.pairings.filter(
                (p: Pairing) => p.name !== pairingName
            )
            setNewDish({ ...newDish, pairings })
        } else {
            setNewDish({
                ...newDish,
                pairings: newDish.pairings
                    ? [
                          ...newDish.pairings,
                          store.pairings.find(
                              (p: Pairing) => p.name === pairingName
                          ),
                      ]
                    : [
                          store.pairings.find(
                              (p: Pairing) => p.name === pairingName
                          ),
                      ],
            })
        }
    }

    const addGroup = (e: any) =>
        setNewDish({
            ...newDish,
            groupId: store.groups.find((g: Group) => g.name === e.target.value)
                .id,
        })

    return store ? (
        <div className="flex flex-col gap-4">
            <h1 className="text-lg font-semibold">
                {editDish ? "Edit dish" : "Add New Dish"}
            </h1>
            <div className="flex flex-col gap-8">
                <Input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={newDish.name}
                    containerClassName="col-span-2"
                    disabled={editDish !== null || loading}
                    onChange={(e: any) =>
                        setNewDish({ ...newDish, name: e.target.value })
                    }
                />
                <Input
                    type="text"
                    name="description"
                    placeholder="Description"
                    value={newDish.description}
                    containerClassName="col-span-2"
                    disabled={loading}
                    onChange={(e: any) =>
                        setNewDish({ ...newDish, description: e.target.value })
                    }
                />
                <Input
                    type="select"
                    name="group"
                    placeholder="Group"
                    value={
                        store.groups.find(
                            (g: Group) => g.id === newDish.groupId
                        )?.name || ""
                    }
                    options={store.groups.map((g: Group) => g.name)}
                    containerClassName="col-span-2"
                    disabled={loading}
                    onChange={addGroup}
                />
                <div className="flex items-center gap-4">
                    <Input
                        disabled={loading}
                        type="chip-select"
                        name="allergies"
                        placeholder="allergies"
                        value={newDish.allergies}
                        options={store.allergies.map((a: Allergy) => a.name)}
                        onChange={(e: string) => toggleAllergy(e)}
                    />
                    <div className="flex flex-col items-center gap-4 border-l pl-8">
                        <Input
                            type="toggle"
                            name="side"
                            placeholder="Side"
                            value={newDish.side}
                            disabled={loading}
                            onChange={() =>
                                setNewDish({ ...newDish, side: !newDish.side })
                            }
                        />
                        {/* <Input
                            type="toggle"
                            name="wine"
                            placeholder="Wine"
                            value={newDish.wine}
                            disabled={loading}
                            onChange={() =>
                                setNewDish({ ...newDish, wine: !newDish.wine })
                            }
                        /> */}
                    </div>
                </div>
                <div className="flex flex-col px-6 gap-4">
                    <span className="text-lg uppercase">Pairings</span>
                    <div>
                        {store.pairings.map((p: Pairing) => (
                            <button
                                className={`flex items-center gap-4 rounded-lg border-2 py-3 px-6 text-lg disabled:opacity-25 ${
                                    newDish.pairings?.some(
                                        (pairing: Pairing) =>
                                            p.name === pairing.name
                                    )
                                        ? "border-green-400 bg-green-200"
                                        : "border-slate-100 bg-slate-50"
                                }`}
                                key={p.name}
                                onClick={() => togglePairing(p.name)}
                                disabled={loading}
                            >
                                <span>{p.name}</span>
                                <Color color={p.color} />
                            </button>
                        ))}
                    </div>
                </div>
                <div className="mx-6 flex justify-center gap-2">
                    {editDish && (
                        <button
                            className="btn-secondary-red"
                            onClick={() =>
                                confirm(
                                    "Are you sure you want to delete this dish?"
                                ) && deleteDish()
                            }
                            disabled={newDish.name === "" || loading}
                        >
                            <IoTrashBinOutline className="text-xl" />
                        </button>
                    )}
                    <button
                        className="btn-primary-green mx-6 flex-grow"
                        onClick={registerDish}
                        disabled={newDish.name === "" || loading}
                    >
                        {editDish ? "Update Dish" : "Add Dish"}
                    </button>
                </div>
            </div>
        </div>
    ) : null
}

export default DishesModal
