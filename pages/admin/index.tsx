import React, {
    useState,
    createContext,
    Dispatch,
    SetStateAction,
    useEffect,
    useCallback,
} from "react"
import Head from "next/head"
import MainDashboard from "./views/MainDashboard"
import Sidebar from "./components/Sidebar"
import { Booking, Store, User } from "../../models"
import { initializeBookings } from "../../controllers/BookingsController"
import ModalController from "./components/ModalController"

import { Auth } from "firebase/auth"
import {
    query,
    collection,
    where,
    onSnapshot,
    Firestore,
    enableIndexedDbPersistence,
} from "firebase/firestore"
import { db } from "../../firebase/client"
import {
    getBookingsByStore,
    getStoresByUserEmail,
} from "../../controllers/DBController"

import {
    getNewToken,
    getTodayReservations,
} from "../../controllers/IntegrationsController"

enableIndexedDbPersistence(db).catch((err) => {
    if (err.code == "failed-precondition") {
        // Multiple tabs open, persistence can only be enabled
        // in one tab at a a time.
        console.error(err.code)
    } else if (err.code == "unimplemented") {
        // The current browser does not support all of the
        // features required to enable persistence
        console.error(err.code)
    }
})

interface ContextInterface {
    auth?: Auth
    route?: string
    bookings?: Booking[]
    setRoute?: Dispatch<SetStateAction<string>>
    setBookings?: Dispatch<SetStateAction<object[]>>
    openModal?: Function
    closeModal?: Function
    store?: Store
    setStore?: Dispatch<SetStateAction<Store>>
    date?: Date
    setDate?: Dispatch<SetStateAction<Date>>
    activeRole?: string
    user?: User
    db?: Firestore
    expanded?: boolean
    setExpanded?: Dispatch<SetStateAction<boolean>>
    refreshBookings?: Function
}

export const AdminContext = createContext<ContextInterface>({})

//eslint-disable-next-line
const Admin = ({ user, auth }) => {
    const [route, setRoute] = useState<string>("tables")
    const [bookings, setBookings] = useState<Booking[]>([])
    const [activeModal, setActiveModal] = useState<boolean>(false)
    const [modalContent, setModalContent] = useState<string>("")
    const [modalData, setModalData] = useState<object>({})
    const [store, setStore] = useState<Store>()
    const [date, setDate] = useState<Date>(new Date())
    const [activeRole, setActiveRole] = useState<string>("")
    const [expanded, setExpanded] = useState(false)

    const goBackFunction = useCallback((event: any) => {
        event.preventDefault()
        setRoute("tables")
        closeModal()
    }, [])

    useEffect(() => {
        if (typeof window === "undefined") return
        window.history.pushState(null, null, window.location.pathname)
        window.addEventListener("popstate", goBackFunction)
        window.addEventListener("beforeunload", goBackFunction)
        return () => {
            window.removeEventListener("popstate", goBackFunction)
            window.removeEventListener("beforeunload", goBackFunction)
        }
    }, [goBackFunction])

    useEffect(() => {
        if (!store) return
        const qRef = query(
            collection(db, "bookings"),
            where("store_id", "==", store.id)
        )
        const unsubscribe = onSnapshot(qRef, (docs) => {
            let storeBookings = []
            docs.forEach((doc) =>
                storeBookings.push({ ...doc.data(), id: doc.id })
            )
            console.log(storeBookings)
            setBookings(storeBookings)
        })
        return unsubscribe
    }, [store])

    useEffect(() => {
        if (!store) return
        if (!user) return
        const us = store.settings.users.find((us) => user.email === us.email)
        setActiveRole(us.role)
    }, [store, user])

    useEffect(() => {
        if (!user) return
        getStoresByUserEmail({ userEmail: user.email })
            .then((data: { stores: Store[]; role: string }) =>
                setStore(data.stores[0])
            )
            .catch((e) => console.error(e))
    }, [user])

    useEffect(() => {
        if (!store) return
        getBookingsByStore({ id: store.id }).then((data) => {
            const newBookings: Booking[] = initializeBookings(data.bookings)
            setBookings(newBookings)
        })
    }, [store])

    const openModal = (content: string, data: object = {}) => {
        setModalContent(content)
        setModalData(data)
        setActiveModal(true)
    }
    const closeModal = () => {
        setActiveModal(false)
    }

    const refreshBookings = async () => {
        // 1 - Chequea si hay algo en localstorage
        var int_token = JSON.parse(localStorage.getItem("int_token"))
        // 2 - Si hay, chequea que sea válido
        // 3 - Si no es válido -> Vuelve a autenticar
        if (
            !int_token ||
            new Date() > new Date(int_token.token_expiration_datetime)
        ) {
            // Haz autenticación y guárdalo en localStorage
            int_token = await getNewToken(store.settings.integrations)
            localStorage.setItem("int_token", JSON.stringify(int_token))
        }
        // 4 - Una vez tengamos el token -> Buscamos reservas
        const { venueID } = store.settings.integrations.find(
            (i) => i.provider === "sevenrooms"
        )
        return await getTodayReservations(bookings, date, store, venueID, int_token.token)
    }

    return (
        <>
            <Head>
                <title>My Rapid Chef</title>
                <link rel="icon" href="/favicon_256x256.png" />
                <link rel="manifest" href="/manifest.json" />
            </Head>
            <AdminContext.Provider
                value={{
                    auth,
                    route,
                    setRoute,
                    bookings,
                    setBookings,
                    openModal,
                    closeModal,
                    store,
                    setStore,
                    date,
                    setDate,
                    user,
                    activeRole,
                    db,
                    expanded,
                    setExpanded,
                    refreshBookings,
                }}
            >
                <div className="flex flex-col-reverse sm:flex-row h-full w-full items-stretch scroll-hidden">
                    <Sidebar />
                    <MainDashboard />
                </div>
                <ModalController
                    visible={activeModal}
                    onClose={closeModal}
                    modalContent={modalContent}
                    data={modalData}
                />
            </AdminContext.Provider>
        </>
    )
}

export default Admin
