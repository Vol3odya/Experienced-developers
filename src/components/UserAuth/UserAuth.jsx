import { NavLink } from "react-router-dom";
import svg from "../../images/UserAuth/Frame.svg";


import css from "./UserAuth.module.css";

export default function UserAuth() {

  return (
    <NavLink className={css.link} to='/' >
      <p>Sign in</p>
      <img src={svg} alt="User" width="28" height="28"/>
    </NavLink>
  )
}

