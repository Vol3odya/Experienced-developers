import { useState, useEffect } from "react";
import styles from "./MonthStatsTable.module.css";

export default function MonthStatsTable() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(null);
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
      <div className={styles.paginator}>
        <button onClick={handlePrevMonth}>&lt;</button>
        <span>
          {currentDate.toLocaleString("default", { month: "long" })}{" "}
          {currentDate.getFullYear()}
        </span>
        {new Date().getMonth() !== currentDate.getMonth() ? (
          <button onClick={handleNextMonth}>&gt;</button>
        ) : (
          <div className={styles.hiddenButton}></div>
        )}
      </div>

      <div className={styles.daysList}>
        {days.map((day) => {
          const dayStats = daysStats?.[day - 1] || null;
          const isPlanMet = dayStats && dayStats.percentage >= 100;

          return (
            <div
              key={day}
              className={`${styles.day} ${!isPlanMet ? styles.incomplete : ""}`}
              onClick={() => setSelectedDay(day)}
            >
              <div className={styles.dayNumber}>{day}</div>
              {dayStats && (
                <div className={styles.percentage}>{dayStats.percentage}%</div>
              )}
            </div>
          );
        })}
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
            {selectedDay && (
        <DaysGeneralStats
          dayStats={selectedDay.stats}
          selectedDate={selectedDay.date}
          onClose={handleCloseStats}
        />
      )}
    </div>
  );
}
