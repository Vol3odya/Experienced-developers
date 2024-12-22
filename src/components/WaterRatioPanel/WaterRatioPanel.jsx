import ProgressBar from "@ramonak/react-progress-bar";
import css from "./WaterRatioPanel.module.css";

export default function WaterRatioPanel() {

  return (
    <div>
      <h2 className={css.header}>Today</h2>
      <div className={css.wrapper}>
        <ProgressBar
          completed={80}
          className={css.wrapper}
          barContainerClassName={css.container}
          completedClassName={css.barCompleted}
          labelClassName={css.label}
        />
        <button className={css.button}>
          <svg
            className={css.btnIcon}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M12 9V15M15 12H9M21 12C21 13.1819 20.7672 14.3522 20.3149 15.4442C19.8626 16.5361 19.1997 17.5282 18.364 18.364C17.5282 19.1997 16.5361 19.8626 15.4442 20.3149C14.3522 20.7672 13.1819 21 12 21C10.8181 21 9.64778 20.7672 8.55585 20.3149C7.46392 19.8626 6.47177 19.1997 5.63604 18.364C4.80031 17.5282 4.13738 16.5361 3.68508 15.4442C3.23279 14.3522 3 13.1819 3 12C3 9.61305 3.94821 7.32387 5.63604 5.63604C7.32387 3.94821 9.61305 3 12 3C14.3869 3 16.6761 3.94821 18.364 5.63604C20.0518 7.32387 21 9.61305 21 12Z"
              stroke="white"
              // stroke-width="2"
              // stroke-linecap="round"
              // stroke-linejoin="round"
            />
          </svg>
          <span className={css.btnSpan}>Add Water</span>
        </button>
      </div>
    </div>
  );
}
