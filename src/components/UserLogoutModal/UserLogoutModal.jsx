
import { useEffect, useState } from "react";




import css from "./UserLogoutModal.module.css";

export default function UserLogoutModal({ closeModal, onClick, delOrLogout=true }) {

  let logo = "";
  let par = "";
  let butt = "";
  if (delOrLogout) {
    logo = "Delete entry";
    par = "Are you sure you want to delete the entry?";
    butt = "Delete";
  } else {
    logo = "Log out";
    par = "Do you really want to leave?";
    butt = "Log out";
  }

   useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeModal]);

  // закриття модального вікна при кліку на бекдроп
  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  };

  return (
    <div className={css.backdrop} onClick={handleBackdropClick}>
      <div className={css.modal}>
        <div className={css.top}>
            <h3 className={css.head}>{logo}</h3>
            <button className={ css.close} onClick={closeModal}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none">
                <path stroke="#407BFF" /*stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"*/ d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
        </div>
        <p className={css.text}>{par}</p>
        <div className={css.grid}>
          <button className={css.button} onClick={closeModal} type='button'>Cancel</button>
          <button className={css.buttonRed} onClick={onClick} type='button'>{ butt }</button>
        </div>
      </div>
    </div>
  )
}

