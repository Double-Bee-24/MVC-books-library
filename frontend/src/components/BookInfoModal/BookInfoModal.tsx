import { useEffect } from "react";
import "./BookInfoModal.css";

interface BookInfoModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
}

export default function BookInfoModal({
  isModalOpen,
  setIsModalOpen,
}: BookInfoModalProps): JSX.Element | null {
  // Blocks scolling
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isModalOpen]);

  if (!isModalOpen) {
    return null;
  }

  return (
    <div
      className="dark-bg"
      onClick={() => {
        setIsModalOpen(false);
      }}
    >
      <div className="book-info-modal" onClick={(e) => e.stopPropagation()}>
        <h2 className="book-modal-header">Очманіти!</h2>
        <p className="book-modal-description">
          Книга вільна, і ти можеш прийти за нею. Наша адреса: <br />
          м. Кропивницький, провулок Василівський 10, 5 поверх. Краще попередньо
          зателефонувати й повідомити нас, щоб не потрапити в незручну ситуацію.
          Тел. 099 196 24 69.
        </p>
        <button
          className="close-button"
          onClick={() => {
            setIsModalOpen(false);
          }}
        >
          Ок
        </button>
      </div>
    </div>
  );
}
