import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AdminContext } from "../..";
import Input from "../forms/Input";

const Time = ({ booking }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [time, setTime] = useState<Date>();

  useEffect(() => {
    if (!booking) return;
    const t = new Date(booking.time.seconds * 1000);
    setTime(t);
  }, []);

  const { setBookings, bookings, closeModal } = useContext(AdminContext);
  const changeTime = () => {
    setLoading(true);
    axios
      .post("/api/bookings", {
        action: "changeTime",
        booking,
        bookings,
        time,
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
        <span className="text-lg font-semibold">Change booking time for {booking.table}</span>
        <Input
          type="datetime"
          name="time"
          value={time}
          disabled={loading}
          onChange={(t) => {
            const newTime = new Date(t);
            setTime(newTime);
          }}
        />
      </div>
      <button
        className="btn-primary-green max-w-lg self-center"
        onClick={changeTime}
        disabled={loading}
      >
        Save changes
      </button>
    </div>
  ) : null;
};

export default Time;
