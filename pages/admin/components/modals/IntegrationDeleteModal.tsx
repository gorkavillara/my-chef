import React, { useContext } from "react"
import { AdminContext } from "../.."
import { Store } from "../../../../models"
import { deleteIntegration } from "../../../../controllers/DBController"
import { toast } from "react-hot-toast"

const IntegrationDeleteModal = ({ integration }) => {
    const { store, setStore, closeModal } = useContext(AdminContext)
    const del = () => {
        if (integration.temp) {
            const newIntegrations = store.settings.integrations.filter(
                (int) => int.provider !== integration.provider
            )
            toast.success("Integration successfully deleted!")
            setStore({
                ...store,
                settings: { ...store.settings, integrations: newIntegrations },
            })
            closeModal()
        } else {
            toast
                .promise(deleteIntegration({ store, integration }), {
                    loading: "Deleting integration...",
                    success: (store: Store) => {
                        setStore(store)
                        return "Integration successfully deleted!"
                    },
                    error: (e) => {
                        console.error(e)
                        setStore(store)
                        return "Oops, there was a problem! We could not update your settings 😨"
                    },
                })
                .then(() => closeModal())
        }
    }
    return store ? (
        <div className="w-full flex flex-col gap-4 text-center items-center">
            <h1 className="text-lg font-semibold">
                Are you sure you want to delete {integration.provider} provider?
            </h1>
            <div className="w-full flex gap-4 justify-center">
                <button
                    className="bg-green-400 text-white text-lg py-1 px-2 rounded-lg"
                    onClick={del}
                >
                    Yes, delete it
                </button>
                <button
                    className="bg-red-400 text-white text-lg py-1 px-2 rounded-lg"
                    onClick={() => closeModal()}
                >
                    No, keep it
                </button>
            </div>
        </div>
    ) : null
}

export default IntegrationDeleteModal
