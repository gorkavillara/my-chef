import React, { useContext, useState } from "react"
import { IoTrashBinOutline } from "react-icons/io5"
import { AdminContext } from "../.."
import {
    deleteBookingDish,
    updateBookingDish,
} from "../../../../controllers/DBController"
import { Dish, Pairing } from "../../../../models"
import Color from "../Color"
import Input from "../forms/Input"

const DishOptions = ({ booking, dish }) => {
    const [loading] = useState(false)
    const { bookings, closeModal, setBookings, store } =
        useContext(AdminContext)
    const [newDish, setNewDish] = useState<Dish>(dish)

    const toggleAllergy = (allergy: string) => {
        if (newDish.allergies) {
            if (newDish.allergies.includes(allergy)) {
                const all = newDish.allergies.filter((all) => all !== allergy)
                setNewDish({ ...newDish, allergies: all })
            } else {
                setNewDish({
                    ...newDish,
                    allergies: [...newDish.allergies, allergy],
                })
            }
        } else {
            setNewDish({ ...newDish, allergies: [allergy] })
        }
    }
    const delBookingDish = () => {
        closeModal()
        deleteBookingDish({
            booking,
            bookings,
            newDish,
        })
            .then((data) => setBookings(data.bookings))
            .catch((e) => console.error(e))
    }

    const updBookingDish = () => {
        closeModal()
        updateBookingDish({
            booking,
            bookings,
            newDish,
        })
            .then((data) => setBookings(data.bookings))
            .catch((e) => console.error(e))
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

    return newDish ? (
        <div className="flex flex-col gap-4">
            <h1 className="text-lg font-semibold">Edit Dish {dish.name}</h1>
            <div className="flex flex-col gap-8">
                <div className="flex items-center gap-4 px-6">
                    <Input
                        disabled={loading}
                        type="chip-select"
                        name="allergies"
                        placeholder="allergies"
                        value={newDish.allergies}
                        options={store.allergies.map((a) => a.name)}
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
                    </div>
                </div>
                <div className="flex flex-col gap-4 px-6">
                    <span className="text-lg uppercase">Pairings</span>
                    <div className="flex flex-wrap gap-2">
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
                    <button
                        className="btn-secondary-red"
                        onClick={() =>
                            confirm(
                                "Are you sure you want to delete this dish?"
                            ) && delBookingDish()
                        }
                        disabled={newDish.name === "" || loading}
                    >
                        <IoTrashBinOutline className="text-xl" />
                    </button>
                    <button
                        className="btn-primary-green mx-6 flex-grow"
                        onClick={updBookingDish}
                        disabled={newDish.name === "" || loading}
                    >
                        Update Dish
                    </button>
                </div>
            </div>
        </div>
    ) : null
}

export default DishOptions
