import React, { useContext, useEffect, useState } from "react"
import { toast } from "react-hot-toast"
import { AdminContext } from ".."
import Image from "next/image"
import { Integration } from "../../../models"
import { updateIntegrations } from "../../../controllers/DBController"
import { BsPlusCircle } from "react-icons/bs"
import { IoTrash } from "react-icons/io5"

const providers = [
    {
        provider: "sevenrooms",
        baseUrl: "https://api.sevenrooms.com/2_2/",
        venueID: "",
        clientID: "",
        logoUrl:
            "https://res.cloudinary.com/dyddijwxv/image/upload/v1647713184/myrapidchef/logo_jpiqdx.png",
    },
    {
        provider: "thefork",
        baseUrl: "",
        username: "",
        password: "",
        logoUrl:
            "https://res.cloudinary.com/dyddijwxv/image/upload/v1647713310/myrapidchef/logo_jwkuzr.png",
    },
]

const Integrations = () => {
    const { store, setStore, openModal } = useContext(AdminContext)
    const [integrations, setIntegrations] = useState<Integration[]>([])
    useEffect(() => {
        if (!store) return
        setIntegrations(store.settings?.integrations)
    }, [store])

    const update = () => {
        toast.promise(
            updateIntegrations({
                store,
                integrations: integrations.map((int) => {
                    return { ...int, temp: false }
                }),
            }),
            {
                loading: "Saving...",
                success: (store) => {
                    setStore(store)
                    return "Settings saved!"
                },
                error: (e) => {
                    console.error(e)
                    setIntegrations(store.settings?.integrations)
                    return "Oops, there was a problem! We could not update your settings 😨"
                },
            }
        )
    }

    return integrations ? (
        <>
            <div className="flex justify-end">
                <button className="btn-primary-green" onClick={update}>
                    Update Integrations
                </button>
            </div>
            <div className="flex flex-col gap-4 p-8">
                {integrations.map((integration, i) => (
                    <div
                        key={i}
                        className={`flex flex-col gap-6 shadow-lg rounded-xl p-6 ${
                            integration.temp && "bg-slate-200"
                        }`}
                    >
                        <div
                            key={integration.provider}
                            className="flex gap-4 items-center"
                        >
                            <div className="w-20">
                                <Image
                                    src={integration.logoUrl}
                                    alt={`logo-provider`}
                                    width={200}
                                    height={200}
                                    layout="intrinsic"
                                />
                            </div>
                            <span className="flex gap-6 items-center">
                                <h1 className="text-4xl font-semibold uppercase">
                                    {integration.provider}
                                </h1>
                                {integration.temp && (
                                    <span className="text-lg italic">
                                        This integration is still not saved,
                                        please save your changes
                                    </span>
                                )}
                            </span>
                            <div className="flex flex-grow justify-end">
                                <button
                                    className="text-4xl text-red-400 bg-red-50 p-2 border-red-400 border-2 rounded-xl"
                                    onClick={() =>
                                        openModal(
                                            "integrationsDelete",
                                            integration
                                        )
                                    }
                                >
                                    <IoTrash />
                                </button>
                            </div>
                        </div>
                        <div className="flex flex-col gap-6">
                            <label className="flex flex-col">
                                <span className="font-semibold capitalize mb-2">
                                    Venue ID
                                </span>
                                <input
                                    type="text"
                                    value={integration.venueID}
                                    onChange={(e) => {
                                        const newIntegrations = integrations
                                        newIntegrations[i] = {
                                            ...integration,
                                            venueID: e.target.value,
                                        }
                                        return setIntegrations([
                                            ...newIntegrations,
                                        ])
                                    }}
                                    className="p-2 text-lg border rounded-xl focus:ring ring-green-300 outline-none"
                                />
                            </label>
                            <label className="flex flex-col">
                                <span className="font-semibold capitalize mb-2">
                                    Client ID
                                </span>
                                <input
                                    type="text"
                                    value={integration.clientID}
                                    onChange={(e) => {
                                        const newIntegrations = integrations
                                        newIntegrations[i] = {
                                            ...integration,
                                            clientID: e.target.value,
                                        }
                                        return setIntegrations([
                                            ...newIntegrations,
                                        ])
                                    }}
                                    className="p-2 text-lg border rounded-xl focus:ring ring-green-300 outline-none"
                                />
                            </label>
                        </div>
                    </div>
                ))}
                <button
                    className="bg-green-400 rounded-xl py-4 text-xl text-white flex gap-4 items-center justify-center"
                    onClick={() =>
                        openModal("integrations", { integrations, providers })
                    }
                >
                    <BsPlusCircle className="text-2xl" />
                    <span>Add Provider</span>
                </button>
            </div>
        </>
    ) : null
}

export default Integrations
