import React from 'react';
import * as S from './Modal.styled'; // Importe seus estilos

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <S.Overlay>
      <S.ModalContainer>
        <S.CloseModal onClick={onClose}> X </S.CloseModal>
        {children}
      </S.ModalContainer>
    </S.Overlay>
  );
};

export default Modal;