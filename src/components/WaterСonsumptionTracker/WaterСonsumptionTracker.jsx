import css from "./WaterСonsumptionTracker.module.css";
import sprite from "../../images/WelcomePage/sprite.svg";
import { useNavigate } from "react-router-dom";

export default function WaterConsumptionTracker() {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/signup");
  };

  return (
    <div className={css.background}>
      <h1 className={css.title}>Water consumption tracker</h1>
      <h3 className={css.subtitle}>Record daily water intake and track</h3>
      <p className={css.text}>Tracker Benefits</p>
      <ul className={css.trackerList}>
        <li className={css.trackerItem}>
          <svg className={css.icon} aria-hidden="true">
            <use href={`${sprite}#icon-calendar`}></use>
          </svg>
          Habit drive
        </li>
        <li className={css.trackerItem}>
          <svg className={css.icon} aria-hidden="true">
            <use href={`${sprite}#icon-presentation`}></use>
          </svg>
          View statistics
        </li>
        <li className={css.trackerItem}>
          <svg className={css.icon} aria-hidden="true">
            <use href={`${sprite}#icon-wrench`}></use>
          </svg>
          Personal rate setting
        </li>
      </ul>
      <button className={css.button} onClick={handleButtonClick}>
        Try tracker
      </button>
    </div>
  );
}
