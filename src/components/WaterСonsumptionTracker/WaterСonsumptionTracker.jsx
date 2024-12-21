import css from "./WaterСonsumptionTracker.module.css";
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
          <svg
            className={css.icon}
            fill="none"
            viewBox="0 0 40 40"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.25 5v3.75M28.75 5v3.75M5 31.25V12.5a3.75 3.75 0 0 1 3.75-3.75h22.5A3.75 3.75 0 0 1 35 12.5v18.75m-30 0A3.75 3.75 0 0 0 8.75 35h22.5A3.75 3.75 0 0 0 35 31.25m-30 0v-12.5A3.75 3.75 0 0 1 8.75 15h22.5A3.75 3.75 0 0 1 35 18.75v12.5m-15-10h.013v.013H20v-.013ZM20 25h.013v.013H20V25Zm0 3.75h.013v.013H20v-.013ZM16.25 25h.013v.013h-.013V25Zm0 3.75h.013v.013h-.013v-.013ZM12.5 25h.013v.013H12.5V25Zm0 3.75h.013v.013H12.5v-.013Zm11.25-7.5h.013v.013h-.013v-.013Zm0 3.75h.013v.013h-.013V25Zm0 3.75h.013v.013h-.013v-.013Zm3.75-7.5h.013v.013H27.5v-.013Zm0 3.75h.013v.013H27.5V25Z"
              stroke="#407BFF"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Habit drive
        </li>
        <li className={css.trackerItem}>
          <svg
            className={css.icon}
            fill="none"
            viewBox="0 0 40 40"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.25 5v18.75A3.75 3.75 0 0 0 10 27.5h3.75M6.25 5h-2.5m2.5 0h27.5m-20 22.5h12.5m-12.5 0-1.667 5M33.75 5h2.5m-2.5 0v18.75A3.75 3.75 0 0 1 30 27.5h-3.75m0 0 1.667 5m-15.834 0h15.834m-15.834 0L11.25 35m16.667-2.5.833 2.5M15 18.75v2.5M20 15v6.25m5-10v10"
              stroke="#407BFF"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          View statistics
        </li>
        <li className={css.trackerItem}>
          <svg
            className={css.icon}
            fill="none"
            viewBox="0 0 40 40"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19.033 25.283 28.75 35A4.42 4.42 0 0 0 35 28.75l-9.795-9.795m-6.172 6.328 4.16-5.05c.529-.64 1.234-1.043 2.014-1.276.916-.274 1.938-.314 2.905-.234a7.5 7.5 0 0 0 7.476-10.56l-5.46 5.462a5.006 5.006 0 0 1-3.75-3.75l5.46-5.46a7.5 7.5 0 0 0-10.56 7.477c.152 1.793-.118 3.773-1.506 4.916l-.17.142m-.569 8.333-7.758 9.422a4.246 4.246 0 1 1-5.977-5.977l11.395-9.383L9.848 12.5H7.5L3.75 6.25l2.5-2.5L12.5 7.5v2.348l7.1 7.1-2.908 2.395m13.933 11.282L26.25 26.25M8.112 31.875h.013v.013h-.013v-.013Z"
              stroke="#407BFF"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
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
