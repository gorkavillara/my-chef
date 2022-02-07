import React, { useContext, useEffect, useState } from "react";
import { AdminContext } from "../..";
import { changeNationality as changeBookingNationality } from "../../../../controllers/DBController";
import Input from "../forms/Input";

const Nationality = ({ booking }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [nationality, setNationality] = useState<string>(
    booking ? booking.nationality : ""
  );

  const { bookings, closeModal } = useContext(AdminContext);
  const changeNationality = () => {
    closeModal();
    return changeBookingNationality({
      booking,
      bookings,
      nationality,
    }).catch((e) => console.error(e));
  };

  return booking ? (
    <div className="flex flex-col gap-4 items-stretch justify-between">
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
