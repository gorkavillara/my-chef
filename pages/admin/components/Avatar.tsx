import React from "react"
import Image from "next/image"
import { IoPerson } from "react-icons/io5"

type AvatarProps = {
    image: string
}

const Avatar = ({ image }: AvatarProps) => {
    return (
        <div className="w-12 h-12 rounded-full overflow-hidden shadow-lg">
            {image ? (
                <Image
                    src={image}
                    alt={image}
                    width={200}
                    height={250}
                    layout="intrinsic"
                />
            ) : (
                <div className="bg-blue-50 w-full h-full flex justify-center items-center">
                    <IoPerson className="text-2xl" />
                </div>
            )}
        </div>
    )
}

export default Avatar
