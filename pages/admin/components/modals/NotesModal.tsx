import React, { useRef, useState } from "react"
import CanvasDraw from "react-canvas-draw"
import { IoArrowUndo, IoSave, IoTrashBin } from "react-icons/io5"
import { saveNotesString } from "../../../../controllers/DBController"
import { Booking } from "../../../../models"

const NotesModal = ({
    notes = "",
    booking,
    closeModal,
}: {
    notes: string
    booking: Booking
    closeModal: Function
}) => {
    const [newNotes, setNewNotes] = useState(notes)
    const canvasRef = useRef(null)
    const saveDraw = () => {
        closeModal()
        saveNotesString({
            newNotes,
            booking,
        }).catch((e) => console.log(e))
    }
    return booking ? (
        <div className="flex flex-col gap-4">
            <h1 className="font-semibold text-lg">Notes</h1>
            <input
                value={newNotes}
                onChange={(e) => setNewNotes(e.target.value)}
                className="input-text"
                autoFocus={false}
            />
            <div className="w-full border-t"></div>
            <div className="flex justify-end gap-4 flex-wrap">
                <button className="btn-primary-green" onClick={saveDraw}>
                    <IoSave />
                    Save
                </button>
            </div>
        </div>
    ) : null
}

export default NotesModal
