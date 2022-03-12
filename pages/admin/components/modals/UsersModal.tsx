import React, { useContext, useState } from "react"
import { IoTrashBinOutline } from "react-icons/io5"
import { AdminContext } from "../.."
import {
    registerUser as registerNewUser,
    updateUser as updUser,
    deleteUser as delUser,
} from "../../../../controllers/DBController"
import { User } from "../../../../models"
import Input from "../forms/Input"

const roles = ["owner", "manager", "chef", "waiter"]

const UsersModal = ({ editUser = null }) => {
    const [loading, setLoading] = useState(false)
    const { store, setStore, closeModal, activeRole } = useContext(AdminContext)
    const [newUser, setNewUser] = useState<User>(
        editUser ? editUser : { name: "", email: "", role: "waiter" }
    )
    const registerUser = () => {
        closeModal()
        if (editUser === null) {
            return registerNewUser({ user: newUser, store })
                .then((data) => setStore({ ...data.store }))
                .catch((e) => console.error(e))
        } else {
            return updUser({ user: newUser, store })
                .then((data) => setStore({ ...data.store }))
                .catch((e) => console.error(e))
        }
    }
    const deleteUser = () => {
        closeModal()
        return delUser({ user: newUser, store })
            .then((data) => setStore({ ...data.store }))
            .catch((e) => console.error(e))
    }
    return (
        <div className="flex flex-col gap-4">
            <h1 className="text-lg font-semibold">
                {editUser ? "Edit user" : "Add New User"}
            </h1>
            <div className="flex flex-col gap-8">
                <Input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={newUser.name}
                    containerClassName="col-span-2"
                    disabled={editUser !== null || loading}
                    onChange={(e: any) =>
                        setNewUser({ ...newUser, name: e.target.value })
                    }
                />
                <Input
                    type="text"
                    name="email"
                    placeholder="Email"
                    value={newUser.email}
                    containerClassName="col-span-2"
                    disabled={editUser !== null || loading}
                    onChange={(e: any) =>
                        setNewUser({ ...newUser, email: e.target.value })
                    }
                />
                <Input
                    disabled={
                        newUser.role === "owner" ||
                        activeRole === "waiter" ||
                        loading
                    }
                    type="select"
                    name="role"
                    placeholder="role"
                    value={newUser.role}
                    options={roles}
                    onChange={(e: any) =>
                        setNewUser({ ...newUser, role: e.target.value })
                    }
                />
            </div>
            <div className="flex justify-center gap-2 mx-6">
                {editUser && editUser.role !== "owner" && (
                    <button
                        className="btn-secondary-red"
                        onClick={() =>
                            confirm(
                                "Are you sure you want to delete this user?"
                            ) && deleteUser()
                        }
                        disabled={newUser.name === "" || loading}
                    >
                        <IoTrashBinOutline className="text-xl" />
                    </button>
                )}
                <button
                    className="btn-primary-green mx-6 flex-grow"
                    onClick={registerUser}
                    disabled={newUser.name === "" || loading}
                >
                    {editUser ? "Update User" : "Add User"}
                </button>
            </div>
        </div>
    )
}

export default UsersModal
