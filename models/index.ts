export interface Booking {
    id?: string
    name: string
    pax: number
    time: any
    allergies?: string[]
    nationality?: string
    notes?: string
    table?: string
    menu?: Menu
    status?: 'open' | 'waiting' | 'closed'
    dinnerStatus?: 'default' | 'arrived' | 'seated'
    handwrittenNotesUrl?: string
    pairings?: Pairing[]
    greeted?: string
    platform_id?: string
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
    dishes?: Dish[]
    name?: string
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
    notes?: Note[]
    handwrittenNotesUrl?: string
    timeLimit?: number
    groupId?: number
}

export interface Note {
    text: string
    tags: string[]
}

export interface Product {
    name: string
    allergies?: string[]
}

export interface Pairing {
    name: string
    color: string
}

export interface Allergy {
    name: string
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
    allergies?: Allergy[]
    groups?: Group[]
}

export interface Group {
    id: number
    name: string
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
    clientID?: string
    venueID?: string
}