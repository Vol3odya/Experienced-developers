import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { selectAmountToday } from "../../redux/todayWaterList/selectors";
import TodayListModal from "../TodayListModal/TodayListModal";
import { getWaterFromToday } from "../../redux/todayWaterList/operations.js";
import { selectIsLoading } from "../../redux/water/selectors.js";
import css from "./WaterRatioPanel.module.css";

export default function WaterRatioPanel() {

  const dispatch = useDispatch();
  const loading = useSelector(selectIsLoading);

  useEffect(() => {
    dispatch(getWaterFromToday());
  }, [dispatch]);

  const water = useSelector(selectAmountToday);
  /*const norm = useSelector(selectUser);

  let statys = 0;
  if (norm) {
    statys=weter/norm.waterRate
  }*/
  //console.log(css.status);
  //css.style.status.width = `${statys}px`;
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = () => {
    setIsOpen(true);
  };
  const handleCloseModal = () => {
    setIsOpen(false);
  };

  
  /*useEffect(() => {
    dispatch(getWaterFromToday());
  }, [isOpen]);*/



  return (
      <div className={css.wrapper}>
        <div className={css.ritio}>
          <h2 className={css.header}>Today</h2>
          <div className={css.labelstatus} style={{ marginLeft: `calc(((${water.waterVolumeInPercent}/100) * (100% - 24px)) + 10.5px)` }}>
            <p className={css.texttwo}>{water.waterVolumeInPercent}%</p>
          </div> 
          <div className={css.ritiocon} >
            <div className={css.status} style={{width:`${water.waterVolumeInPercent}%`}}>
              <div className={css.but}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="7" cy="7" r="6.5" fill="white" stroke="#407BFF" />
                </svg>
              </div>
            </div>
          </div>
          <div className={css.label}>
            <div className={css.labeltwo}>
              <p className={css.text}>0%</p>
            </div>
            <div className={css.labeltry}>
              <p className={css.texttry}>100%</p>
            </div>
          </div>
        </div>
        <button className={css.button} onClick={handleOpenModal}>
          <div className={css.flex}>
            <svg
              className={css.btnIcon}
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M12 9V15M15 12H9M21 12C21 13.1819 20.7672 14.3522 20.3149 15.4442C19.8626 16.5361 19.1997 17.5282 18.364 18.364C17.5282 19.1997 16.5361 19.8626 15.4442 20.3149C14.3522 20.7672 13.1819 21 12 21C10.8181 21 9.64778 20.7672 8.55585 20.3149C7.46392 19.8626 6.47177 19.1997 5.63604 18.364C4.80031 17.5282 4.13738 16.5361 3.68508 15.4442C3.23279 14.3522 3 13.1819 3 12C3 9.61305 3.94821 7.32387 5.63604 5.63604C7.32387 3.94821 9.61305 3 12 3C14.3869 3 16.6761 3.94821 18.364 5.63604C20.0518 7.32387 21 9.61305 21 12Z"
                stroke="white"
                // stroke-width="2"
                // stroke-linecap="round"
                // stroke-linejoin="round"
              />
            </svg>
            <span className={css.btnSpan}>Add Water</span>
          </div>
      </button>
      {isOpen && <TodayListModal closeModal={handleCloseModal} />}
      </div>
  );
}
