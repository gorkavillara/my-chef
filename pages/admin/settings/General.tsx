import React, { useContext, useEffect, useState } from "react"
import { toast } from "react-hot-toast"
import { AdminContext } from ".."
import Image from "next/image"
import michelinSvg from "../../../utils/svgs/michelin-star.svg"
import { Settings } from "../../../models"
import { updateSettings } from "../../../controllers/DBController"
import Input from "../components/forms/Input"

const StarRender = ({ amount }) => {
    return (
        <span className="flex items-center gap-2">
            {amount > 0
                ? Array(amount)
                      .fill(0)
                      .map((_, i) => (
                          <span key={i} className="flex w-5 items-center">
                              <Image src={michelinSvg} alt="michelin-star" />
                          </span>
                      ))
                : "None"}
        </span>
    )
}

const StarSelector = ({ michelin_stars, setStars }) => {
    return (
        <div className="flex items-center gap-2">
            {[0, 1, 2, 3].map((num) => (
                <button
                    key={num}
                    className={`rounded-lg border py-3 px-4 ${
                        num === michelin_stars &&
                        "border-2 border-green-500 bg-green-50"
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
    const { store, setStore, device_id } = useContext(AdminContext)
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
            },
        })
    }

    return settings ? (
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2">
            <label className="col-span-2 flex flex-col sm:col-span-1">
                <span className="mb-2 font-semibold capitalize">
                    Venue Name
                </span>
                <input
                    type="text"
                    value={settings.name}
                    onChange={(e) =>
                        setSettings({ ...settings, name: e.target.value })
                    }
                    className="rounded-xl border p-2 text-lg outline-none ring-green-300 focus:ring"
                />
            </label>
            <label className="col-span-2 flex flex-col sm:col-span-1">
                <span className="mb-2 flex gap-2 font-semibold capitalize">
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
                    <span className="mb-2 font-semibold capitalize">
                        Your Motto Phrase
                    </span>
                    <input
                        type="text"
                        value={settings.motto}
                        onChange={(e) =>
                            setSettings({ ...settings, motto: e.target.value })
                        }
                        className="rounded-xl border p-2 text-lg outline-none ring-green-300 focus:ring"
                    />
                </label>
            </div>
            <h3 className="text-2xl">App Settings</h3>
            <div className="col-span-2 flex flex-col gap-4">
                <Input
                    type="toggle"
                    name="auto select"
                    value={settings.autoSelect ? settings.autoSelect : false}
                    onChange={() =>
                        setSettings({
                            ...settings,
                            autoSelect: !settings.autoSelect,
                        })
                    }
                />
                <Input
                    type="toggle"
                    name="random dish selection"
                    value={settings.randomSelection}
                    onChange={() =>
                        setSettings({
                            ...settings,
                            randomSelection: !settings.randomSelection,
                        })
                    }
                />
            </div>
            <div className="col-span-2 flex justify-between">
                <span>Device id: {device_id}</span>
                <button className="btn-primary-green" onClick={update}>
                    Update Settings
                </button>
            </div>
        </div>
    ) : null
}

export default General
