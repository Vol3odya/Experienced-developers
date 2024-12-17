import Logo from "../Logo/Logo"
import UserAuth from "../UserAuth/UserAuth";
import UserLogo from "../UserLogo/UserLogo";
import { useDispatch, useSelector } from 'react-redux';
import { selectIsLoggedIn } from "../../redux/auth/selectors";

import css from "./Header.module.css"

export default function Header() {

  const loggedIn = useSelector(selectIsLoggedIn);

  return (
    <div className={css.header}>
      <Logo />
      {loggedIn ? <UserLogo/> : <UserAuth/>}
      
    </div>
  )
}

