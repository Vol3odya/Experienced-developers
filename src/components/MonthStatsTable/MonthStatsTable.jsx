import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectWaterShots } from "../../redux/water/selectors";
import { getMonthWater } from "../../redux/monthWaterList/operations";
import styles from "./MonthStatsTable.module.css";

const DEFAULT_DAILY_NORMA = 2000; // Дефолтная норма воды

export default function MonthStatsTable() {
  const dispatch = useDispatch();
  const [currentDate, setCurrentDate] = useState(new Date());

  // Получаем данные из Redux store
  const waterShots = useSelector(selectWaterShots);

  useEffect(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1; // Месяц в API начинается с 1
    dispatch(getMonthWater({ year, month }));
  }, [currentDate, dispatch]);

  // Суммируем воду по дням и вычисляем проценты
  const daysStats = waterShots.reduce((acc, shot) => {
    const shotDate = new Date(shot.date);
    const isSameMonth =
      shotDate.getFullYear() === currentDate.getFullYear() &&
      shotDate.getMonth() === currentDate.getMonth();

    if (isSameMonth) {
      const day = shotDate.getDate();
      if (!acc[day]) {
        acc[day] = {
          waterVolume: 0,
          dailyNorma: shot.dailyNorma || DEFAULT_DAILY_NORMA,
        };
      }
      acc[day].waterVolume += shot.waterVolume; // Суммируем воду за день
    }

    return acc;
  }, {});

  const getDaysInMonth = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const handleNextMonth = () => {
    const now = new Date();
    if (
      currentDate.getFullYear() < now.getFullYear() ||
      (currentDate.getFullYear() === now.getFullYear() &&
        currentDate.getMonth() < now.getMonth())
    ) {
      setCurrentDate(
        new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
      );
    }
  };

  const generateDays = () => {
    const daysInMonth = getDaysInMonth();
    return Array.from({ length: daysInMonth }, (_, i) => i + 1);
  };

  const days = generateDays();

  return (
    <div className={styles.calendarContainer}>
      <div className={styles.monthContainer}>
        <span className={styles.month}>Month</span>
        <div className={styles.paginator}>
          <button onClick={handlePrevMonth} className={styles.arrowButton}>
            &lt;
          </button>
          <span className={styles.currentMonth}>
            {currentDate.toLocaleString("en", { month: "long" })},{" "}
            {currentDate.getFullYear()}
          </span>
          <button
            onClick={handleNextMonth}
            className={styles.arrowButton}
            disabled={
              currentDate.getFullYear() === new Date().getFullYear() &&
              currentDate.getMonth() === new Date().getMonth()
            }
          >
            &gt;
          </button>
        </div>
      </div>

      <div className={styles.calendar}>
        {Array.from({ length: Math.ceil(days.length / 10) }, (_, rowIndex) => (
          <div key={rowIndex} className={styles.row}>
            {days.slice(rowIndex * 10, rowIndex * 10 + 10).map((day) => {
              const dayStats = daysStats[day] || {
                waterVolume: 0,
                dailyNorma: DEFAULT_DAILY_NORMA,
              };
              const percentage = Math.min(
                (dayStats.waterVolume / dayStats.dailyNorma) * 100,
                100
              );
              const isComplete = percentage === 100;

              return (
                <div key={day} className={styles.dayWrapper}>
                  {/* Кружок с числом */}
                  <div
                    className={`${styles.dayCircle} ${
                      !isComplete ? styles.incomplete : ""
                    }`}
                  >
                    <span className={styles.dayNumber}>{day}</span>
                  </div>
                  {/* Процент снизу */}
                  <div className={styles.percentage}>{`${Math.round(
                    percentage
                  )}%`}</div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
