import React from "react";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import AllergiesModal from "./modals/AllergiesModal";
import DishesModal from "./modals/DishesModal";
import NewBooking from "./modals/NewBooking";
import NotesModal from "./modals/NotesModal";
import TablesModal from "./modals/TablesModal";
import TablesModalMultiple from "./modals/TablesModalMultiple";
import MenusModal from "./modals/MenusModal";
import { AnimatePresence, motion } from "framer-motion";
import BookingsDisplay from "./BookingsDisplay";
import CloseBooking from "./modals/CloseBooking";
import OpenBooking from "./modals/OpenBooking";
import { HiOutlinePlus } from "react-icons/hi";
import PairingsModal from "./modals/PairingsModal";

type ModalProps = {
  visible: boolean;
  onClose: any;
  modalContent: string;
  data?: any;
};

const ModalController = ({
  visible,
  onClose,
  modalContent,
  data,
}: ModalProps) => {
  return (
    <Modal
      showCloseIcon={false}
      open={visible}
      center
      closeOnOverlayClick={true}
      onClose={onClose}
    >
      {modalContent === "newBooking" && <NewBooking store={data.store} />}
      {modalContent === "allergies" && (
        <AllergiesModal allergies={data.allergies} booking={data} />
      )}
      {modalContent === "notes" && (
        <NotesModal
          notes={data.booking.notes}
          booking={data.booking}
          closeModal={onClose}
        />
      )}
      {modalContent === "tables" && <TablesModal />}
      {modalContent === "tables-multiple" && <TablesModalMultiple />}
      {modalContent === "newDish" && <DishesModal />}
      {modalContent === "editDish" && <DishesModal editDish={data} />}
      {modalContent === "newMenu" && <MenusModal />}
      {modalContent === "editMenu" && <MenusModal editMenu={data} />}
      {modalContent === "closeBooking" && <CloseBooking booking={data} />}
      {modalContent === "openBooking" && <OpenBooking booking={data} />}
      {modalContent === "pairings" && <PairingsModal booking={data} />}
    </Modal>
  );
};

export default ModalController;
