import { NavLink } from "react-router-dom";
import svg from "../../images/Logo/Logo.svg";


import css from "./Logo.module.css";

export default function Logo() {


  const addres = "/welcome";

  return (
    <NavLink className={css.logo} to={addres} >
      <img className={css.logo_img} src={svg} alt="logo" width="40" height="48" />
      <p className={css.logo_text}>Tracker of water</p>
    </NavLink>
  )
}

