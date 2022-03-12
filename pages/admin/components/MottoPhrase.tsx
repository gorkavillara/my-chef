import React from "react"
import michelinSvg from "../../../utils/svgs/michelin-star.svg"
import Image from "next/image"

const num_stars = 2

const MottoPhrase = () => {
    return (
        <div className="bg-blue-50 pb-8 flex justify-center gap-4">
            <div className="flex gap-2">
                {Array(num_stars)
                    .fill("")
                    .map((_, i) => (
                        <div key={i} className="w-5 flex gap-2">
                            <Image src={michelinSvg} alt="michelin-star" />
                        </div>
                    ))}
            </div>
            <span className="text-slate-700 capitalize text-lg italic font-semibold">
                {"It's not a right it's a privilege, keep pushing every day!"}
            </span>
        </div>
    )
}

export default MottoPhrase
