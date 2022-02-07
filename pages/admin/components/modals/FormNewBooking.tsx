import { Timestamp } from "firebase/firestore";
import React, { useState, useContext } from "react";
import { IoRocket } from "react-icons/io5";
import { AdminContext } from "../..";
import { addNewBooking } from "../../../../controllers/DBController";
import { Store } from "../../../../models";
import Input from "../forms/Input";
import Loading from "../Loading";

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

const nationalities = ["ESP", "ENG", "ITA", "FRA", "EUSK"];

const FormNewBooking = ({ store }: { store: Store }) => {
  const [booking, setBooking] = useState({
    allergies: [],
    name: "",
    nationality: "",
    notes: "",
    pax: 0,
    table: "",
    time: new Date(),
    menu: {},
    status: "waiting",
  });
  const [menuName, setMenuName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const { closeModal } = useContext(AdminContext);

  const menus = store ? store.menus.map((menu) => menu.name) : [];

  const setMenu = (e) => {
    setMenuName(e.target.value);
    const menu = store.menus.find((menu) => menu.name === e.target.value);
    setBooking({ ...booking, menu });
  };

  const toggleAllergy = (allergy: string) => {
    if (booking.allergies.includes(allergy)) {
      const all = booking.allergies.filter((all) => all !== allergy);
      setBooking({ ...booking, allergies: all });
    } else {
      setBooking({ ...booking, allergies: [...booking.allergies, allergy] });
    }
  };

  const submitNewBooking = () => {
    setLoading(true);
    addNewBooking({
      booking: { ...booking, time: Timestamp.fromDate(booking.time) },
      store,
    })
      .then(() => {
        setLoading(false);
        closeModal();
      })
      .catch((e) => console.log(e));
  };

  const isCompleted = () => {
    if (booking.name === "") return false;
    if (booking.table === "") return false;
    if (booking.pax === 0) return false;
    if (booking.nationality === "") return false;
    // if (booking.time === "") return false;
    return true;
  };

  return store ? (
    <div className="flex flex-col flex-grow justify-between">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          disabled={loading}
          type="text"
          name="name"
          placeholder="Name"
          value={booking.name}
          onChange={(e) => setBooking({ ...booking, name: e.target.value })}
        />
        <Input
          disabled={loading}
          type="number"
          name="pax"
          placeholder="Pax"
          value={booking.pax}
          onChange={(e) => setBooking({ ...booking, pax: e.target.value })}
        />
        <Input
          disabled={loading}
          type="select"
          name="nationality"
          placeholder="Nationality"
          value={booking.nationality}
          options={nationalities}
          onChange={(e) =>
            setBooking({ ...booking, nationality: e.target.value })
          }
        />
        <Input
          disabled={loading}
          type="select"
          name="menu"
          placeholder="Menu"
          value={menuName}
          options={menus}
          onChange={(e) => setMenu(e)}
        />
        <Input
          disabled={loading}
          type="select"
          name="table"
          placeholder="Table"
          value={booking.table}
          options={store.tables.map((table) => table.name)}
          onChange={(e) => setBooking({ ...booking, table: e.target.value })}
        />
        <Input
          disabled={loading}
          type="datetime"
          name="time"
          placeholder="Time"
          value={booking.time}
          onChange={(e) => setBooking({ ...booking, time: e })}
        />
        <Input
          disabled={loading}
          type="chip-select"
          name="allergies"
          placeholder="allergies"
          value={booking.allergies}
          options={allergies}
          containerClassName="col-span-2"
          onChange={(e: string) => toggleAllergy(e)}
        />
      </div>
      <button
        className="m-6 btn-primary-green"
        onClick={submitNewBooking}
        disabled={!isCompleted() || loading}
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <Loading /> Submitting...
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <IoRocket /> Submit
          </span>
        )}
      </button>
    </div>
  ) : null;
};

export default FormNewBooking;
