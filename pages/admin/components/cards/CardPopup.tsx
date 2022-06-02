import React, { Dispatch, SetStateAction } from "react"

const CardPopup = ({
    activePopup,
    setActivePopup,
}: {
    activePopup: boolean
    setActivePopup: Dispatch<SetStateAction<boolean>>
}) => {
    return (
        <div
            className={`${
                activePopup ? "absolute" : "hidden"
            } top-0 left-0 w-full h-full z-40`}
            onClick={() => setActivePopup(false)}
        ></div>
    )
}

export default CardPopup
