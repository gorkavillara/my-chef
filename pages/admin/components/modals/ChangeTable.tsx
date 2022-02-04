import axios from "axios";
import React, { useContext, useState } from "react";
import { AdminContext } from "../..";
import { Booking, Table } from "../../../../models";
import Input from "../forms/Input";

const ChangeTable = ({ booking }: { booking: Booking }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [newTable, setNewTable] = useState<Table>(
    booking ? booking.table : { name: "" }
  );

  const { setBookings, bookings, closeModal, store } = useContext(AdminContext);
  const changeTable = () => {
    setLoading(true);
    axios
      .post("/api/bookings", {
        action: "changeTable",
        booking,
        bookings,
        newTable,
      })
      .then((r) => {
        setBookings(r.data.bookings);
        setLoading(false);
        closeModal();
      })
      .catch((e) => console.error(e));
  };

  const tableNames = store ? store.tables.map((tab) => tab.name) : [];

  return booking ? (
    <div className="flex flex-col gap-4 items-stretch justify-between h-96 w-96 min-w-1/2 min-h-2/3">
      <div className="flex flex-col gap-4">
        <span className="text-lg font-semibold">
          Change booking time for {booking.table}
        </span>
        <Input
          type="select"
          name="table"
          value={newTable}
          options={tableNames}
          disabled={loading}
          onChange={(e) => setNewTable(e.target.value)}
        />
      </div>
      <button
        className="btn-primary-green max-w-lg self-center"
        onClick={changeTable}
        disabled={loading}
      >
        Save changes
      </button>
    </div>
  ) : null;
};

export default ChangeTable;
