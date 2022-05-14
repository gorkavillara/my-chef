import { Timestamp } from "firebase/firestore"
import React, { useState, useContext } from "react"
import { IoRocket } from "react-icons/io5"
import { AdminContext } from "../.."
import { addNewBooking } from "../../../../controllers/DBController"
import { Store } from "../../../../models"
import Input from "../forms/Input"
import Loading from "../Loading"

const allergies = [
    "Crustacean",
    "Fish",
    "Gluten-free",
    "Nuts",
    "Peanuts",
    "Pescatarian",
    "Pork",
    "Pregnant",
    "Shellfish",
    "Vegetarian",
]

const nationalities = ["ESP", "ENG", "ITA", "FRA", "EUSK"]

const FormNewBooking = ({ store }: { store: Store }) => {
    const [booking, setBooking] = useState({
        allergies: [],
        name: "",
        nationality: "",
        notes: "",
        pax: 0,
        table: "",
        time: new Date(),
        menu: {},
        status: "waiting",
    })
    const [selectedTablesArray, setSelectedTablesArray] = useState<string[]>([])
    const [menuName, setMenuName] = useState<string>("")
    const [loading] = useState<boolean>(false)

    const { closeModal, setRoute } = useContext(AdminContext)

    const menus =
        store?.menus?.length > 0 ? store.menus.map((menu) => menu.name) : []

    const setMenu = (e) => {
        setMenuName(e.target.value)
        const menu = store.menus.find((menu) => menu.name === e.target.value)
        setBooking({ ...booking, menu })
    }

    const toggleTable = (table: string) => {
        let tabs = []
        if (selectedTablesArray.some((tab) => tab === table)) {
            tabs = selectedTablesArray.filter((tab) => tab !== table)
        } else {
            tabs = [...selectedTablesArray, table]
        }
        tabs = tabs.filter((tab) => tab !== "")
        setSelectedTablesArray([...tabs])
        setBooking({ ...booking, table: tabs.join(", ") })
    }

    const toggleAllergy = (allergy: string) => {
        if (booking.allergies.includes(allergy)) {
            const all = booking.allergies.filter((all) => all !== allergy)
            setBooking({ ...booking, allergies: all })
        } else {
            setBooking({
                ...booking,
                allergies: [...booking.allergies, allergy],
            })
        }
    }

    const submitNewBooking = () => {
        closeModal()
        addNewBooking({
            booking: { ...booking, time: Timestamp.fromDate(booking.time) },
            store,
        }).catch((e) => console.log(e))
    }

    const isCompleted = () => {
        if (booking.name === "") return false
        // if (booking.table === "") return false
        if (booking.pax === 0) return false
        if (booking.nationality === "") return false
        // if (booking.time === "") return false;
        return true
    }

    const goToSettings = () => {
        setRoute("settings")
        closeModal()
    }

    return store ? (
        <div className="flex flex-col flex-grow justify-between">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                    disabled={loading}
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={booking.name}
                    containerClassName="col-span-2 sm:col-span-1"
                    onChange={(e) =>
                        setBooking({ ...booking, name: e.target.value })
                    }
                />
                <Input
                    disabled={loading}
                    type="number"
                    name="pax"
                    placeholder="Pax"
                    value={booking.pax}
                    containerClassName="col-span-2 sm:col-span-1"
                    onChange={(e) =>
                        setBooking({ ...booking, pax: e.target.value })
                    }
                />
                <Input
                    disabled={loading}
                    type="select"
                    name="nationality"
                    placeholder="Nationality"
                    value={booking.nationality}
                    options={nationalities}
                    containerClassName="col-span-2 sm:col-span-1"
                    onChange={(e) =>
                        setBooking({ ...booking, nationality: e.target.value })
                    }
                />
                {store.menus?.length > 0 ? (
                    <Input
                        disabled={loading}
                        type="select"
                        name="menu"
                        placeholder="Menu"
                        value={menuName}
                        options={menus}
                        containerClassName="col-span-2 sm:col-span-1"
                        onChange={(e) => setMenu(e)}
                    />
                ) : (
                    <div className="w-full h-full flex flex-col gap-2 items-center justify-center p-4">
                        <h3 className="font-semibold text-center text-slate-700 italic">
                            There are no eligible menus, please create one in
                            Settings Menu
                        </h3>
                        <button
                            className="btn-secondary-green max-w-lg"
                            onClick={goToSettings}
                        >
                            Go To Settings Menu
                        </button>
                    </div>
                )}
                {store.tables?.length > 0 ? (
                    <Input
                        disabled={loading}
                        type="chip-select"
                        name="table"
                        placeholder="Table"
                        value={booking.table}
                        color="blue"
                        containerClassName="col-span-2 sm:col-span-1"
                        options={store.tables.map((table) => table.name)}
                        onChange={toggleTable}
                    />
                ) : (
                    <div className="w-full h-full flex flex-col gap-2 items-center justify-center p-4">
                        <h3 className="font-semibold text-center text-slate-700 italic">
                            There are no eligible tables, please create one in
                            Settings Menu
                        </h3>
                        <button
                            className="btn-secondary-green max-w-lg"
                            onClick={goToSettings}
                        >
                            Go To Settings Menu
                        </button>
                    </div>
                )}
                <Input
                    disabled={loading}
                    type="datetime"
                    name="time"
                    placeholder="Time"
                    containerClassName="col-span-2 sm:col-span-1"
                    value={booking.time}
                    onChange={(e) => setBooking({ ...booking, time: e })}
                />
                <Input
                    disabled={loading}
                    type="chip-select"
                    name="allergies"
                    placeholder="allergies"
                    value={booking.allergies}
                    options={allergies}
                    containerClassName="col-span-2"
                    onChange={(e: string) => toggleAllergy(e)}
                />
            </div>
            <button
                className="m-6 btn-primary-green"
                onClick={submitNewBooking}
                disabled={!isCompleted() || loading}
            >
                {loading ? (
                    <span className="flex items-center gap-2">
                        <Loading /> Submitting...
                    </span>
                ) : (
                    <span className="flex items-center gap-2">
                        <IoRocket /> Submit
                    </span>
                )}
            </button>
        </div>
    ) : null
}

export default FormNewBooking
