import { useState, useEffect } from "react";
import styles from "./MonthStatsTable.module.css";

export default function MonthStatsTable() {
  const [currentDate, setCurrentDate] = useState(new Date());
  //const [selectedDay, setSelectedDay] = useState(null);
  const [daysStats, setDaysStats] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/days-stats");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setDaysStats(data);
      } catch (error) {
        console.error("Error fetching days stats:", error);
      }
    };

    fetchData();
  }, []);

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
              const dayStats = daysStats?.[day - 1] || {};
              const isComplete = dayStats.percentage === 100;

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
                  <div className={styles.percentage}>
                    {dayStats.percentage || "0"}%
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* {selectedDay && (
        <div className={styles.generalStats}>
          <h3>Day {selectedDay} Stats</h3>
          <p>{`Water intake: ${
            daysStats[selectedDay - 1]?.intake || "No data"
          } ml`}</p>
          <button onClick={() => setSelectedDay(null)}>Close</button>
        </div>
      )} */}
      {/*selectedDay && (
        <DaysGeneralStats
          dayStats={selectedDay.stats}
          selectedDate={selectedDay.date}
          onClose={handleCloseStats}
        />
      )*/}
    </div>
  );
}
