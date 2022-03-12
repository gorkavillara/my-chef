import React, { useState } from "react"
import { IoSave } from "react-icons/io5"
import { saveDishNotesString } from "../../../../controllers/DBController"
import { Booking, Dish } from "../../../../models"

const DishNotesModal = ({
  notes = "",
  booking,
  dish,
  closeModal,
}: {
  notes: string
  booking: Booking
  dish: Dish
  closeModal: Function
}) => {
  const [newNotes, setNewNotes] = useState(notes)
  const saveDraw = () => {
    closeModal()
    saveDishNotesString({
      newNotes,
      dish,
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
      {/* <div className="w-full border-t"></div>
      <h1 className="font-semibold text-lg">Handwritten</h1>
      <div className="p-2 border flex justify-center">
        <CanvasDraw
          ref={canvasRef}
          canvasWidth={
            typeof window !== "undefined" ? window.innerWidth * 0.7 : 10
          }
          canvasHeight={
            typeof window !== "undefined" ? window.innerHeight * 0.4 : 10
          }
          brushRadius={2}
          lazyRadius={1}
          brushColor="#222"
          immediateLoading={true}
          saveData={
            booking.handwrittenNotesUrl
              ? JSON.parse(booking.handwrittenNotesUrl)
              : null
          }
          hideInterface
        />
      </div> */}
      <div className="flex justify-end gap-4 flex-wrap">
        {/* <button className="btn-secondary-red" onClick={eraseDraw}>
          <IoTrashBin />
          Erase
        </button>
        <button className="btn-secondary-red" onClick={undoDraw}>
          <IoArrowUndo />
          Undo
        </button> */}
        <button className="btn-primary-green" onClick={saveDraw}>
          <IoSave />
          Save
        </button>
      </div>
    </div>
  ) : null
}

export default DishNotesModal
