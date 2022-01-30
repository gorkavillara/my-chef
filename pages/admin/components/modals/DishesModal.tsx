import axios from "axios";
import React, { useContext, useState } from "react";
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
    axios
      .post("/api/dishes", { action, dish: newDish, store })
      .then((r) => {
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
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        <Input
          type="text"
          name="name"
          placeholder="Name"
          value={newDish.name}
          containerClassName="col-span-2"
          disabled={editDish !== null}
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
          onChange={(e: any) =>
            setNewDish({ ...newDish, description: e.target.value })
          }
        />
        <Input
          disabled={false}
          type="chip-select"
          name="allergies"
          placeholder="allergies"
          value={newDish.allergies}
          options={allergies}
          containerClassName="col-span-2"
          onChange={(e: string) => toggleAllergy(e)}
        />
        <div className="flex flex-wrap items-center gap-4">
          <Input
            type="toggle"
            name="side"
            placeholder="Side"
            value={newDish.side}
            onChange={() => setNewDish({ ...newDish, side: !newDish.side })}
          />
          <Input
            type="toggle"
            name="wine"
            placeholder="Wine"
            value={newDish.wine}
            onChange={() => setNewDish({ ...newDish, wine: !newDish.wine })}
          />
          <Input
            type="toggle"
            name="juice"
            placeholder="Juice"
            value={newDish.juice}
            onChange={() => setNewDish({ ...newDish, juice: !newDish.juice })}
          />
        </div>
        <button
          className="btn-primary-green mx-6 col-span-2"
          onClick={registerDish}
          disabled={newDish.name === ""}
        >
          {editDish ? "Update Dish" : "Add Dish"}
        </button>
      </div>
    </div>
  );
};

export default DishesModal;
