import axios from "axios"
import { Integration, Store } from "../models"
import { importBookings } from "./DBController"

export const auth = async (integrations: Integration[]) => {
    const int = integrations?.find((i) => i.provider === "sevenrooms")
    if (!int) return false
    const formData = {
        client_id: int.clientID,
        client_secret: process.env.SEVEN_ROOMS_SECRET,
    }
    console.log("Llamando...")
    const resp = await fetch(`${process.env.SEVEN_ROOMS_BASE_URL}/auth`, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams(formData).toString(),
    })

    const data = await resp.text()
    return JSON.parse(data)
}

export const getNewToken = async (integrations: Integration[]) =>
    axios
        .post("/api/integrations", { action: "auth", integrations })
        .then((r) => r.data.data)
        .catch((e) => console.error(e))

export const getVenues = async (venue_group_id: string, apiKey: string) => {
    const query = new URLSearchParams({
        venue_group_id,
        limit: "50",
    }).toString()

    const resp = await fetch(
        `${process.env.SEVEN_ROOMS_BASE_URL}/venues?${query}`,
        {
            method: "GET",
            headers: {
                Authorization: apiKey,
            },
        }
    )

    const data = await resp.text()
    return JSON.parse(data)
}

// venue_id = ahhzfnNldmVucm9vbXMtc2VjdXJlLWRlbW9yHAsSD25pZ2h0bG9vcF9WZW51ZRiAgLDZ_cGYCQw

export const getReservations = async (
    venue_id: string,
    from: Date,
    to: Date,
    apiKey: string
) => {
    const from_date = `${from.getFullYear()}-${Number(
        from.getMonth() + 1
    )}-${from.getDate()}`
    const to_date = `${to.getFullYear()}-${Number(
        to.getMonth() + 1
    )}-${to.getDate()}`
    const query = new URLSearchParams({
        venue_id,
        limit: "50",
        from_date,
        to_date,
    }).toString()

    const resp = await fetch(
        `${process.env.SEVEN_ROOMS_BASE_URL}/reservations?${query}`,
        {
            method: "GET",
            headers: {
                Authorization: apiKey,
            },
        }
    )

    const data = await resp.text()
    return JSON.parse(data)
}

export const getTodayReservations = async (
    date: Date,
    store: Store,
    venue_id: string,
    apiKey: string
) => {
    const from_date = `${date.getFullYear()}-${Number(
        date.getMonth() + 1
    )}-${date.getDate()}`
    const to_date = `${date.getFullYear()}-${Number(
        date.getMonth() + 1
    )}-${date.getDate()}`
    const query = new URLSearchParams({
        venue_id,
        limit: "50",
        from_date,
        to_date,
    }).toString()

    const resp = await fetch(
        `${process.env.SEVEN_ROOMS_BASE_URL}/reservations?${query}`,
        {
            method: "GET",
            headers: {
                Authorization: apiKey,
            },
        }
    )

    const data = await resp.text()
    const json_data = JSON.parse(data)
    const reservations = json_data.data.results

    return await importBookings({ reservations, store })
}
