import React, { useContext, useEffect, useState } from "react"
import { toast } from "react-hot-toast"
import { AdminContext } from ".."
import Image from "next/image"
import michelinSvg from "../../../utils/svgs/michelin-star.svg"
import { Settings } from "../../../models"
import { updateSettings } from "../../../controllers/DBController"

const StarRender = ({ amount }) => {
    return (
        <span className="flex gap-2 items-center">
            {amount > 0
                ? Array(amount)
                      .fill(0)
                      .map((_, i) => (
                          <span key={i} className="w-5 flex items-center">
                              <Image src={michelinSvg} alt="michelin-star" />
                          </span>
                      ))
                : "None"}
        </span>
    )
}

const StarSelector = ({ michelin_stars, setStars }) => {
    return (
        <div className="flex gap-2 items-center">
            {[0, 1, 2, 3].map((num) => (
                <button
                    key={num}
                    className={`py-3 px-4 rounded-lg border ${
                        num === michelin_stars &&
                        "border-green-500 border-2 bg-green-50"
                    }`}
                    onClick={() => setStars(num)}
                >
                    <StarRender amount={num} />
                </button>
            ))}
        </div>
    )
}

const General = () => {
    const { store, setStore } = useContext(AdminContext)
    const [settings, setSettings] = useState<Settings>()
    useEffect(() => {
        if (!store) return
        setSettings(store.settings)
    }, [store])

    const update = () => {
        toast.promise(updateSettings({ store, settings }), {
            loading: "Saving...",
            success: (store) => {
                setStore(store)
                return "Settings saved!"
            },
            error: (e) => {
                console.error(e)
                setSettings(store.settings)
                return "Oops, there was a problem! We could not update your settings 😨"
            }
        })
    }

    return settings ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label className="flex flex-col">
                <span className="font-semibold capitalize mb-2">
                    Venue Name
                </span>
                <input
                    type="text"
                    value={settings.name}
                    onChange={(e) =>
                        setSettings({ ...settings, name: e.target.value })
                    }
                    className="p-2 text-lg border rounded-xl focus:ring ring-green-300 outline-none"
                />
            </label>
            <label className="flex flex-col">
                <span className="font-semibold capitalize mb-2 flex gap-2">
                    <span className="w-5">
                        <Image src={michelinSvg} alt="michelin-star" />
                    </span>{" "}
                    Number of Michelin Stars
                </span>
                <StarSelector
                    michelin_stars={settings.michelin_stars}
                    setStars={(s: number) =>
                        setSettings({ ...settings, michelin_stars: s })
                    }
                />
            </label>
            <div className="col-span-2">
                <label className="flex flex-col">
                    <span className="font-semibold capitalize mb-2">
                        Your Motto Phrase
                    </span>
                    <input
                        type="text"
                        value={settings.motto}
                        onChange={(e) =>
                            setSettings({ ...settings, motto: e.target.value })
                        }
                        className="p-2 text-lg border rounded-xl focus:ring ring-green-300 outline-none"
                    />
                </label>
            </div>
            <div className="col-span-2 flex justify-end">
                <button className="btn-primary-green" onClick={update}>
                    Update Settings
                </button>
            </div>
        </div>
    ) : null
}

export default General
