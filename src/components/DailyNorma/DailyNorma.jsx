import css from "./DailyNorma.module.css";

import bottleImageM from "../../images/svg/bow-m.svg";
import bottleImageT from "../../images/svg/bow-t.svg";
import bottleImageD from "../../images/svg/bow-d.svg";

import { useState, useEffect } from "react";
import DailyNormaModal from "../DailyNormaModal/DailyNormaModal";

import { useDispatch, useSelector } from "react-redux";
import {refreshUser} from "../../redux/auth/operations.js"
import { updateUser } from "../../redux/user/operations.js";
import { putWaterRate } from "../../redux/waterRate/operations.js";
import { selectUser } from "../../redux/user/selectors.js";
import { getWaterFromToday } from "../../redux/todayWaterList/operations.js";
import { selectIsLoading } from "../../redux/user/selectors";

export default function DailyNorma() {
  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch();

  const loading = useSelector(selectIsLoading);

  // відкриття за такриття модалки
  const handleOpenModal = () => {
    setIsOpen(true);
  };
  const handleCloseModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    dispatch(refreshUser());
    dispatch(getWaterFromToday());
  }, [dispatch, loading ]);
  
  // оновлення кількості води
  const user = useSelector(selectUser);
  const usersWaterRate = (user.waterRate / 1000).toFixed(1);
  
  const handleUpdateWaterRate = (newRate) => {
    dispatch(updateUser({ waterRate: newRate * 1000 }));
    setIsOpen(false);
  };


  return (
    <div className={css.wrapper}>
      <div className={css.container}>
        <h2 className={css.header}>My daily norma</h2>
        <div className={css.bottomContainer}>
          <p className={css.liters}>
            {usersWaterRate ? `${(user.waterRate / 1000).toFixed(1)} L` : "2.0 L"}
          </p>
          <button type='button' onClick={handleOpenModal} className={css.edit}>
            Edit
          </button>
          {isOpen && (
            <DailyNormaModal
              closeModal={handleCloseModal}
              updateWaterRate={handleUpdateWaterRate}
            />
          )}
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
