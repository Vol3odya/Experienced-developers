import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWaterFromToday } from "../../redux/todayWaterList/operations.js";
import { useState } from "react";
import UserLogoutModal from "../UserLogoutModal/UserLogoutModal.jsx";
import TodayListModal from "../TodayListModal/TodayListModal";

import css from "../TodayWaterList/TodayWaterList.module.css";
import EditWaterModal from "../TodayListModal/EditWaterModal.jsx";
import { selectWaterShots } from "../../redux/water/selectors.js";
import cup from "../../images/svg/cup.svg";
import outline from "../../images/svg/outline.svg";
import del from "../../images/svg/del.svg";
import { HiOutlinePlusSmall } from "react-icons/hi2";
import { deleteWater } from "../../redux/water/operations.js"


import { selectAmountToday } from "../../redux/todayWaterList/selectors.js";



export default function TodayWaterList() {
  const dispatch = useDispatch();

 


  const waterDay = useSelector(selectAmountToday);

  


  // const handleDelete = dispatch(delete)

  const [isOpen, setIsOpen] = useState(false);
  const [isEditeOpen, setEditeOpen] = useState("");
  const [isModalOpen, setIsModalOpen] = useState("");


  useEffect(() => {
    const refresh = async () => {
      try {
        await dispatch(getWaterFromToday()).unwrap();
      } catch (error) {
        //console.error("Failed to refresh user or fetch user data:", error);
      
      }
      refresh();
    };
    
  }, [ dispatch, isOpen, isEditeOpen, isModalOpen]);


  const handleOpenModalEdit = (event) => {
    setIsModalOpen(event.target.parentNode.parentNode.parentNode.id);
  };
  const handleCloseModalEdit = () => {
    setIsModalOpen("");
  };

  const handleOpenModal = () => {
    setIsOpen(true);
  };
  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const editClose = () => {
    setEditeOpen("");
  };
  const editOpen = (event) => {
    setEditeOpen(event.target.parentNode.parentNode.parentNode.id);
  };

  const delet = () => {
    dispatch(deleteWater({ _id: isEditeOpen }));
    setEditeOpen("");
  }








  return (
    <div className={css.section}>
      <h2 className={css.header}>Today</h2>
      {/* <div className={css.listWrapper}></div> */}
      <ul className={css.list}>
        {[...waterDay.items].reverse().map(({ _id, waterVolume, time }) => (
          <li key={_id} className={css.item}>
            <div id={_id} className={css.listli}>
             <div className={css.itemInfo}>
                <img src={cup} size={22.69} alt="cup image" />
                <div className={css.colorMl}> {waterVolume}ml</div>
                <span className={css.waterTime}>
                  {time}
                </span>
             </div>
              <div className={css.itemIcons}>
                <button type="button" className={css.iconButton} onClick={handleOpenModalEdit}>
                  <img className={css.iconEdit}
                    src={outline}
                    width="16"
                    height="16"
                    alt="outline image"
                  />
                </button>
                <button type="button" className={css.iconButton} onClick={editOpen}>
                  <img className={css.icon} src={del} width="16" height="16" alt="delete image" />
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      {isModalOpen && <EditWaterModal closeModal={handleCloseModalEdit} _id={isModalOpen} />}
      {/* <button type="button" onClick={editOpen}>
        Delete
      </button> */}
      {isEditeOpen && <UserLogoutModal closeModal={editClose} onClick={delet}/>}

      <button className={css.btnAddWater} onClick={handleOpenModal}><HiOutlinePlusSmall size="16" />Add water</button>
      {isOpen && <TodayListModal closeModal={handleCloseModal} />}
    </div>
  );
}
