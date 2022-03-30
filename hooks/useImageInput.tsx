import React, { useState, useRef } from "react"
import { IoCamera } from "react-icons/io5"

const useImageInput = (imageUrl = "") => {
    const [imageSrc, setImageSrc] = useState<string>(imageUrl)
    const [file, setFile] = useState()
    const [fileUploaded, setFileUploaded] = useState(false)

    const inputRef = useRef(null)

    const handleOnChange = (e) => {
        setFileUploaded(true)
        const reader = new FileReader()
        reader.onload = (onLoadEvent) => {
            setImageSrc(onLoadEvent.target.result.toString())
        }
        reader.readAsDataURL(e.target.files[0])
        setFile(e.target.files[0])
    }

    const uploadImage = async () => {
        const formData = new FormData()
        formData.append("file", file)
        formData.append("upload_preset", "cloud-images")
        const data = await fetch(
            "https://api.cloudinary.com/v1_1/dyddijwxv/image/upload",
            {
                method: "POST",
                body: formData,
            }
        )
            .then((r) => r.json())
            .catch((e) => console.log(e))
        return data
    }
    const onInputClick = () => {
        inputRef.current.click()
    }
    const ImageInput = ({ className = "", visualUrl = "" }) => (
        <div className={className}>
            <div
                className="w-full h-full bg-blue-200 cursor-pointer flex justify-center items-center overflow-hidden"
                onClick={onInputClick}
            >
                {imageSrc ? (
                    <img
                        src={imageSrc}
                        alt="image"
                        className="w-full"
                    />
                ) : visualUrl !== "" ? (
                    <img
                        src={visualUrl}
                        alt="image"
                        className="w-full"
                    />
                ) : (
                    <>
                        <IoCamera className="text-5xl text-white" />
                    </>
                )}
            </div>
            <input
                ref={inputRef}
                type="file"
                name="file"
                hidden={true}
                onChange={handleOnChange}
            />
        </div>
    )

    return {
        ImageInput,
        uploadImage,
        fileUploaded,
    }
}

export default useImageInput
