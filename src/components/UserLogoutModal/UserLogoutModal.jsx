import logout from "../../redux/auth/operations";


import css from "./UserLogoutModal.module.css";

export default function UserLogoutModal({ closeModal, delOrLogout }) {
  let logo = "";
  let par = "";
  let butt = "";
  if (delOrLogout) {
    logo = "Delete entry";
    par = "Are you sure you want to delete the entry?";
    butt = "Delete";
  } else {
    logo = "Log out";
    par = "Are you sure you want to delete the entry?";
    butt = "Log out";
  }

  return (
    <div>
      <div className={css.top}>
          <h3 className={css.head}>{logo}</h3>
          <button onClick={closeModal}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none">
              <path stroke="#407BFF" /*stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"*/ d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
      </div>
      <p>{par}</p>
      <button onClick={closeModal}>Cancel</button>
      <button onClick={() => dispatch(logout())}>{ butt }</button>
    </div>
  )
}

