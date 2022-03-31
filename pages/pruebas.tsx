import axios from "axios"
import React from "react"
import {
    getReservations,
    getVenues,
} from "../controllers/IntegrationsController"

const pruebas = () => {
    const handleClick = () =>
        axios
            .post("/api/integrations", { action: "auth" })
            .then((r) => {
                const int_token = r.data.data
                console.log(int_token)
                const date = new Date(int_token.token_expiration_datetime)
                console.log(date)
            })
            .catch((e) => console.error(e))

    const handlePrueba = async () => {
        const venues = await getVenues(
            "ahhzfnNldmVucm9vbXMtc2VjdXJlLWRlbW9yIQsSFG5pZ2h0bG9vcF9WZW51ZUdyb3VwGICAoP6r7vAIDA",
            "3cd059b8c4b2dcb91001cd255a3b4414df13d85fc4264d46580f6a04e6ebe7a1ce19258fd259d22212be7d9a9a93d6f655cbab553aa07e27029c8514be3987a0"
        )
        console.log(venues)
    }

    const obtenReservas = async () => {
        const reservas = await getReservations(
            "ahhzfnNldmVucm9vbXMtc2VjdXJlLWRlbW9yHAsSD25pZ2h0bG9vcF9WZW51ZRiAgJCK9tiBCAw",
            new Date(2019, 0, 1),
            new Date(2022, 11, 31),
            "3cd059b8c4b2dcb91001cd255a3b4414df13d85fc4264d46580f6a04e6ebe7a1ce19258fd259d22212be7d9a9a93d6f655cbab553aa07e27029c8514be3987a0"
        )
        console.log(reservas)
    }

    return (
        <div className="flex flex-col h-screen justify-center items-center">
            <div>pruebas</div>
            <button onClick={handleClick}>Llamar</button>
            <button onClick={handlePrueba}>Probar</button>
            <button onClick={obtenReservas}>Reservas</button>
        </div>
    )
}

export default pruebas
