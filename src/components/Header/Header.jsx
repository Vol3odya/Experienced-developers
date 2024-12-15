import Logo from "../Logo/Logo"
import UserAuth from "../UserAuth/UserAuth";
import UserLogo from "../UserLogo/UserLogo";

import css from "./Header.module.css"

export default function Header() {

  const loggedIn = true;

  return (
    <div className={css.header}>
      <Logo />
      {loggedIn ? <UserLogo/> : <UserAuth/>}
      
    </div>
  )
}

