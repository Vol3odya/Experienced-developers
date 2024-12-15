import { useState } from "react";

export default function MonthStatsTable() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const getFirstDayOfMonth = (date: Date) => new Date(date.getFullYear.Year());
  const getFirstDayOfMonth = (date: Date) =>
    new Date(date.getFullYear.Year(), date.getMonth);

  const getDaysInMoth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  const generateCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const getFirstDayOfMonth = getFirstDayOfMonth(currentDate).getDay();

    const days = [];
    for (let i = 0; i < getFirstDayOfMonth; i++) {
      days.push(null);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }

    return days;
  };

  const days = generateCalendarDays();

  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  return <div></div>;
}
