import React from "react"
import { FaRestroom } from "react-icons/fa"

const Timer = ({
    timeLimit,
    watchTime,
    stopped,
    size = "sm",
}: {
    timeLimit: number
    watchTime: number
    stopped: boolean
    size?: string
}) =>
    watchTime > 700 && (
        <div className="absolute w-full -top-6 flex justify-center">
            <span
                className={`rounded-lg shadow-lg ${
                    size === "sm" ? "py-1" : "py-2"
                } px-4 text-2xl font-semibold w-32 flex justify-center items-center ${
                    timeLimit === 0 || watchTime < 0.75 * timeLimit * 60000
                        ? "bg-white"
                        : watchTime < timeLimit * 60000
                        ? "bg-yellow-400"
                        : "bg-red-400 animate-bounce text-white"
                }
    `}
            >
                <span>
                    {("0" + Math.floor((watchTime / 60000) % 60)).slice(-2)}:
                </span>
                <span>
                    {("0" + Math.floor((watchTime / 1000) % 60)).slice(-2)}
                </span>
                {stopped && (
                    <span
                        className={`ml-3 ${
                            size === "sm" ? "p-1" : "p-2"
                        } rounded-lg bg-yellow-100`}
                    >
                        <FaRestroom className="text-yellow-600" />
                    </span>
                )}
            </span>
        </div>
    )

export default Timer
