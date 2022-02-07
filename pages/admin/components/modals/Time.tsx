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

  const getTimeInputValue = () => {
    if (!booking || !time) return "";
    const h = time.getHours();
    const m = time.getMinutes();
    return `${h}:${m}`;
  };

  const handleTimeChange = (t) => {
    const [h, m] = t.target.value.split(":");
    let newTime = time;
    newTime.setHours(h);
    newTime.setMinutes(m);
    setTime(new Date(newTime));
  };

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

  return booking && time ? (
    <div className="flex flex-col gap-4 items-center justify-between">
      <div className="flex flex-col gap-4 items-center">
        <span className="text-lg font-semibold">
          Change booking time for {booking.table}
        </span>
        <input
          type="time"
          name="time"
          className="outline-none border rounded-lg text-center text-xl focus:ring ring-green-200 px-2 py-1"
          value={getTimeInputValue()}
          disabled={loading}
          onChange={handleTimeChange}
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
