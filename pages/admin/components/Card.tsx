import React, { useEffect, useState } from "react";
import dishes from "../../../utils/dishes";
import Toggle from "./StatesToggle";
import StatesToggle from "./StatesToggle";
import { IoPeopleOutline } from "react-icons/io5";
import Rodal from "rodal";
import "rodal/lib/rodal.css";
import CanvasDraw from "react-canvas-draw";

interface Dish {
  name: string;
  side: boolean;
  wine: boolean;
  juice: boolean;
  sideStatus: string;
  wineStatus: string;
  juiceStatus: string;
  done: boolean;
}

const Card = () => {
  const [activeDishes, setActiveDishes] = useState<Dish[]>([]);
  const [greeted, setGreeted] = useState<boolean>(false);
  const [activeModal, setActiveModal] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<string>("");

  useEffect(() => {
    const newDishes = dishes.map((dish) => {
      return {
        ...dish,
        sideStatus: dish.side === true ? "pending" : "unnecessary",
        wineStatus: dish.wine === true ? "pending" : "unnecessary",
        juiceStatus: dish.juice === true ? "pending" : "unnecessary",
        done: false,
      };
    });
    setActiveDishes(newDishes);
  }, []);

  const handleCloseModal = () => {
    setActiveModal(false);
  };

  const showModal = (content: string) => {
    setModalContent(content);
    setActiveModal(true);
  };

  const toggleStatus = (category: string, i: number) => {
    const newDishes = activeDishes;
    let prop = category + "Status";
    if (prop === "sideStatus") {
      if (newDishes[i].sideStatus === "pending") {
        newDishes[i].sideStatus = "done";
      } else if (newDishes[i].sideStatus === "done") {
        newDishes[i].sideStatus = "pending";
      }
    }
    if (prop === "wineStatus") {
      if (newDishes[i].wineStatus === "pending") {
        newDishes[i].wineStatus = "done";
      } else if (newDishes[i].wineStatus === "done") {
        newDishes[i].wineStatus = "pending";
      }
    }
    if (prop === "juiceStatus") {
      if (newDishes[i].juiceStatus === "pending") {
        newDishes[i].juiceStatus = "done";
      } else if (newDishes[i].juiceStatus === "done") {
        newDishes[i].juiceStatus = "pending";
      }
    }
    if (category === "general") {
      newDishes[i].done = !newDishes[i].done;
    }
    setActiveDishes([...newDishes]);
  };
  return (
    <>
      <div className="bg-white rounded-xl shadow-xl overflow-hidden">
        <div className="grid grid-cols-2">
          <label className="p-2">
            <span className="font-semibold">PAX</span>
            {/* <input type="text" value="2" className="w-full" /> */}
          </label>
          <label className="p-2">
            <span className="font-semibold">NAME</span>
            {/* <input type="text" value="Mr/Ms Wright" className="w-full" /> */}
          </label>
          <label className="p-2">
            <span className="font-semibold">TABLE</span>
            {/* <input type="text" value="4, 5" className="w-full" /> */}
          </label>
          <div onClick={() => showModal("allergies")} className="p-2">
            <span className="font-semibold">ALLERGIES</span>
            {/* <input type="text" value="Hola" className="w-full" /> */}
          </div>
          <label className="p-2">
            <span className="font-semibold">TIME</span>
            {/* <input type="text" value="14:00" className="w-full" /> */}
          </label>
          <label className="p-2">
            <span className="font-semibold">NATIONALITY</span>
            {/* <input type="text" value="English" className="w-full" /> */}
          </label>
          <label className="p-2">
            <span className="font-semibold">MENU</span>
            {/* <input type="text" value="Classic" className="w-full" /> */}
          </label>
          <label className="p-2">
            <span className="font-semibold">NOTES</span>
            {/* <input
            type="text"
            value="They told me there is something about"
            className="w-full"
          /> */}
          </label>
        </div>
        <div className="border-t">
          {activeDishes.map((dish, i) => (
            <div key={i} className="flex py-1 px-2 gap-2 items-center">
              <StatesToggle
                status={dish.sideStatus}
                onClick={() => toggleStatus("side", i)}
              />
              <span
                className={`flex-grow ${dish.done && "italic line-through"}`}
                onClick={() => toggleStatus("general", i)}
              >
                {dish.name}
              </span>
              <StatesToggle
                status={dish.wineStatus}
                onClick={() => toggleStatus("wine", i)}
              />
              <StatesToggle
                status={dish.juiceStatus}
                onClick={() => toggleStatus("juice", i)}
              />
            </div>
          ))}
        </div>
        <div className="flex border-t">
          <div className="flex-grow p-2">
            <h1 className="text-sm font-semibold">Notes</h1>
            <span>Hola</span>
          </div>
          <div
            onClick={() => setGreeted(!greeted)}
            className={`p-2 transition ${
              greeted ? "text-white bg-green-400" : "border-l text-slate-600"
            }`}
          >
            <h1 className="text-sm font-semibold">Welcome</h1>
            {/* <button>
            <IoPeopleOutline />
          </button> */}
          </div>
        </div>
      </div>
      <Rodal
        visible={activeModal}
        onClose={handleCloseModal}
        animation="flip"
        width={800}
        height={600}
      >
        <CanvasDraw canvasWidth={800} canvasHeight={400} />
      </Rodal>
    </>
  );
};

export default Card;
