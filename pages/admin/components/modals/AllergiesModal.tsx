import axios from "axios";
import React, { useContext, useState } from "react";
import { AdminContext } from "../..";
import { editBookingAllergies } from "../../../../controllers/DBController";
import { Booking } from "../../../../models";
import AllergiesList from "../AllergiesList";
import Input from "../forms/Input";

const all = [
  "Crustacean",
  "Fish",
  "Gluten-free",
  "Nuts",
  "Peanuts",
  "Pescatarian",
  "Pork",
  "Pregnant",
  "Shellfish",
  "Vegetarian",
];

const AllergiesModal = ({
  allergies = [],
  booking,
}: {
  allergies: string[];
  booking: Booking;
}) => {
  const [newAllergies, setNewAllergies] = useState(allergies);
  const { closeModal, bookings, setBookings } = useContext(AdminContext);

  const toggleAllergy = (allergy: string) => {
    let all = [];
    if (newAllergies.includes(allergy)) {
      all = newAllergies.filter((all) => all !== allergy);
    } else {
      all = [...newAllergies, allergy];
    }
    setNewAllergies([...all]);
  };

  const updateAllergies = () =>
    editBookingAllergies({
      newAllergies,
      booking,
      bookings,
    })
      .then((data) => {
        setBookings(data.bookings);
        closeModal();
      })
      .catch((e) => console.error(e));

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4">
        <h1 className="font-semibold text-lg">Allergies List</h1>
        <AllergiesList allergies={allergies} style="modal" />
      </div>
      <div className="flex flex-col gap-4 border-t-2">
        <Input
          type="chip-select"
          name="Update Allergies"
          placeholder="allergies"
          value={newAllergies}
          options={all}
          containerClassName="col-span-2"
          onChange={(e: string) => toggleAllergy(e)}
        />
        <button
          className="btn-primary-green mx-6 col-span-2 my-2"
          onClick={updateAllergies}
        >
          Update Allergies
        </button>
      </div>
    </div>
  );
};

export default AllergiesModal;
