import React, { useContext } from "react"
import { AdminContext } from ".."
import useImageInput from "../../../hooks/useImageInput"
import { updateProfile, signOut } from "firebase/auth"
import { toast } from "react-hot-toast"

const ProfileView = () => {
    const { user, auth } = useContext(AdminContext)
    const { ImageInput, uploadImage, fileUploaded } = useImageInput()

    const saveSettings = async () => {
        toast.promise(saveData(), {
            loading: "Updating your settings",
            success: "Settings saved!",
            error: (e) => {
                console.error(e)
                return "Oops, there was a problem! We could not update your settings 😨"
            },
        })
    }

    const saveData = async () => {
        if (fileUploaded) {
            return uploadImage()
                .then((data) => {
                    const visualUrl = data.secure_url
                    updateProfile(auth.currentUser, {
                        photoURL: visualUrl,
                    })
                        .then(() => true)
                        .catch((e) => {
                            throw e
                        })
                })
                .catch((e) => {
                    throw e
                })
        } else {
            const visualUrl = auth.currentUser.photoURL
            return updateProfile(auth.currentUser, {
                photoURL: visualUrl,
            })
                .then(() => true)
                .catch((e) => {
                    throw e
                })
        }
    }

    return (
        <div className="min-h-full w-full flex flex-col">
            <div className="flex justify-between">
                <h1 className="font-semibold text-lg p-6 ml-10">
                    Edit your Profile
                </h1>
                <button
                    onClick={() => signOut(auth)}
                    className="font-semibold text-xl p-6 ml-10 text-red-400"
                >
                    Disconnect
                </button>
            </div>
            <main className="flex-grow flex flex-col bg-slate-100 px-6 pb-6 items-center">
                <div className="w-full h-44 bg-white rounded-t-3xl rounded-l-3xl flex flex-row-reverse items-end">
                    <button
                        onClick={saveSettings}
                        className="m-4 text-xl bg-green-400 text-white font-semibold px-4 py-2 rounded-lg"
                    >
                        Save Settings
                    </button>
                </div>
                <div className="flex gap-8 self-start ml-6 items-start">
                    <div className="w-44 h-44 rounded-full bg-white -mt-16 shadow-lg border-white border-2 flex justify-center items-center overflow-hidden">
                        {user.photoURL ? (
                            <ImageInput
                                visualUrl={user?.photoURL}
                                className="w-full h-full"
                            />
                        ) : (
                            <ImageInput className="w-full h-full" />
                        )}
                    </div>
                    <h3 className="mt-4 font-semibold text-xl">{user.email}</h3>
                </div>
            </main>
        </div>
    )
}

export default ProfileView
