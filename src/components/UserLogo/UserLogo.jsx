
import { useState, useEffect } from "react";
import UserLogoModal from "../UserLogoModal/UserLogoModal";
import SettingModal from "../SettingModal/SettingModal";
import css from "./UserLogo.module.css";

export default function UserLogo() {
  const photo = "https://cdn-icons-png.flaticon.com/512/2922/2922506.png";
  const nikname = "Vasya";
  
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenTwo, setIsOpenTwo] = useState(false);
  
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const handleClick = () => {
      console.log('Клікнули в будь-якому місці!');
      handleOpenModal();
      // Тут можна виконати будь-яку дію при кліку
      setIsActive(false); // Вимикаємо обробник після першого кліку
    };

    if (isActive) {
      document.addEventListener('click', handleClick);
    }

    return () => {
      if (isActive) {
        document.removeEventListener('click', handleClick);
      }
    };
  }, [isActive]);

  const handleOpenModal = () => {
    if (isOpen) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
      setIsActive(true);
    }
    
  };

  const handleOpenModalTwo = () => {
    if (isOpen) {
      setIsOpenTwo(false);
    } else {
      setIsOpenTwo(true);
    }
    
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleCloseModalTwo = () => {
    setIsOpenTwo(false);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        handleOpenModal();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleOpenModal]);

  
  
  /*useGlobalClickListener((handleOpenModal , isOpen) => {
    setIsActive(false);
    console.log('Клікнули в будь-якому місці!');
  });*/
  
  


  // закриття модального вікна при кліку на бекдроп
  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
      handleOpenModal();
    }
  };

  //document.addEventListener("click", handleBackdropClick);



  return (
    <div>
      <button type="button" onClick={() => setIsActive(true)} className={css.button}>
        <p className={css.username}>{nikname}</p>
        <img src={photo} alt="User Photo" className={css.userphoto} />
        <svg className={css.svg} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none">
          <path  /*fill-rule="evenodd"*/ d="M8.354 10.853a.5.5 0 0 1-.707 0l-5-5a.5.5 0 0 1 .707-.706L8 9.793l4.647-4.646a.5.5 0 1 1 .707.706l-5 5Z"  clipPath="evenodd" />
        </svg>
      </button>
      {isOpen && <UserLogoModal closeModal={handleCloseModal} />}
      {/*isOpenTwo && <SettingModal /*onClose={} userData={user} */}
    </div>
  )
}

