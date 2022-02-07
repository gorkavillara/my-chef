import axios from "axios";
import React, { useContext, useState } from "react";
import { AdminContext } from "../..";
import { Booking } from "../../../../models";
import Input from "../forms/Input";

const ChangeTable = ({ booking }: { booking: Booking }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedTablesArray, setSelectedTablesArray] = useState<string[]>(
    booking ? booking.table.split(", ") : []
  );

  const { setBookings, bookings, closeModal, store } = useContext(AdminContext);
  const changeTable = () => {
    setLoading(true);
    const newTable = selectedTablesArray.join(", ");
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

  const toggleTable = (table: string) => {
    let tabs = [];
    if (selectedTablesArray.some((tab) => tab === table)) {
      tabs = selectedTablesArray.filter((tab) => tab !== table);
    } else {
      tabs = [...selectedTablesArray, table];
    }
    tabs = tabs.filter((tab) => tab !== "");
    setSelectedTablesArray([...tabs]);
  };

  const tableNames = store ? store.tables.map((tab) => tab.name) : [];

  return booking ? (
    <div className="flex flex-col gap-4 items-stretch justify-between">
      <div className="flex flex-col gap-4">
        <span className="text-lg font-semibold">
          Change booking time for {booking.table}
        </span>
        <Input
          type="chip-select"
          color="blue"
          name="table"
          value={selectedTablesArray}
          options={tableNames}
          disabled={loading}
          onChange={toggleTable}
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
