import React, { useContext } from "react"
import michelinSvg from "../../../utils/svgs/michelin-star.svg"
import Image from "next/image"
import { AdminContext } from "../index"

const MottoPhrase = () => {
    const { store } = useContext(AdminContext)
    return store ? (
        <div className="bg-blue-50 pb-8 flex justify-center gap-4">
            <div className="flex gap-2">
                {store.settings?.michelin_stars > 0 &&
                    Array(store.settings.michelin_stars)
                        .fill("")
                        .map((_, i) => (
                            <div key={i} className="w-5 flex gap-2">
                                <Image src={michelinSvg} alt="michelin-star" />
                            </div>
                        ))}
            </div>
            <span className="text-slate-700 capitalize text-lg italic font-semibold">
                {store.settings.motto}
            </span>
        </div>
    ) : null
}

export default MottoPhrase
