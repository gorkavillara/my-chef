import React, { useContext, useState } from "react"
import { AdminContext } from "../.."
import { Integration } from "../../../../models"
import Image from "next/image"

const IntegrationsModal = ({ integrations, providers }) => {
    const [newIntegration, setNewIntegration] = useState<Integration>()
    const { store, setStore, closeModal } = useContext(AdminContext)
    const addProvider = () => {
        const newIntegrations = [
            ...store.settings.integrations,
            { ...newIntegration, temp: true },
        ]
        setStore({
            ...store,
            settings: { ...store.settings, integrations: newIntegrations },
        })
        closeModal()
    }
    return store ? (
        <div className="w-full flex flex-col gap-4 text-center items-center">
            <h1 className="text-lg font-semibold">Select your provider</h1>
            <div className="w-full flex gap-4">
                {providers.map((provider: Integration, i: number) => (
                    <button
                        key={i}
                        disabled={integrations.some(
                            (int) => int.provider === provider.provider
                        )}
                        className={`flex flex-col justify-between items-center rounded-lg py-2 px-4 disabled:opacity-25 ${
                            newIntegration?.provider === provider.provider
                                ? "bg-green-200 border-green-400"
                                : "bg-slate-50 border-slate-100"
                        } border-2`}
                        onClick={() => setNewIntegration(provider)}
                    >
                        <div className="w-20">
                            <Image
                                src={provider.logoUrl}
                                alt={`logo-provider`}
                                width={200}
                                height={200}
                                layout="intrinsic"
                            />
                        </div>
                        <span className="uppercase font-semibold text-lg">
                            {provider.provider}
                        </span>
                    </button>
                ))}
            </div>
            <button
                className="btn-primary-green max-w-lg"
                onClick={addProvider}
            >
                Add Provider
            </button>
        </div>
    ) : null
}

export default IntegrationsModal
