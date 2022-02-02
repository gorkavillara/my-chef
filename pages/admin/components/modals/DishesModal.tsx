import axios from "axios";
import React, { useContext, useState } from "react";
import { IoTrashBinOutline } from "react-icons/io5";
import { AdminContext } from "../..";
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

const DishesModal = ({ editDish = null }) => {
  const [loading, setLoading] = useState(false);
  const { store, setStore, closeModal } = useContext(AdminContext);
  const emptyDish = {
    name: "",
    products: [],
    allergies: [],
    description: "",
    recipe: "",
    side: false,
    wine: false,
    juice: false,
  };
  const [newDish, setNewDish] = useState<Dish>(editDish ? editDish : emptyDish);
  const registerDish = () => {
    const action = editDish === null ? "register" : "update";
    setLoading(true);
    axios
      .post("/api/dishes", { action, dish: newDish, store })
      .then((r) => {
        setLoading(false);
        setStore({ ...r.data.store });
        closeModal();
      })
      .catch((e) => console.error(e));
  };
  const deleteDish = () => {
    const action = "delete";
    setLoading(true);
    axios
      .post("/api/dishes", { action, dish: newDish, store })
      .then((r) => {
        setLoading(false);
        setStore({ ...r.data.store });
        closeModal();
      })
      .catch((e) => console.error(e));
  };

  const toggleAllergy = (allergy: string) => {
    if (newDish.allergies.includes(allergy)) {
      const all = newDish.allergies.filter((all) => all !== allergy);
      setNewDish({ ...newDish, allergies: all });
    } else {
      setNewDish({ ...newDish, allergies: [...newDish.allergies, allergy] });
    }
  };
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-lg font-semibold">
        {editDish ? "Edit dish" : "Add New Dish"}
      </h1>
      <div className="flex flex-col gap-8">
        <Input
          type="text"
          name="name"
          placeholder="Name"
          value={newDish.name}
          containerClassName="col-span-2"
          disabled={editDish !== null || loading}
          onChange={(e: any) =>
            setNewDish({ ...newDish, name: e.target.value })
          }
        />
        <Input
          type="text"
          name="description"
          placeholder="Description"
          value={newDish.description}
          containerClassName="col-span-2"
          disabled={loading}
          onChange={(e: any) =>
            setNewDish({ ...newDish, description: e.target.value })
          }
        />
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
          {editDish && (
            <button
              className="btn-secondary-red"
              onClick={() =>
                confirm("Are you sure you want to delete this dish?") &&
                deleteDish()
              }
              disabled={newDish.name === "" || loading}
            >
              <IoTrashBinOutline className="text-xl" />
            </button>
          )}
          <button
            className="btn-primary-green mx-6 flex-grow"
            onClick={registerDish}
            disabled={newDish.name === "" || loading}
          >
            {editDish ? "Update Dish" : "Add Dish"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DishesModal;
