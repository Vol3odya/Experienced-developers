import css from "./DailyNorma.module.css";

import bottleImageM from "../../images/svg/bow-m.svg";
import bottleImageT from "../../images/svg/bow-t.svg";
import bottleImageD from "../../images/svg/bow-d.svg";

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
    <div className={css.wrapper}>
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
      <picture>
        <source
          srcSet={bottleImageT}
          alt="bottle image"
          media="(min-width: 768px)"
          className={css.image}
        />
        <source
          srcSet={bottleImageD}
          alt="bottle image"
          media="(min-width: 1440px)"
          className={css.image}
        />
        <img src={bottleImageM} alt="bottle image" className={css.image} />
      </picture>
    </div>
  );
}
