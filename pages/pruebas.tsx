import axios from "axios"
import React from "react"
import {
    getReservations,
    getVenues,
} from "../controllers/IntegrationsController"

const pruebas = () => {
    const handleClick = () =>
        axios
            .post("/api/integrations", {
                action: "auth",
                integrations: [
                    {
                        provider: "sevenrooms",
                        clientID:
                            "12c8007c17539b510952857d8921986c2d376df3cef828519e99adca2b13215c05d19eb5e0d78b19ae34d9028e5db39b0db2d64e1db9e14e6f473d2c56e53e51",
                    },
                ],
            })
            .then((r) => {
                console.log(r)
                const int_token = r.data.data
                console.log(int_token)
                const date = new Date(int_token.token_expiration_datetime)
                console.log(date)
            })
            .catch((e) => console.error(e))

    const handlePrueba = async () => {
        const venues = await getVenues(
            "ahhzfnNldmVucm9vbXMtc2VjdXJlLWRlbW9yIQsSFG5pZ2h0bG9vcF9WZW51ZUdyb3VwGICAoP6r7vAIDA",
            "d1e00b834cf31125fb1d5edeb8fa2c06dc8ac39cd16ef49e5b72e752b80d55a9690c70a15a6241a6bc63a06811c4e3b2bfb7bba91d242c69f5f21c8b65283ddc"
        )
        console.log(venues)
    }

    const obtenReservas = async () => {
        const reservas = await getReservations(
            "ahhzfnNldmVucm9vbXMtc2VjdXJlLWRlbW9yHAsSD25pZ2h0bG9vcF9WZW51ZRiAgMiAmIa1CQw",
            new Date(2021, 0, 1),
            new Date(2022, 11, 31),
            "d1e00b834cf31125fb1d5edeb8fa2c06dc8ac39cd16ef49e5b72e752b80d55a9690c70a15a6241a6bc63a06811c4e3b2bfb7bba91d242c69f5f21c8b65283ddc"
        )
        console.log(reservas)
    }

    return (
        <div className="flex flex-col h-screen justify-center items-center">
            <span className="mb-4 font-semibold text-xl">pruebas</span>
            <button onClick={handleClick}>Llamar</button>
            <button onClick={handlePrueba}>Probar</button>
            <button onClick={obtenReservas}>Reservas</button>
        </div>
    )
}

export default pruebas
