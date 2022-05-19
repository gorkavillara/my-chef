import React from "react"
import "react-responsive-modal/styles.css"
import { Modal } from "react-responsive-modal"
import AllergiesModal from "./modals/AllergiesModal"
import DishesModal from "./modals/DishesModal"
import UsersModal from "./modals/UsersModal"
import PairingsSettingsModal from "./modals/PairingsSettingsModal"
import AllergiesSettingsModal from "./modals/AllergiesSettingsModal"
import NewBooking from "./modals/NewBooking"
import NotesModal from "./modals/NotesModal"
import HandwrittenNotesModal from "./modals/HandwrittenNotesModal"
import TablesModal from "./modals/TablesModal"
import TablesModalMultiple from "./modals/TablesModalMultiple"
import MenusModal from "./modals/MenusModal"
import CloseBooking from "./modals/CloseBooking"
import OpenBooking from "./modals/OpenBooking"
import PairingsModal from "./modals/PairingsModal"
import Time from "./modals/Time"
import Nationality from "./modals/Nationality"
import DishOptions from "./modals/DishOptions"
import ChangeTable from "./modals/ChangeTable"
import DishNotesModal from "./modals/DishNotesModal"
import IntegrationsModal from "./modals/IntegrationsModal"
import IntegrationDeleteModal from "./modals/IntegrationDeleteModal"
import ChooseMenu from "./modals/ChooseMenu"

type ModalProps = {
    visible: boolean
    onClose: any
    modalContent: string
    data?: any
}

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
            styles={{
                modal: { minWidth: "50vw" },
            }}
            closeOnOverlayClick={true}
            onClose={onClose}
        >
            {modalContent === "newBooking" && <NewBooking store={data.store} />}
            {modalContent === "menu" && <ChooseMenu booking={data.booking} />}
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
            {modalContent === "newDishNotes" && (
                <DishNotesModal
                    dish={data.dish}
                    booking={data.booking}
                    closeModal={onClose}
                    status="new"
                />
            )}
            {modalContent === "dishNotes" && (
                <DishNotesModal
                    notes={data.note}
                    dish={data.dish}
                    booking={data.booking}
                    closeModal={onClose}
                    status="update"
                />
            )}
            {modalContent === "handwrittenNotesModal" && (
                <HandwrittenNotesModal
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
            {modalContent === "changeTable" && <ChangeTable booking={data} />}
            {modalContent === "pairings" && <PairingsModal booking={data} />}
            {modalContent === "newPairing" && <PairingsSettingsModal />}
            {modalContent === "editPairing" && (
                <PairingsSettingsModal editPairing={data} />
            )}
            {modalContent === "newAllergy" && <AllergiesSettingsModal />}
            {modalContent === "editAllergy" && (
                <AllergiesSettingsModal editAllergy={data} />
            )}
            {modalContent === "integrations" && (
                <IntegrationsModal integrations={data.integrations} providers={data.providers} />
            )}
            {modalContent === "integrationsDelete" && (
                <IntegrationDeleteModal integration={data} />
            )}
        </Modal>
    )
}

export default ModalController
