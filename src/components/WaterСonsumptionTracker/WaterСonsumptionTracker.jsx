import css from "./WaterСonsumptionTracker.module.css";
import { useNavigate } from "react-router-dom";

export default function WaterConsumptionTracker() {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/signup");
  };

  return (
    <div className={(css.component, css.background)}>
      <h1 className={css.header}>Water consumption tracker</h1>
      <h3 className={css.secondHeader}>Record daily water intake and track</h3>
      <p className={css.trackerBenefits}>Tracker Benefits</p>
      <ul className={css.list}>
        <li className={css.trackerItem}>Habit drive</li>
        <li className={css.trackerItem}>View statistics</li>
        <li className={css.trackerItem}>Personal rate setting</li>
      </ul>
      <button className={css.button} onClick={handleButtonClick}>
        Try tracker
      </button>
    </div>
  );
}
