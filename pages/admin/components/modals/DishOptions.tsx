import React, { useContext, useState } from "react";
import { IoTrashBinOutline } from "react-icons/io5";
import { AdminContext } from "../..";
import {
  deleteBookingDish,
  updateBookingDish,
} from "../../../../controllers/DBController";
import { Dish } from "../../../../models";
import Input from "../forms/Input";

const allergies = [
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

const DishOptions = ({ booking, dish }) => {
  const [loading, setLoading] = useState(false);
  const { bookings, closeModal, setBookings } = useContext(AdminContext);
  const [newDish, setNewDish] = useState<Dish>(dish);

  const toggleAllergy = (allergy: string) => {
    if (newDish.allergies) {
      if (newDish.allergies.includes(allergy)) {
        const all = newDish.allergies.filter((all) => all !== allergy);
        setNewDish({ ...newDish, allergies: all });
      } else {
        setNewDish({ ...newDish, allergies: [...newDish.allergies, allergy] });
      }
    } else {
      setNewDish({ ...newDish, allergies: [allergy] });
    }
  };
  const delBookingDish = () => {
    closeModal();
    deleteBookingDish({
      booking,
      bookings,
      newDish,
    })
      .then((data) => setBookings(data.bookings))
      .catch((e) => console.error(e));
  };

  const updBookingDish = () => {
    closeModal();
    updateBookingDish({
      booking,
      bookings,
      newDish,
    })
      .then((data) => setBookings(data.bookings))
      .catch((e) => console.error(e));
  };

  return newDish ? (
    <div className="flex flex-col gap-4">
      <h1 className="text-lg font-semibold">Edit Dish {dish.name}</h1>
      <div className="flex flex-col gap-8">
        <div className="flex items-center gap-4 px-6">
          <Input
            disabled={loading}
            type="chip-select"
            name="allergies"
            placeholder="allergies"
            value={newDish.allergies}
            options={allergies}
            onChange={(e: string) => toggleAllergy(e)}
          />
          <div className="flex flex-col items-center gap-4 pl-8 border-l">
            <Input
              type="toggle"
              name="side"
              placeholder="Side"
              value={newDish.side}
              disabled={loading}
              onChange={() => setNewDish({ ...newDish, side: !newDish.side })}
            />
            <Input
              type="toggle"
              name="wine"
              placeholder="Wine"
              value={newDish.wine}
              disabled={loading}
              onChange={() => setNewDish({ ...newDish, wine: !newDish.wine })}
            />
          </div>
        </div>
        <div className="flex justify-center gap-2 mx-6">
          <button
            className="btn-secondary-red"
            onClick={() =>
              confirm("Are you sure you want to delete this dish?") &&
              delBookingDish()
            }
            disabled={newDish.name === "" || loading}
          >
            <IoTrashBinOutline className="text-xl" />
          </button>
          <button
            className="btn-primary-green mx-6 flex-grow"
            onClick={updBookingDish}
            disabled={newDish.name === "" || loading}
          >
            Update Dish
          </button>
        </div>
      </div>
    </div>
  ) : null;
};

export default DishOptions;
