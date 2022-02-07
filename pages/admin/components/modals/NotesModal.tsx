import React, { useContext, useRef, useState } from "react";
import CanvasDraw from "react-canvas-draw";
import { IoArrowUndo, IoSave, IoTrashBin } from "react-icons/io5";
import { AdminContext } from "../..";
import { saveNotes } from "../../../../controllers/DBController";
import { Booking } from "../../../../models";

const NotesModal = ({
  notes = "",
  booking,
  closeModal,
}: {
  notes: string;
  booking: Booking;
  closeModal: Function;
}) => {
  const [newNotes, setNewNotes] = useState(notes);
  const { bookings, setBookings } = useContext(AdminContext);
  const canvasRef = useRef(null);
  const saveDraw = () => {
    const url = canvasRef.current.getSaveData();
    closeModal();
    saveNotes({
      newNotes,
      handwrittenNotesUrl: JSON.stringify(url),
      booking,
    }).catch((e) => console.log(e));
  };
  const undoDraw = () => canvasRef.current.undo();
  const eraseDraw = () => canvasRef.current.eraseAll();
  console.log(booking.handwrittenNotesUrl);
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
  ) : null;
};

export default NotesModal;
