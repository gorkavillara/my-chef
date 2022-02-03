import axios from "axios";
import React, { useContext, useState } from "react";
import { AdminContext } from "../..";
import { Pairing } from "../../../../models";
import Color from "../Color";

const PairingsModal = ({ booking }) => {
  const [pairings, setPairings] = useState<Pairing[]>(
    booking?.pairings ? booking.pairings : []
  );
  const { store, setBookings, bookings, closeModal } = useContext(AdminContext);
  const openBooking = () => {
    axios
      .post("/api/bookings", {
        action: "setPairings",
        booking,
        bookings,
        pairings,
      })
      .then((r) => {
        setBookings(r.data.bookings);
        closeModal();
      })
      .catch((e) => console.error(e));
  };
  const isSelected = (pairing: Pairing) =>
    pairings.some((pair) => pair.name === pairing.name);

  const toggleSelected = (pairing: Pairing) =>
    isSelected(pairing)
      ? setPairings([...pairings.filter((pair) => pair.name !== pairing.name)])
      : setPairings([...pairings, pairing]);
  return booking ? (
    <div className="w-full flex flex-col gap-4 text-center items-center">
      <h1 className="text-lg font-semibold">
        Choose pairing(s) for this table
      </h1>
      <div className="w-full flex flex-col gap-2">
        {store.pairings.map((pairing: Pairing, i: number) => (
          <button
            key={i}
            className={`flex justify-between items-center rounded-lg py-2 px-4 ${
              isSelected(pairing)
                ? "bg-green-200 border-green-400"
                : "bg-slate-50 border-slate-100"
            } border-2`}
            onClick={() => toggleSelected(pairing)}
          >
            <span>{pairing.name}</span>
            <Color color={pairing.color} />
          </button>
        ))}
      </div>
      <button className="btn-primary-green max-w-lg" onClick={openBooking}>
        Save
      </button>
    </div>
  ) : null;
};

export default PairingsModal;
