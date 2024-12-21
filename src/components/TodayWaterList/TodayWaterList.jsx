import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getWaterFromToday } from "../../redux/todayWaterList/operations.js";
import { useState } from "react";
import { logout } from "../../redux/auth/operations";
import UserLogoutModal from "../UserLogoutModal/UserLogoutModal.jsx";
import TodayListModal from "../TodayListModal/TodayListModal";
import css from "../TodayListModal/TodayListModal.module.css";
// import EditWaterModal from "../TodayListModal/EditWaterModal.jsx";

export default function TodayWaterList() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getWaterFromToday());
  }, [dispatch]);

  // const handleDelete = dispatch(delete)

  const [isOpen, setIsOpen] = useState(false);
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);

  const handleOpenModal = () => {
    setIsOpen(true);
  };
  const handleCloseModal = () => {
    setIsOpen(false);
  };
  const logoutClose = () => {
    setIsLogoutOpen(false);
  };
  const loggout = () => {
    dispatch(logout());
  };
  return (
    <div className={css.wraper}>
      <h2>Today</h2>

      <button type="button">Delete</button>
      <UserLogoutModal
        closeModal={logoutClose}
        onClick={loggout}
        delOrLogout={true}
      />
      <button onClick={handleOpenModal}>Add water</button>
      {isOpen && <TodayListModal closeModal={handleCloseModal} />}
    </div>
  );
}
