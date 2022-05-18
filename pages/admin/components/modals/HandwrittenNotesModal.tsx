import React, { useRef } from "react"
import CanvasDraw from "react-canvas-draw"
import { IoArrowUndo, IoSave, IoTrashBin } from "react-icons/io5"
import {
    updateDishNotes,
} from "../../../../controllers/DBController"
import { Booking, Dish } from "../../../../models"

const HandwrittenNotesModal = ({
    booking,
    dish,
    closeModal,
}: {
    booking: Booking
    dish: Dish
    closeModal: Function
}) => {
    const canvasRef = useRef(null)
    const saveDraw = () => {
        const url = canvasRef.current.getSaveData()
        closeModal()
        const newDish = {
            ...dish,
            handwrittenNotesUrl: JSON.stringify(url),
        }
        return updateDishNotes({
            dish: newDish,
            booking,
        }).catch((e) => console.log(e))
        ////////////////
    }
    const undoDraw = () => canvasRef.current.undo()
    const eraseDraw = () => canvasRef.current.eraseAll()
    return booking ? (
        <div className="flex flex-col gap-4">
            <h1 className="font-semibold text-lg">Handwritten</h1>
            <div className="p-2 border flex justify-center">
                <CanvasDraw
                    ref={canvasRef}
                    canvasWidth={
                        typeof window !== "undefined"
                            ? window.innerWidth * 0.7
                            : 10
                    }
                    canvasHeight={
                        typeof window !== "undefined"
                            ? window.innerHeight * 0.4
                            : 10
                    }
                    brushRadius={2}
                    lazyRadius={1}
                    brushColor="#222"
                    immediateLoading={true}
                    saveData={
                        dish.handwrittenNotesUrl
                            ? JSON.parse(dish.handwrittenNotesUrl)
                            : null
                    }
                    hideInterface
                />
            </div>
            <div className="flex justify-end gap-4 flex-wrap">
                <button className="btn-secondary-red" onClick={eraseDraw}>
                    <IoTrashBin />
                    Erase
                </button>
                <button className="btn-secondary-red" onClick={undoDraw}>
                    <IoArrowUndo />
                    Undo
                </button>
                <button className="btn-primary-green" onClick={saveDraw}>
                    <IoSave />
                    Save
                </button>
            </div>
        </div>
    ) : null
}

export default HandwrittenNotesModal
