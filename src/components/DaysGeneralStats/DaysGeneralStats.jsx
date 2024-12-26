import { useEffect } from "react";
import css from "./DaysGeneralStats.module.css";

export default function DaysGeneralStats({
  dayStats,
  selectedDate,
  onClose,
  modalClass,
}) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  if (!selectedDate) {
    return null; //захист від відсутніх данних
  }

  const formattedDate = `${selectedDate.getDate()}, ${selectedDate.toLocaleString(
    "en-US",
    { month: "long" }
  )}`;

  const dailyNorm = dayStats.dailyNorma || 0;
  const intake = dayStats.waterVolume || 0;
  const percentage = dailyNorm ? Math.round((intake / dailyNorm) * 100) : 0;
  const portions = dayStats.portions || Math.floor(dayStats.waterVolume / 250);
  const hasData = dayStats && Object.keys(dayStats).length > 0;

  return (
    <div
      className={`${css.modal} ${modalClass} ${
        !hasData ? css.noDataModal : ""
      }`}
    >
      <div className={css.content}>
        {hasData ? (
          // Если есть данные, отображаем детали
          <>
            <div className={css.sectionDate}>
              <span className={css.dayMoth}>{formattedDate}</span>
            </div>
            <div className={css.section}>
              <p className={css.sectionTitle}>Daily Norm:</p>{" "}
              <span className={css.sectionNumber}>{dailyNorm} ml</span>
            </div>
            <div className={css.section}>
              <p className={css.sectionTitle}>Fulfillment of the daily norm:</p>{" "}
              <span className={css.sectionNumber}>{percentage}%</span>
            </div>
            <div className={css.section}>
              <p className={css.sectionTitle}>How many servings of water:</p>{" "}
              <span className={css.sectionNumber}>{portions}</span>
            </div>
          </>
        ) : (
          // Если данных нет, отображаем текст "No records for this day"
          <p className={css.sectionTitle}>No records for this day.</p>
        )}
      </div>
    </div>
  );
}

export const csscss = css.modal;
