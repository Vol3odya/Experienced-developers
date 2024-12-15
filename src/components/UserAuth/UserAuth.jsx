import { NavLink } from "react-router-dom";
import svg from "../../images/UserAuth/Frame.svg";


import css from "./UserAuth.module.css";

export default function UserAuth() {

  return (
    <NavLink className={css.user} to='/' >
      <p className={css.user_text}>Sign in</p>
      <img className={css.user_img} src={svg} alt="User" width="28" height="28"/>
    </NavLink>
  )
}

