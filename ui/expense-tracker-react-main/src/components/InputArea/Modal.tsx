import React from 'react';
import { Item } from '../../types/Item';

type Props = {
  onClose: () => void;
  children: React.ReactNode;
  item?: Item;  // Item opcional
};


const Modal: React.FC<Props> = ({ onClose, children, item }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        {item && <p>ID do Item: {item.id}</p>}  // Mostrar o ID aqui
        {children}
        <button onClick={onClose}>Fechar</button>
      </div>
    </div>
  );
}


export default Modal;
