import React, { useState, useEffect } from "react"
import { Booking } from "../../../models"
import ActiveCard from "./cards/ActiveCard"
import InactiveCard from "./cards/InactiveCard"
import PendingCard from "./cards/PendingCard"
import { motion } from "framer-motion"

const Card = ({
    booking,
    expanded,
    onClick,
}: {
    booking: Booking
    expanded: boolean
    onClick: any
}) => {
    const [start, setStart] = useState(false)
    const [stopped, setStopped] = useState(false)
    const [watchTime, setWatchTime] = useState(0)
    const [timeLimit, setTimeLimit] = useState<number>(0)
    useEffect(() => {
        if (!booking) return
        if (!booking.menu) return
        if (!booking.menu.dishes) return
        if (booking.menu.dishes.some((d) => d.status === "preparing")) {
            setStart(true)
        } else {
            restartTimer()
        }
    }, [booking])

    useEffect(() => {
        let interval = null
        if (start) {
            if (!stopped) {
                interval = setInterval(() => {
                    setWatchTime((prevTime) => prevTime + 10)
                }, 10)
            }
        } else {
            clearInterval(interval)
        }
        return () => clearInterval(interval)
    }, [start, stopped])

    const restartTimer = () => {
        setWatchTime(0)
        setStart(false)
        setStopped(false)
    }
    const toggleStop = () => setStopped(!stopped)
    return (
        <>
            {booking ? (
                <>
                    <motion.div
                        layout="position"
                        style={{
                            position: expanded ? "absolute" : "relative",
                            zIndex: expanded ? 99 : 1,
                            top: expanded ? "5%" : "",
                            left: expanded ? "10%" : "",
                            minWidth: expanded ? "80%" : "",
                            paddingBottom: expanded ? "3rem" : ""
                        }}
                    >
                        {(booking.status === "open" ||
                            booking.status === "closed") &&
                            (expanded ? (
                                <ActiveCard
                                    booking={booking}
                                    watchTime={watchTime}
                                    timeLimit={timeLimit}
                                    setTimeLimit={setTimeLimit}
                                    toggleStop={toggleStop}
                                    stopped={stopped}
                                />
                            ) : (
                                <InactiveCard
                                    booking={booking}
                                    onClick={onClick}
                                    watchTime={watchTime}
                                    timeLimit={timeLimit}
                                    stopped={stopped}
                                />
                            ))}
                        {(!booking.status || booking.status === "waiting") && (
                            <PendingCard booking={booking} />
                        )}
                    </motion.div>
                </>
            ) : (
                <h1>Cargando...</h1>
            )}
        </>
    )
}

export default Card
