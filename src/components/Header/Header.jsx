import Logo from "../Logo/Logo"
import UserAuth from "../UserAuth/UserAuth";

import css from "./Header.module.css"

export default function Header() {

  const loggedIn = false;

  return (
    <div className={css.header}>
      <Logo />
      <UserAuth/>
      
    </div>
  )
}

