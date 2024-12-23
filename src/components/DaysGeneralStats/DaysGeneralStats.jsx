import css from "./DaysGeneralStats.module.css";

export default function DaysGeneralStats({dayStats, selectedDate, onClose}) {
if (!dayStats || !selectedDate) {
    return null; //захист від відсутніх данних
  }

  const formattedDate = `${selectedDate.getDate()}, ${selectedDate.toLocaleString("en-US", 
    { month: "long" }
  )}`;

  // const dailyNorm = dayStats.dailyNorm || 0; 
  // const intake = dayStats.intake || 0; 
  const dailyNorm = dayStats.dailyNorma || 0;
  const intake = dayStats.waterVolume || 0;
  const percentage = dailyNorm ? Math.round((intake / dailyNorm) * 100) : 0; 
  const portions = dayStats.portions || 0; 

  return (
    <div className={css.modal}>
      <div className={css.content}>
        <button className={css.closeButton} onClick={onClose}>
          ×
        </button>
        {/* <h3 className={css.title}>Day Statistics</h3> */}
        <div className={css.sectionDate}>
          <span className={css.dayMoth}>{formattedDate}</span>
        </div>
        <div className={css.section}>
          <p className={css.sectionTitle}>Daily Norm:</p> <span className={css.sectionNumber}>{dailyNorm} ml</span>
        </div>
        <div className={css.section}>
          <p className={css.sectionTitle}>Fulfillment of the daily norm:</p> <span className={css.sectionNumber}>{percentage}%</span>
        </div>
        <div className={css.section}>
          <p className={css.sectionTitle}>How many servings of water:</p> <span className={css.sectionNumber}>{portions}</span>
        </div>
      </div>
    </div>
  );
}
