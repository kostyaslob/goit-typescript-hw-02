import css from "./ImageModal.module.css";
import Modal from 'react-modal';
import { Image } from "../images-api";

Modal.setAppElement('#root');

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  image: Image;
}

export default function ImageModal({ isOpen, onClose, image }: ImageModalProps) {
  const handleClose = () => {
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleClose} 
      contentLabel="Image Modal"
      className={css.modal}
      overlayClassName={css.overlay}
      shouldCloseOnOverlayClick={true} 
      shouldCloseOnEsc={true}
    >
      <img src={image.urls.regular} alt={image.alt_description ?? "Image"} />
    </Modal>
  );
}