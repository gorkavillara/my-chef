import React from "react";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import AllergiesModal from "./modals/AllergiesModal";
import DishesModal from "./modals/DishesModal";
import UsersModal from "./modals/UsersModal";
import PairingsSettingsModal from "./modals/PairingsSettingsModal";
import NewBooking from "./modals/NewBooking";
import NotesModal from "./modals/NotesModal";
import TablesModal from "./modals/TablesModal";
import TablesModalMultiple from "./modals/TablesModalMultiple";
import MenusModal from "./modals/MenusModal";
import CloseBooking from "./modals/CloseBooking";
import OpenBooking from "./modals/OpenBooking";
import PairingsModal from "./modals/PairingsModal";
import Time from "./modals/Time";
import Nationality from "./modals/Nationality";
import DishOptions from "./modals/DishOptions";
import ChangeTable from "./modals/ChangeTable";
import DishNotesModal from "./modals/DishNotesModal";

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
      {modalContent === "dishNotes" && (
        <DishNotesModal
          notes={data.dish.notes}
          dish={data.dish}
          booking={data.booking}
          closeModal={onClose}
        />
      )}
      {modalContent === "tables" && <TablesModal />}
      {modalContent === "editTable" && <TablesModal editTable={data} />}
      {modalContent === "tables-multiple" && <TablesModalMultiple />}
      {modalContent === "newDish" && <DishesModal />}
      {modalContent === "editDish" && <DishesModal editDish={data} />}
      {modalContent === "newUser" && <UsersModal />}
      {modalContent === "editUser" && <UsersModal editUser={data} />}
      {modalContent === "newMenu" && <MenusModal />}
      {modalContent === "editMenu" && <MenusModal editMenu={data} />}
      {modalContent === "closeBooking" && <CloseBooking booking={data} />}
      {modalContent === "openBooking" && <OpenBooking booking={data} />}
      {modalContent === "time" && <Time booking={data} />}
      {modalContent === "nationality" && <Nationality booking={data} />}
      {modalContent === "dishOptions" && (
        <DishOptions booking={data.booking} dish={data.dish} />
      )}
      {modalContent === "changeTable" && (
        <ChangeTable booking={data} />
      )}
      {modalContent === "pairings" && <PairingsModal booking={data} />}
      {modalContent === "newPairing" && <PairingsSettingsModal />}
      {modalContent === "editPairing" && (
        <PairingsSettingsModal editPairing={data} />
      )}
    </Modal>
  );
};

export default ModalController;
