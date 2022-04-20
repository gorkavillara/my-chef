import { db } from "./firebase-config"
import {
    addDoc,
    doc,
    updateDoc,
    getDocs,
    collection,
    arrayUnion,
    query,
    where,
    setDoc,
    Timestamp,
} from "firebase/firestore"
import {
    User,
    Store,
    Booking,
    Dish,
    Menu,
    Pairing,
    Settings,
    Integration,
} from "../models"

export const registerNewTable = async ({ table, store }) => {
    const storeRef = doc(db, "stores", store.id)
    await updateDoc(storeRef, {
        tables: arrayUnion(table),
    })
    const newStore = { ...store, tables: [...store.tables, table] }
    return { store: newStore }
}

export const registerMultipleTables = async ({ tables, store }) => {
    const newStore = { ...store, tables: [...store.tables, ...tables] }
    await setDoc(doc(db, "stores", store.id), newStore)
    return { store: newStore }
}

export const updateTable = async ({ table, store, id }) => {
    const storeRef = doc(db, "stores", store.id)
    const tables = store.tables.map((tab, i) => (id === i ? tab : table))
    await updateDoc(storeRef, { tables })
    const newStore = { ...store, tables }
    return { store: newStore }
}

export const deleteTable = async ({ store, id }) => {
    const storeRef = doc(db, "stores", store.id)
    const tables = store.tables.filter((tab, i) => id !== i)
    await updateDoc(storeRef, { tables })
    const newStore = { ...store, tables }
    return { store: newStore }
}

export const registerNewDish = async ({ dish, store }) => {
    const storeRef = doc(db, "stores", store.id)
    await updateDoc(storeRef, {
        dishes: arrayUnion(dish),
    })
    const newStore = { ...store, dishes: [...store.dishes, dish] }
    return { store: newStore }
}

export const updateDish = async ({ dish, store }) => {
    const dishes = store.dishes.map((d: Dish) =>
        d.name === dish.name ? dish : d
    )
    const newStore = { ...store, dishes }
    await setDoc(doc(db, "stores", store.id), newStore)
    return { store: newStore }
}

export const deleteDish = async ({ dish, store }) => {
    const dishes = store.dishes.filter((d: Dish) => dish.name !== d.name)
    const newStore = { ...store, dishes }
    await setDoc(doc(db, "stores", store.id), newStore)
    return { store: newStore }
}

export const registerNewPairing = async ({ pairing, store }) => {
    const storeRef = doc(db, "stores", store.id)
    await updateDoc(storeRef, {
        pairings: arrayUnion(pairing),
    })
    const newStore = { ...store, pairings: [...store.pairings, pairing] }
    return { store: newStore }
}

export const updatePairing = async ({ pairing, store }) => {
    const pairings = store.pairings.map((p: Pairing) =>
        p.name === pairing.name ? pairing : p
    )
    const newStore = { ...store, pairings }
    await setDoc(doc(db, "stores", store.id), newStore)
    return { store: newStore }
}
export const deletePairing = async ({ pairing, store }) => {
    const pairings = store.pairings.filter(
        (pair: Pairing) => pair.name !== pairing.name
    )
    const newStore = { ...store, pairings }
    await setDoc(doc(db, "stores", store.id), newStore)
    return { store: newStore }
}

export const registerUser = async ({ user, store }) => {
    const storeRef = doc(db, "stores", store.id)
    const users = [...store.settings.users, user]
    const settings = { ...store.settings, users }
    await updateDoc(storeRef, { settings })
    const newStore = { ...store, settings }
    return { store: newStore }
}

export const deleteUser = async ({ user, store }) => {
    const storeRef = doc(db, "stores", store.id)
    const users = store.settings.users.filter((us) => us.email !== user.email)
    const settings = { ...store.settings, users }
    await updateDoc(storeRef, { settings })
    const newStore = { ...store, settings }
    return { store: newStore }
}

export const updateUser = async ({ user, store }) => {
    const storeRef = doc(db, "stores", store.id)
    const users = store.settings.users.map((us) =>
        us.email === user.email ? user : us
    )
    const settings = { ...store.settings, users }
    await updateDoc(storeRef, { settings })
    const newStore = { ...store, settings }
    return { store: newStore }
}

export const registerNewMenu = async ({ menu, store }) => {
    const storeRef = doc(db, "stores", store.id)
    await updateDoc(storeRef, {
        menus: arrayUnion(menu),
    })
    const newStore = { ...store, menus: [...store.menus, menu] }
    return { store: newStore }
}

export const updateMenu = async ({ menu, store }) => {
    const menus = store.menus.map((m: Menu) =>
        m.name === menu.name ? menu : m
    )
    const newStore = { ...store, menus }
    await setDoc(doc(db, "stores", store.id), newStore)
    return { store: newStore }
}

export const deleteMenu = async ({ menu, store }) => {
    const menus = store.menus.filter((m: Menu) => menu.name !== m.name)
    const newStore = { ...store, menus }
    await setDoc(doc(db, "stores", store.id), newStore)
    return { store: newStore }
}

export const getStoresByUserEmail = async ({
    userEmail,
}: {
    userEmail: string
}) => {
    const sRef = collection(db, "stores")
    const s = await getDocs(sRef)
    const allStores = s.docs.map((item) => ({ ...item.data(), id: item.id }))
    const stores: Store[] = allStores.filter((st: Store) =>
        st.settings.users.find((us: User) => us.email === userEmail)
    )
    if (stores.length === 0) return false
    const user: User = stores[0].settings.users.find(
        (us: User) => us.email === userEmail
    )
    return { stores, role: user.role }
}
export const getBookingsByStore = async ({ id }: { id: string }) => {
    const q = query(collection(db, "bookings"), where("store_id", "==", id))
    const querySnapshot = await getDocs(q)
    let bookings = []
    querySnapshot.forEach((doc) => bookings.push({ ...doc.data(), id: doc.id }))
    return { bookings }
}

export const addNewMenu = async ({
    store,
    menu,
}: {
    store: Store
    menu: object
}) => {
    const storeRef = doc(db, "stores", store.id)
    await updateDoc(storeRef, {
        menus: arrayUnion(menu),
    })
    return true
}

export const addNewBooking = async ({
    booking,
    store,
}: {
    booking: any
    store: Store
}) => {
    const r = await addDoc(collection(db, "bookings"), {
        ...booking,
        store_id: store.id,
    })
    return { booking: { ...booking, id: r.id } }
}

export const saveNotes = async ({
    handwrittenNotesUrl,
    booking,
    newNotes,
}: {
    handwrittenNotesUrl: string
    booking: Booking
    newNotes: string
}) => {
    if (handwrittenNotesUrl === "") return false
    const newBooking = {
        ...booking,
        notes: newNotes,
        handwrittenNotesUrl,
    }
    await setDoc(doc(db, "bookings", booking.id), newBooking)
    return { booking: newBooking }
}

export const saveNotesString = async ({
    booking,
    newNotes,
}: {
    booking: Booking
    newNotes: string
}) => {
    const newBooking = {
        ...booking,
        notes: newNotes,
    }
    await setDoc(doc(db, "bookings", booking.id), newBooking)
    return { booking: newBooking }
}

export const saveDishNotes = async ({
    handwrittenNotesUrl,
    dish,
    booking,
    newNotes,
}: {
    handwrittenNotesUrl: string
    dish: Dish
    booking: Booking
    newNotes: string
}) => {
    if (handwrittenNotesUrl === "") return false
    const newDish = {
        ...dish,
        notes: newNotes,
        handwrittenNotesUrl,
    }
    const newDishes = booking.menu.dishes.map((d) =>
        d.name === dish.name ? newDish : d
    )
    const newMenu = {
        ...booking.menu,
        dishes: newDishes,
    }
    const newBooking = {
        ...booking,
        menu: newMenu,
    }
    await setDoc(doc(db, "bookings", booking.id), newBooking)
    return { booking: newBooking }
}

export const saveDishNotesString = async ({
    dish,
    booking,
    newNotes,
}: {
    dish: Dish
    booking: Booking
    newNotes: string
}) => {
    const newDish = {
        ...dish,
        notes: newNotes,
    }
    const newDishes = booking.menu.dishes.map((d) =>
        d.name === dish.name ? newDish : d
    )
    const newMenu = {
        ...booking.menu,
        dishes: newDishes,
    }
    const newBooking = {
        ...booking,
        menu: newMenu,
    }
    await setDoc(doc(db, "bookings", booking.id), newBooking)
    return { booking: newBooking }
}

export const editBookingStatus = async ({
    booking,
    bookings,
    newStatus,
}: {
    booking: Booking
    bookings: Booking[]
    newStatus: string
}) => {
    const newBooking = { ...booking, status: newStatus }
    await setDoc(doc(db, "bookings", booking.id), newBooking)
    const newBookings = bookings.map((book) =>
        book.id === booking.id ? newBooking : book
    )
    return { bookings: newBookings }
}

export const editBookingAllergies = async ({
    booking,
    bookings,
    newAllergies,
}: {
    booking: Booking
    bookings: Booking[]
    newAllergies: string[]
}) => {
    const newBooking = { ...booking, allergies: newAllergies }
    await setDoc(doc(db, "bookings", booking.id), newBooking)
    const newBookings = bookings.map((book) =>
        book.id === booking.id ? newBooking : book
    )
    return { bookings: newBookings }
}

export const editBookingMenu = async ({
    booking,
    bookings,
    newMenu,
}: {
    booking: Booking
    bookings: Booking[]
    newMenu: Menu
}) => {
    const newBooking = { ...booking, menu: newMenu }
    await setDoc(doc(db, "bookings", booking.id), newBooking)
    const newBookings = bookings.map((book) =>
        book.id === booking.id ? newBooking : book
    )
    return { bookings: newBookings }
}

export const editBookingGreeting = async ({
    booking,
    bookings,
    greeted,
}: {
    booking: Booking
    bookings: Booking[]
    greeted: string
}) => {
    const newBooking = { ...booking, greeted }
    await setDoc(doc(db, "bookings", booking.id), newBooking)
    const newBookings = bookings.map((book) =>
        book.id === booking.id ? newBooking : book
    )
    return { bookings: newBookings }
}

export const updateBookingDish = async ({
    booking,
    bookings,
    newDish,
}: {
    booking: Booking
    bookings: Booking[]
    newDish: Dish
}) => {
    const dishes = booking.menu.dishes.map((dish) =>
        dish.name === newDish.name ? newDish : dish
    )
    const newBooking = { ...booking, menu: { ...booking.menu, dishes } }
    await setDoc(doc(db, "bookings", booking.id), newBooking)
    const newBookings = bookings.map((book) =>
        book.id === booking.id ? newBooking : book
    )
    return { bookings: newBookings }
}

export const changeTable = async ({
    booking,
    bookings,
    newTable,
}: {
    booking: Booking
    bookings: Booking[]
    newTable: string
}) => {
    const newBooking = { ...booking, table: newTable }
    await setDoc(doc(db, "bookings", booking.id), newBooking)
    const newBookings = bookings.map((book) =>
        book.id === booking.id ? newBooking : book
    )
    return { bookings: newBookings }
}

export const deleteBookingDish = async ({
    booking,
    bookings,
    newDish,
}: {
    booking: Booking
    bookings: Booking[]
    newDish: Dish
}) => {
    const dishes = booking.menu.dishes.filter(
        (dish) => dish.name !== newDish.name
    )
    const newBooking = { ...booking, menu: { ...booking.menu, dishes } }
    await setDoc(doc(db, "bookings", booking.id), newBooking)
    const newBookings = bookings.map((book) =>
        book.id === booking.id ? newBooking : book
    )
    return { bookings: newBookings }
}

export const changeTime = async ({
    booking,
    bookings,
    time,
}: {
    booking: Booking
    bookings: Booking[]
    time: Date
}) => {
    const t = new Date(time)
    const newBooking = { ...booking, time: Timestamp.fromDate(t) }
    await setDoc(doc(db, "bookings", booking.id), newBooking)
    const newBookings = bookings.map((book) =>
        book.id === booking.id ? newBooking : book
    )
    return { bookings: newBookings }
}

export const changeNationality = async ({
    booking,
    bookings,
    nationality,
}: {
    booking: Booking
    bookings: Booking[]
    nationality: string
}) => {
    const newBooking = { ...booking, nationality }
    await setDoc(doc(db, "bookings", booking.id), newBooking)
    const newBookings = bookings.map((book) =>
        book.id === booking.id ? newBooking : book
    )
    return { bookings: newBookings }
}

export const setPairings = async ({
    booking,
    bookings,
    pairings,
}: {
    booking: Booking
    bookings: Booking[]
    pairings: Pairing[]
}) => {
    const newBooking = { ...booking, pairings }
    await setDoc(doc(db, "bookings", booking.id), newBooking)
    const newBookings = bookings.map((book) =>
        book.id === booking.id ? newBooking : book
    )
    return { bookings: newBookings }
}

export const updateSettings = async ({
    store,
    settings,
}: {
    store: Store
    settings: Settings
}) => {
    const storeRef = doc(db, "stores", store.id)
    await updateDoc(storeRef, { settings })
    const newStore = { ...store, settings }
    return newStore
}

export const updateIntegrations = async ({
    store,
    integrations,
}: {
    store: Store
    integrations: Integration[]
}) => {
    const storeRef = doc(db, "stores", store.id)
    await updateDoc(storeRef, { settings: { ...store.settings, integrations } })
    const newStore = { ...store, settings: { ...store.settings, integrations } }
    return newStore
}

export const deleteIntegration = async ({
    store,
    integration,
}: {
    store: Store
    integration: Integration
}) => {
    const storeRef = doc(db, "stores", store.id)
    const newIntegrations = store.settings.integrations.filter(
        (int) => int.provider !== integration.provider
    )
    await updateDoc(storeRef, {
        settings: { ...store.settings, integrations: newIntegrations },
    })
    const newStore = {
        ...store,
        settings: { ...store.settings, integrations: newIntegrations },
    }
    return newStore
}
