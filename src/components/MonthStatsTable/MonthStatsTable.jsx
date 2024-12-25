import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectIsLoading } from "../../redux/water/selectors.js";

import DaysGeneralStats from "../DaysGeneralStats/DaysGeneralStats"; //імпорт модального вікна з інформацією за день
import { getMonthWater } from "../../redux/monthWaterList/operations";
import { selectItems } from "../../redux/monthWaterList/selectors";
import styles from "./MonthStatsTable.module.css";
import { csscss } from "../DaysGeneralStats/DaysGeneralStats";
import * as userloading from "../../redux/user/selectors";

const DEFAULT_DAILY_NORMA = 2000; // Дефолтная норма воды

export default function MonthStatsTable() {
  const dispatch = useDispatch();

  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDayStats, setSelectedDayStats] = useState(null); //HPO
  const [selectedDate, setSelectedDate] = useState(null); //HPO

  // Получаем данные из Redux store
  //  const monthData = useSelector((state) => state.month.items.data || []);
  const monthData = useSelector(selectItems) || [];
  
  const loading = useSelector(selectIsLoading);
  const loadingtwo = useSelector(userloading.selectIsLoading);


  useEffect(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1; // Месяц в API начинается с 1
    dispatch(getMonthWater({ year, month }));
  }, [currentDate, dispatch, loading, loadingtwo]);

  // Суммируем воду по дням и вычисляем проценты
  const daysStats = monthData.reduce((acc, day) => {
    const dayNumber = new Date(day.date).getDate();
    acc[dayNumber] = {
      waterVolume: parseFloat(day.waterVolume) * 1000 || 0,
      dailyNorma: parseFloat(day.waterRate) * 1000 || 0,
      portions: day.count || 0,
    };
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

  // const openModal = (day) => {
  //   // modal is open DaysGeneralStats
  //   setSelectedDayStats(daysStats[day]);
  //   setSelectedDate(
  //     new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
  //   );
  // };

  // =========================================NEW======================================================================
  const openModal = (day, event) => {
    const rect = event.target.getBoundingClientRect();
    const modalPosition = {
      top: rect.top + window.scrollY,
      left: rect.left + window.scrollX,
    };

    setSelectedDayStats({ ...daysStats[day], position: modalPosition });
    setSelectedDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
    );
  };
  // ==================================================================================================================

  const closeModal = () => {
    // modal is close DaysGeneralStats
    setSelectedDayStats(null);
    setSelectedDate(null);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        selectedDayStats &&
        selectedDate &&
        !event.target.closest(`.${csscss}`)
      ) {
        closeModal();
      }
    };

    if (selectedDayStats && selectedDate) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [selectedDayStats, selectedDate]);

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
                  <button
                    className={`${styles.dayCircle} ${
                      !isComplete ? styles.incomplete : ""
                    }`}
                    onClick={(event) => openModal(day, event)} // Передаємо event
                  >
                    <span className={styles.dayNumber}>{day}</span>
                  </button>
                  <div className={styles.percentage}>{`${Math.round(
                    percentage
                  )}%`}</div>
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {selectedDayStats && selectedDate && (
        <DaysGeneralStats
          dayStats={selectedDayStats}
          selectedDate={selectedDate}
          onClose={closeModal}
        />
      )}
    </div>
  );
}
