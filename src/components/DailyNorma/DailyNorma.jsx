
import css from "./DailyNorma.module.css";

import { useState } from "react";
import DailyNormaModal from "../DailyNormaModal/DailyNormaModal";

export default function DailyNorma() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = () => {
    setIsOpen(true);
  };
  const handleCloseModal = () => {
    setIsOpen(false);
  };

  return (
    <div className={css.container}>
      <h2 className={css.header}>My daily norma</h2>
      <div className={css.bottomContainer}>
        <p className={css.liters}>1.5 L</p>
        <p onClick={handleOpenModal} className={css.edit}>
          Edit
        </p>
        {isOpen && <DailyNormaModal closeModal={handleCloseModal} />}
      </div>
    </div>
  );
}
