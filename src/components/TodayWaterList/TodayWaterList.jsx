import { useEffect, useCallback } from "react";
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
import { deleteWater } from "../../redux/water/operations.js";
import { toast } from "react-toastify";
import { selectIsLoading } from "../../redux/water/selectors.js";
import * as userloading from "../../redux/user/selectors";


import { selectAmountToday } from "../../redux/todayWaterList/selectors.js";



export default function TodayWaterList() {
  const dispatch = useDispatch();


  const loading = useSelector(selectIsLoading);
  const loadingtwo = useSelector(userloading.selectIsLoading);



  // const handleDelete = dispatch(delete)

  const [isOpen, setIsOpen] = useState(false);
  const [isEditeOpen, setEditeOpen] = useState("");
  const [isModalOpen, setIsModalOpen] = useState("");
 // const [waterDay, setWaterDay] = useState(useSelector(selectAmountToday));
  useEffect(() => {
    dispatch(getWaterFromToday());
  }, [dispatch, loading, loadingtwo]);

 /*useEffect(() => {
   dispatch(getWaterFromToday());
 }, [dispatch, isOpen, isEditeOpen, isModalOpen]);*/
  
  
  const waterDay = useSelector(selectAmountToday);

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
    toast.success("Water was successfully deleted");
    setEditeOpen("");
  }




  //console.log(new Date("2024-12-24 12:00").toISOString());



  return (
    <div className={css.section}>
      <h2 className={css.header}>Today</h2>
      {/* <div className={css.listWrapper}></div> */}
      <ul className={css.list}>
        {waterDay.items && [...waterDay.items].reverse().map(({ _id, waterVolume, time }) => (
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
                  {/*<img className={css.iconEdit}
                    src={outline}
                    width="16"
                    height="16"
                    alt="outline image"
                  />*/}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.862 4.487L18.549 2.799C18.9007 2.44733 19.3777 2.24976 19.875 2.24976C20.3723 2.24976 20.8493 2.44733 21.201 2.799C21.5527 3.15068 21.7502 3.62766 21.7502 4.125C21.7502 4.62235 21.5527 5.09933 21.201 5.451L10.582 16.07C10.0533 16.5984 9.40137 16.9867 8.685 17.2L6 18L6.8 15.315C7.01328 14.5986 7.40163 13.9467 7.93 13.418L16.862 4.487ZM16.862 4.487L19.5 7.125M18 14V18.75C18 19.3467 17.7629 19.919 17.341 20.341C16.919 20.7629 16.3467 21 15.75 21H5.25C4.65326 21 4.08097 20.7629 3.65901 20.341C3.23705 19.919 3 19.3467 3 18.75V8.25C3 7.65327 3.23705 7.08097 3.65901 6.65901C4.08097 6.23706 4.65326 6 5.25 6H10" stroke="#8BAEFF" /*stroke-linecap="round" stroke-linejoin="round"*/ />
                  </svg>
                </button>
                <button type="button" className={css.iconButton} onClick={editOpen}>
                  {/*<img className={css.icon} src={del} width="16" height="16" alt="delete image" />*/}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.74 9.00003L14.394 18M9.606 18L9.26 9.00003M19.228 5.79003C19.57 5.84203 19.91 5.89703 20.25 5.95603M19.228 5.79003L18.16 19.673C18.1164 20.2383 17.8611 20.7662 17.445 21.1513C17.029 21.5364 16.4829 21.7502 15.916 21.75H8.084C7.5171 21.7502 6.97102 21.5364 6.55498 21.1513C6.13894 20.7662 5.88359 20.2383 5.84 19.673L4.772 5.79003M19.228 5.79003C18.0739 5.61555 16.9138 5.48313 15.75 5.39303M4.772 5.79003C4.43 5.84103 4.09 5.89603 3.75 5.95503M4.772 5.79003C5.92613 5.61555 7.08623 5.48313 8.25 5.39303M15.75 5.39303V4.47703C15.75 3.29703 14.84 2.31303 13.66 2.27603C12.5536 2.24067 11.4464 2.24067 10.34 2.27603C9.16 2.31303 8.25 3.29803 8.25 4.47703V5.39303M15.75 5.39303C13.2537 5.20011 10.7463 5.20011 8.25 5.39303" stroke="#EF5050" /*stroke-linecap="round" stroke-linejoin="round"*/ />
                  </svg>
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
