import React, { useState, useCallback, useEffect, useImperativeHandle } from 'react';
import ReactDOM from 'react-dom';

interface ModalProps {
  children: React.ReactNode;
  open?: boolean;
}

const CONTAINER_STYLES: React.CSSProperties = {
  position: "fixed",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  top: "0",
  right: "0",
  bottom: "0",
  left: "0",
  zIndex: "100",
};

const OVERLAY_STYLES: React.CSSProperties = {
  backgroundColor: "rgb(24 24 24 / 70%)",
  position: "fixed",
  top: "0",
  right: "0",
  bottom: "0",
  left: "0",
  backdropFilter: "blur(5px)",
};

const Modal = React.forwardRef<{ open: () => void; close: () => void }, ModalProps>(
  ({ children, open }: ModalProps, ref) => {
    const [isOpen, toggleOpen] = useState<boolean>(!!open);

    const handleClose = useCallback(() => {
      !open && toggleOpen(false);
    }, [open]);

    useImperativeHandle(
      ref,
      () => ({
        open: () => {
          toggleOpen(true);
        },
        close: handleClose,
      }),
      [handleClose]
    );

    const handleEscape = useCallback(
      (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          handleClose();
        }
      },
      [handleClose]
    );

    useEffect(() => {
      if (isOpen) {
        document.addEventListener('keydown', handleEscape, { passive: true });
      }
      return () => {
        document.removeEventListener('keydown', handleEscape, false);
      };
    }, [handleEscape, isOpen]);

    if (!isOpen) return null;

    return ReactDOM.createPortal(
      <div style={CONTAINER_STYLES}>
        {React.cloneElement(children as React.ReactElement, { handleClose, HELLO: 'WORLD' })}
        <div onClick={handleClose} style={OVERLAY_STYLES} />
      </div>,
      document.body
    );
  }
);

export default Modal;
