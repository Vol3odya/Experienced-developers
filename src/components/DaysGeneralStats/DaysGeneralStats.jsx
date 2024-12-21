import css from "./DaysGeneralStats.module.css";

export default function DaysGeneralStats(dayStats, selectedDate, onClose) {
if (!dayStats) {
    return null; 
  }

  const formattedDate = `${selectedDate.getDate()} ${selectedDate.toLocaleString(
    "default",
    { month: "long" }
  )}`;

  const dailyNorm = dayStats.dailyNorm || 0; 
  const intake = dayStats.intake || 0; 
  const percentage = dailyNorm ? Math.round((intake / dailyNorm) * 100) : 0; 
  const portions = dayStats.portions || 0; 

  return (
    <div className={css.modal}>
      <div className={css.content}>
        <button className={css.closeButton} onClick={onClose}>
          ×
        </button>
        <h3 className={css.title}>Day Statistics</h3>
        <div className={css.section}>
          <strong>Date:</strong> <span>{formattedDate}</span>
        </div>
        <div className={css.section}>
          <strong>Daily Norm:</strong> <span>{dailyNorm} l</span>
        </div>
        <div className={css.section}>
          <strong>Norm Completion:</strong> <span>{percentage}%</span>
        </div>
        <div className={css.section}>
          <strong>Portions:</strong> <span>{portions}</span>
        </div>
      </div>
    </div>
  );
}
