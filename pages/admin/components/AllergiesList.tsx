import React from "react"

const AllergiesList = ({
    allergies = [],
    style = "display",
}: {
    allergies: string[]
    style: string
}) => {
    return (
        allergies.length > 0 && (
            <div className="flex gap-1 flex-wrap">
                {style === "display" && (
                    <>
                        <span className="bg-red-400 text-xs text-white py-1 px-2 rounded-full">
                            {allergies[0]}
                        </span>
                        {allergies.length > 1 && (
                            <span className="bg-red-400 text-xs text-white py-1 px-2 rounded-full">
                                {`+${allergies.length - 1}`}
                            </span>
                        )}
                    </>
                )}
                {style === "modal" &&
                    allergies?.map((allergy, i) => (
                        <span
                            key={i}
                            className="bg-red-400 text-white py-1 px-2 rounded-full"
                        >
                            {allergy}
                        </span>
                    ))}
                {style === "table" &&
                    allergies?.map((allergy, i) => (
                        <span
                            key={i}
                            className="bg-red-400 text-white py-1 px-2 rounded-full"
                        >
                            {allergy}
                        </span>
                    ))}
            </div>
        )
    )
}

export default AllergiesList
