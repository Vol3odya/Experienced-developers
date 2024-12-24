import { useEffect, useState } from "react";







import css from "./UserLogoModal.module.css";

export default function UserLogoModal({ closeModal, settingOpen, logoutOpen }) {


   const handleOpenModalSetting = () => {
     settingOpen();
   };



  const handleOpenModalLogout = () => {
    logoutOpen();
  };

  return (
    <div className={css.modal} >
      <button type="button" className={css.button} onClick={handleOpenModalSetting} >
        <svg className={css.svg} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none">
          <path stroke="#407BFF" /*stroke-linecap="round" stroke-linejoin="round"*/
            d="M6.396 2.627A.75.75 0 0 1 7.136 2h1.729a.75.75 0 0 1 .74.627l.142.854c.042.249.208.457.43.58.049.026.098.055.146.084.216.131.48.172.717.083l.811-.304a.75.75 0 0 1 .914.327l.864 1.498a.75.75 0 0 1-.174.954l-.668.551a.828.828 0 0 0-.288.661 4.38 4.38 0 0 1 0 .17c-.004.252.092.5.287.66l.67.552a.75.75 0 0 1 .173.954l-.865 1.498a.75.75 0 0 1-.913.327l-.811-.304a.83.83 0 0 0-.717.083c-.049.03-.098.057-.147.085a.831.831 0 0 0-.43.58l-.141.853a.75.75 0 0 1-.74.627h-1.73a.75.75 0 0 1-.74-.627l-.142-.854a.83.83 0 0 0-.429-.58 4.353 4.353 0 0 1-.147-.084.83.83 0 0 0-.717-.083l-.811.304a.75.75 0 0 1-.913-.327l-.865-1.498a.75.75 0 0 1 .174-.954l.669-.551a.83.83 0 0 0 .287-.661 4.632 4.632 0 0 1 0-.17.827.827 0 0 0-.287-.66l-.67-.552a.75.75 0 0 1-.173-.954l.865-1.498a.75.75 0 0 1 .913-.327l.811.304a.83.83 0 0 0 .717-.083c.048-.029.098-.058.147-.085a.828.828 0 0 0 .43-.58l.142-.853Z" />
          <path stroke="#407BFF" /*stroke-linecap="round" stroke-linejoin="round"*/ d="M10 8a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z" />
        </svg>
        <p className={css.text}>Setting</p>
      </button>
      <button type="button" className={css.button} onClick={handleOpenModalLogout} >
        <svg className={css.svg} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none">
          <path stroke="#407BFF" /*stroke-linecap="round" stroke-linejoin="round"*/ d="M10.5 6V3.5A1.5 1.5 0 0 0 9 2H5a1.5 1.5 0 0 0-1.5 1.5v9A1.5 1.5 0 0 0 5 14h4a1.5 1.5 0 0 0 1.5-1.5V10m2 0 2-2m0 0-2-2m2 2H6" />
        </svg>
        <p className={css.text}>Log out</p>
      </button>
    </div>
  )
}

export const csscss = css.modal;

