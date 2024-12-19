import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getWaterFromToday } from "../../redux/todayWaterList/operations.js";
import { useState } from "react";
import TodayListModal from "../TodayListModal/TodayListModal";
import css from "../TodayListModal/TodayListModal.module.css";

// import { useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { getWaterFromToday } from "../../redux/todayWaterList/operations.js";

export default function TodayWaterList() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getWaterFromToday());
  }, [dispatch]);

  // const handleDelete = dispatch(delete)

  const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = () => {
    setIsOpen(true);
  };
  const handleCloseModal = () => {
    setIsOpen(false);
  };

  return (
    <div className={css.wraper}>
      <h2>Today</h2>

      <button type="button">Delete</button>
      <button onClick={handleOpenModal}>Add water</button>
      {isOpen && <TodayListModal closeModal={handleCloseModal} />}
    </div>
  );
}
