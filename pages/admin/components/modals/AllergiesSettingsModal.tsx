import React, { useContext, useState } from "react"
import { IoTrashBinOutline } from "react-icons/io5"
import { AdminContext } from "../.."
import {
    registerNewAllergy,
    updateAllergy,
    deleteAllergy as delAllergy,
} from "../../../../controllers/DBController"
import { Allergy } from "../../../../models"
import Input from "../forms/Input"

const AllergiesSettingsModal = ({ editAllergy = null } : { editAllergy?: Allergy }) => {
    const [loading] = useState(false)
    const { store, setStore, closeModal } = useContext(AdminContext)
    const emptyAllergy = {
        name: "",
    }
    const [newAllergy, setNewAllergy] = useState<Allergy>(
        editAllergy ? editAllergy : emptyAllergy
    )
    const registerAllergy = () => {
        closeModal()
        if (editAllergy === null) {
            return registerNewAllergy({ allergy: newAllergy, store })
                .then((data) => setStore({ ...data.store }))
                .catch((e) => console.error(e))
        } else {
            return updateAllergy({ editAllergy, allergy: newAllergy, store })
                .then((data) => setStore({ ...data.store }))
                .catch((e) => console.error(e))
        }
    }
    const deleteAllergy = () => {
        closeModal()
        return delAllergy({ allergy: newAllergy, store })
            .then((data) => setStore({ ...data.store }))
            .catch((e) => console.error(e))
    }

    return (
        <div className="flex flex-col gap-4">
            <h1 className="text-lg font-semibold">
                {editAllergy ? "Edit Allergy" : "Add New Allergy"}
            </h1>
            <div className="flex flex-col gap-8">
                <Input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={newAllergy.name}
                    containerClassName="col-span-2"
                    disabled={loading}
                    onChange={(e: any) =>
                        setNewAllergy({ ...newAllergy, name: e.target.value })
                    }
                />
                <div className="w-full border-t"></div>
                <div className="flex gap-2">
                    {editAllergy && (
                        <button
                            className="btn-secondary-red col-span-2"
                            onClick={() =>
                                confirm(
                                    "Are you sure you want to delete this allergy?"
                                ) && deleteAllergy()
                            }
                            disabled={newAllergy.name === "" || loading}
                        >
                            <IoTrashBinOutline className="text-xl" />
                        </button>
                    )}
                    <button
                        className="btn-primary-green col-span-2 flex-grow"
                        onClick={registerAllergy}
                        disabled={newAllergy.name === "" || loading}
                    >
                        {editAllergy ? "Save Allergy" : "Add Allergy"}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AllergiesSettingsModal
