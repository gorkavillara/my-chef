import React, { useContext, useState } from "react"
import { IoTrashBinOutline } from "react-icons/io5"
import { AdminContext } from "../.."
import {
    registerNewDishGroup,
    updateDishGroup,
    deleteDishGroup as delDishGroup,
} from "../../../../controllers/DBController"
import { Group } from "../../../../models"
import Input from "../forms/Input"

const DishGroupsSettingsModal = ({ editDishGroup = null }) => {
    const [loading, setLoading] = useState(false)
    const { store, setStore, closeModal } = useContext(AdminContext)
    const getNewId = () =>
        store && store.groups && store.groups.length > 0
            ? store.groups.reduce(
                  (max: number, group: Group) =>
                      group.id > max ? group.id : max,
                  store.groups[0].id
              ) + 1
            : 1

    const emptyDishGroup = {
        name: "",
        id: getNewId(),
    }
    const [newGroup, setNewGroup] = useState<Group>(
        editDishGroup ? editDishGroup : emptyDishGroup
    )
    const registerDishGroup = () => {
        setLoading(true)
        if (editDishGroup === null) {
            return registerNewDishGroup({ group: newGroup, store })
                .then((data) => setStore({ ...data.store }))
                .catch((e) => console.error(e))
                .finally(() => closeModal())
        } else {
            return updateDishGroup({ group: newGroup, store })
                .then((data) => setStore({ ...data.store }))
                .catch((e) => console.error(e))
                .finally(() => closeModal())
        }
    }
    const deleteDishGroup = () => {
        setLoading(true)
        return delDishGroup({ group: newGroup, store })
            .then((data) => setStore({ ...data.store }))
            .catch((e) => console.error(e))
            .finally(() => closeModal())
        }

    return (
        <div className="flex flex-col gap-4">
            <h1 className="text-lg font-semibold">
                {editDishGroup ? "Edit Dish Group" : "Add New Dish Group"}
            </h1>
            <div className="flex flex-col gap-8">
                <Input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={newGroup.name}
                    containerClassName="col-span-2"
                    disabled={loading}
                    onChange={(e: any) =>
                        setNewGroup({ ...newGroup, name: e.target.value })
                    }
                />
                <div className="flex gap-2">
                    {editDishGroup && (
                        <button
                            className="btn-secondary-red col-span-2"
                            onClick={() =>
                                confirm(
                                    "Are you sure you want to delete this group?"
                                ) && deleteDishGroup()
                            }
                            disabled={newGroup.name === "" || loading}
                        >
                            <IoTrashBinOutline className="text-xl" />
                        </button>
                    )}
                    <button
                        className="btn-primary-green col-span-2 flex-grow"
                        onClick={registerDishGroup}
                        disabled={newGroup.name === "" || loading}
                    >
                        {editDishGroup ? "Save Dish Group" : "Add Dish Group"}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DishGroupsSettingsModal
