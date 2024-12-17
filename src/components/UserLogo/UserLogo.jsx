
import { useState } from "react";
import UserLogoModal from "../UserLogoModal/UserLogoModal";
import css from "./UserLogo.module.css";

export default function UserLogo() {
  const photo = "https://cdn-icons-png.flaticon.com/512/2922/2922506.png";
  const nikname = "Vasya";
  
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = () => {
    if (isOpen) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
    
  };
  const handleCloseModal = () => {
    setIsOpen(false);
  };


  return (
    <div>
      <button type="button" onClick={handleOpenModal} className={css.button}>
        <p className={css.username}>{nikname}</p>
        <img src={photo} alt="User Photo" className={css.userphoto} />
        <svg className={css.svg} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none">
          <path  /*fill-rule="evenodd"*/ d="M8.354 10.853a.5.5 0 0 1-.707 0l-5-5a.5.5 0 0 1 .707-.706L8 9.793l4.647-4.646a.5.5 0 1 1 .707.706l-5 5Z"  clipPath="evenodd" />
        </svg>
      </button>
      {isOpen && <UserLogoModal closeModal={handleCloseModal}/>}
    </div>
  )
}

