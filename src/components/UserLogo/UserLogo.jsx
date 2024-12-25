
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserLogoModal from "../UserLogoModal/UserLogoModal";
import SettingModal from "../SettingModal/SettingModal";
import UserLogoutModal from "../UserLogoutModal/UserLogoutModal";
import { logout } from "../../redux/auth/operations";
import { selectUser } from '../../redux/auth/selectors';
import css from "./UserLogo.module.css";
import { selectIsLoading } from "../../redux/user/selectors";
import { refreshUser } from "../../redux/auth/operations";
import { fetchUser} from "../../redux/user/operations";
import {csscss} from "../UserLogoModal/UserLogoModal"

export default function UserLogo() {


  const dispatch = useDispatch();

  const user = useSelector(selectUser);
  const loading = useSelector(selectIsLoading);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch, loading]);

  let nikname = "User";
  let photo = "https://cdn-icons-png.flaticon.com/512/2922/2922506.png";
  if (user.name){
    nikname = user.name;
  }
  if (user.photo) {
    photo = user.photo;
  }
  ;
  
  
  
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest(`.${csscss}`)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);






  const handleOpenModal = () => {
      setIsOpen(true);  
  };


  const handleCloseModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        handleCloseModal();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  
  const [isSettingOpen, setIsSettingOpen] = useState(false);

  const settingOpen = () => {
    setIsSettingOpen(true);
  }

  const settingClose = () => {
    setIsSettingOpen(false);
  }
  
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);

  const logoutOpen = () => {
    setIsLogoutOpen(true);
  }

  const logoutClose = () => {
    setIsLogoutOpen(false);
  }


    
  const loggout = () => {
    dispatch(logout());
  }




  return (
    <div>
      <button type="button" onClick={handleOpenModal} className={css.button}>
        <p className={css.username}>{nikname}</p>
        <img src={photo} alt="User Photo" className={css.userphoto} />
        <svg className={css.svg} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none">
          <path  /*fill-rule="evenodd"*/ d="M8.354 10.853a.5.5 0 0 1-.707 0l-5-5a.5.5 0 0 1 .707-.706L8 9.793l4.647-4.646a.5.5 0 1 1 .707.706l-5 5Z"  clipPath="evenodd" />
        </svg>
      </button>
      {isOpen && <UserLogoModal closeModal={handleCloseModal} settingOpen={ settingOpen } logoutOpen={ logoutOpen } className={css.modal} />}
      {isSettingOpen && <SettingModal onClose={settingClose} />}
      {isLogoutOpen && <UserLogoutModal closeModal={logoutClose} onClick={ loggout } delOrLogout = {false}/>}
    </div>
  )
}

