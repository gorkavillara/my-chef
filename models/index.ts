export interface Booking {
    id?: string
    allergies?: string[]
    name: string
    nationality: string
    notes: string
    pax: number
    table: string
    time: any
    menu: Menu
    status: string
    handwrittenNotesUrl?: string
    pairings?: Pairing[]
    greeted?: string
}

export interface User {
    name: string
    email: string
    role: string
    photoURL: string
}

export interface Table {
    name: string
}

export interface Menu {
    dishes: Dish[]
    name: string
}

export interface Dish {
    name: string
    side: boolean
    wine: boolean
    juice: boolean
    products?: Product[]
    allergies?: string[]
    description?: string
    recipe?: string
    sideStatus?: string
    wineStatus?: string
    juiceStatus?: string
    done?: boolean
    status?: string
}

export interface Product {
    name: string
    allergies?: string[]
}

export interface Pairing {
    name: string
    color: string
}

export interface Store {
    id: string
    bookings?: Booking[]
    menus?: Menu[]
    settings?: Settings
    tables?: Table[]
    products?: Product[]
    dishes?: Dish[]
    pairings?: Pairing[]
}

export interface Settings {
    users: User[]
    name: string
    subscription: string
    michelin_stars?: number
    motto?: string
    integrations?: Integration[]
}

export interface Integration {
    provider: string
    baseUrl: string
    logoUrl?: string
    apiKey?: string
    username?: string
    password?: string
    temp?: boolean
}