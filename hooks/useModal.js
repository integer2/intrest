import ModalLayer from '@/components/modal-layer';
import { createContext, useContext, useEffect, useRef, useState } from 'react';

export const ModalContext = createContext({
  isOpen: false,
  setIsOpen: () => {},
  content: null,
  setContent: () => {},
});

export const useModal = () => useContext(ModalContext);

export const ModalContainer = ({children}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isOpen]);

  return (
    <ModalContext.Provider value={{ isOpen, setIsOpen, content, setContent }}>
      {isOpen && <ModalLayer>{content}</ModalLayer>}
      {children}
    </ModalContext.Provider>
  );
};
