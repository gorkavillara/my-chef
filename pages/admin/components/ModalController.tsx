import React from "react";
import CanvasDraw from "react-canvas-draw";
import Rodal from "rodal";
import "rodal/lib/rodal.css";
import AllergiesModal from "./modals/AllergiesModal";
import NewBooking from "./modals/NewBooking";

type ModalProps = {
  visible: boolean;
  onClose: Function;
  modalContent: string;
  data?: any;
};

const ModalController = ({
  visible,
  onClose,
  modalContent,
  data,
}: ModalProps) => {
  const modalConfig = {
    animation: "slideUp",
    width: typeof window !== "undefined" ? window.innerWidth * 0.8 : 800,
    height: typeof window !== "undefined" ? window.innerHeight * 0.8 : 800,
  };
  if (modalContent !== "") {
    modalConfig.width =
      typeof window !== "undefined" ? window.innerWidth * 0.8 : 10;
    modalConfig.height =
      typeof window !== "undefined" ? window.innerHeight * 0.8 : 10;
  }
  if (modalContent === "allergies") {
    modalConfig.width =
      typeof window !== "undefined" ? window.innerWidth * 0.4 : 10;
    modalConfig.height =
      typeof window !== "undefined" ? window.innerHeight * 0.4 : 10;
  }
  if (modalContent === "newBooking") {
    modalConfig.width = window.innerWidth * 0.8;
    modalConfig.height = window.innerHeight * 0.8;
    modalConfig.animation = "flip";
  }
  return (
    <Rodal
      visible={visible}
      onClose={onClose}
      animation={modalConfig.animation}
      width={modalConfig.width}
      height={modalConfig.height}
      className="flex justify-center items-center"
    >
      {modalContent === "newBooking" && <NewBooking store={data.store} />}
      {modalContent === "allergies" && <AllergiesModal allergies={data} />}
      {modalContent === "notes" && (
        <CanvasDraw
          canvasWidth={
            typeof window !== "undefined" ? window.innerWidth * 0.7 : 10
          }
          canvasHeight={
            typeof window !== "undefined" ? window.innerHeight * 0.7 : 10
          }
          brushRadius={2}
          lazyRadius={1}
          brushColor="#222"
        />
      )}
    </Rodal>
  );
};

export default ModalController;
