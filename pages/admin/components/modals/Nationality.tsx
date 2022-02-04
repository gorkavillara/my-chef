import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AdminContext } from "../..";
import Input from "../forms/Input";

const Nationality = ({ booking }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [nationality, setNationality] = useState<string>(
    booking ? booking.nationality : ""
  );

  const { setBookings, bookings, closeModal } = useContext(AdminContext);
  const changeNationality = () => {
    setLoading(true);
    axios
      .post("/api/bookings", {
        action: "changeNationality",
        booking,
        bookings,
        nationality,
      })
      .then((r) => {
        setBookings(r.data.bookings);
        setLoading(false);
        closeModal();
      })
      .catch((e) => console.error(e));
  };

  return booking ? (
    <div className="flex flex-col gap-4 items-stretch justify-between h-96 w-96 min-w-1/2 min-h-2/3">
      <div className="flex flex-col gap-4">
        <span className="text-lg font-semibold">
          Change booking time for {booking.table}
        </span>
        <Input
          type="select"
          name="nationality"
          value={nationality}
          options={["ESP", "ENG", "ITA", "FRA", "EUSK"]}
          disabled={loading}
          onChange={(e) => setNationality(e.target.value)}
        />
      </div>
      <button
        className="btn-primary-green max-w-lg self-center"
        onClick={changeNationality}
        disabled={loading}
      >
        Save changes
      </button>
    </div>
  ) : null;
};

export default Nationality;
