import React from "react";
import { Store } from "../../../../models";
import FormNewBooking from "./FormNewBooking";

const NewBooking = ({ store }: { store: Store }) => {
  return (
    store && (
      <div className="flex flex-col h-full">
        <h1 className="font-semibold text-lg mb-6">Create New Booking</h1>
        <FormNewBooking store={store} />
      </div>
    )
  );
};

export default NewBooking;
