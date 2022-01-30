import React from "react";
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

type ModalProps = {
  visible: boolean;
  onClose: any;
  modalContent: string;
  data?: any;
};

const dropIn = {
  hidden: {
    y: "-100vh",
    opacity: 0,
  },
  visible: {
    y: "5vh",
    opacity: 1,
    transition: {
      duration: 0.1,
      type: "spring",
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    y: "100vh",
    opacity: 0,
  },
};

const ModalController = ({
  visible,
  onClose,
  modalContent,
  data,
}: ModalProps) => {
  return (
    <AnimatePresence initial={false} exitBeforeEnter>
      {visible ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed top-0 left-0 h-full w-full bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-start z-50 overflow-scroll"
          onClick={onClose}
        >
          <motion.div
            variants={dropIn}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="bg-white flex justify-center items-center p-6 rounded-lg w-5/6 sm:w-3/4"
            onClick={(e) => e.stopPropagation()}
          >
            {modalContent === "newBooking" && <NewBooking store={data.store} />}
            {modalContent === "allergies" && (
              <AllergiesModal allergies={data} />
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
            <button onClick={onClose}><HiOutlinePlus className="rotate-45 text-slate-700 text-2xl font-bold absolute top-5 right-5" /></button>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default ModalController;
