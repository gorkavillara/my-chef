import React, { useContext, useState } from "react";
import { IoTrashBinOutline } from "react-icons/io5";
import { AdminContext } from "../..";
import {
  registerNewPairing,
  updatePairing,
  deletePairing as delPairing,
} from "../../../../controllers/DBController";
import { Pairing } from "../../../../models";
import Color from "../Color";
import Input from "../forms/Input";

const colors = [
  "red",
  "green",
  "blue",
  "purple",
  "pink",
  "slate",
  "yellow",
  "orange",
  "teal",
  "indigo",
  "black",
];

const PairingsSettingsModal = ({ editPairing = null }) => {
  const [loading, setLoading] = useState(false);
  const { store, setStore, closeModal } = useContext(AdminContext);
  const emptyPairing = {
    name: "",
    color: "",
  };
  const [newPairing, setNewPairing] = useState<Pairing>(
    editPairing ? editPairing : emptyPairing
  );
  const registerPairing = () => {
    closeModal();
    if (editPairing === null) {
      return registerNewPairing({ pairing: newPairing, store })
        .then((data) => setStore({ ...data.store }))
        .catch((e) => console.error(e));
    } else {
      return updatePairing({ pairing: newPairing, store })
        .then((data) => setStore({ ...data.store }))
        .catch((e) => console.error(e));
    }
  };
  const deletePairing = () => {
    closeModal();
    return delPairing({ pairing: newPairing, store })
      .then((data) => setStore({ ...data.store }))
      .catch((e) => console.error(e));
  };

  const selectColor = (color) => setNewPairing({ ...newPairing, color });

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-lg font-semibold">
        {editPairing ? "Edit Pairing" : "Add New Pairing"}
      </h1>
      <div className="flex flex-col gap-8">
        <Input
          type="text"
          name="name"
          placeholder="Name"
          value={newPairing.name}
          containerClassName="col-span-2"
          disabled={editPairing !== null || loading}
          onChange={(e: any) =>
            setNewPairing({ ...newPairing, name: e.target.value })
          }
        />
        <div className="w-full border-t"></div>
        <h2 className="font-semibold">Choose a color</h2>
        <div className="grid grid-cols-6 sm:grid-cols-8 gap-4 px-8">
          {colors.map((color, i) => (
            <button
              key={i}
              className="cursor-pointer"
              onClick={() => selectColor(color)}
              disabled={loading}
            >
              <Color
                color={color}
                size="xl"
                className={`border-4 transition ${
                  color === newPairing.color && "border-slate-800"
                }`}
              />
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          {editPairing && (
            <button
              className="btn-secondary-red col-span-2"
              onClick={() =>
                confirm("Are you sure you want to delete this pairing?") &&
                deletePairing()
              }
              disabled={newPairing.name === "" || loading}
            >
              <IoTrashBinOutline className="text-xl" />
            </button>
          )}
          <button
            className="btn-primary-green col-span-2 flex-grow"
            onClick={registerPairing}
            disabled={newPairing.name === "" || loading}
          >
            {editPairing ? "Update Pairing" : "Add Pairing"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PairingsSettingsModal;
