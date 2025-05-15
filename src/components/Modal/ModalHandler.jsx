import  renderModalContent  from "../Modal/ModalContent";
import Modal from "../Modal/Modal"; 

const ModalHandler = ({ isOpen, closeModal, modalType,data, selectedData }) => {
  return (
    isOpen && (
      <Modal open={isOpen} onClose={closeModal}>
        {renderModalContent(modalType, closeModal,data, selectedData)}
      </Modal>
    )
  );
};

export default ModalHandler;