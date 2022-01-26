import axios from "axios";
import React, { useRef } from "react";
import CanvasDraw from "react-canvas-draw";
import { IoArrowUndo, IoSave, IoTrashBin } from "react-icons/io5";
import { Booking, Store } from "../../../../models";

const NotesModal = ({
  notes = "",
  booking,
  store,
}: {
  notes: string;
  booking: Booking;
  store: Store;
}) => {
  const canvasRef = useRef(null);
  const saveDraw = () => {
    const url = canvasRef.current.getDataURL();
    axios
      .post("/api/bookings", { action: "saveNotesUrl", url, booking, store })
      .then((r) => console.log(r))
      .catch((e) => console.log(e));
  };
  const undoDraw = () => canvasRef.current.undo();
  const eraseDraw = () => canvasRef.current.eraseAll();
  return (
    <div className="flex flex-col gap-4">
      <h1 className="font-semibold text-lg">Notes</h1>
      <span>{notes}</span>
      <div className="w-full border-t"></div>
      <h1 className="font-semibold text-lg">Handwritten</h1>
      <div className="p-0 border flex justify-center">
        <CanvasDraw
          ref={canvasRef}
          canvasWidth={
            typeof window !== "undefined" ? window.innerWidth * 0.8 : 10
          }
          canvasHeight={
            typeof window !== "undefined" ? window.innerHeight * 0.4 : 10
          }
          brushRadius={2}
          lazyRadius={1}
          brushColor="#222"
          hideInterface
        />
      </div>
      <div className="flex justify-end gap-4">
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
  );
};

export default NotesModal;
