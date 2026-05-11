import { FC, ReactNode, useEffect } from "react";
import styles from "./modal.module.scss";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

export const Modal: FC<Props> = ({ isOpen, onClose, children }) => {
  // ESC close
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

