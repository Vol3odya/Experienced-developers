import css from "../TodayListModal/TodayListModal.module.css";
import { toast } from "react-toastify";
import { IoMdClose } from "react-icons/io";
import { addWater } from "../../redux/water/operations.js";
import { Field, Form, Formik } from "formik";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { HiMinus } from "react-icons/hi2";
import { HiPlus } from "react-icons/hi";
import { getWaterFromToday } from "../../redux/todayWaterList/operations.js";

export default function TodayListModal({ closeModal }) {
  const [amount, setAmount] = useState(50);
  const [time, setTime] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    const now = new Date();
    const hours = String(now.getHours());
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const currentTime = `${hours}:${minutes}`;
    setTime(currentTime);
  }, []);

  const decrementAmount = () => {
    setAmount((prev) => Math.max(prev - 50, 50));
  };

  const incrementAmount = () => {
    const newAmount = amount + 50;
    const maxAmount = 5000;
    setAmount(newAmount <= maxAmount ? newAmount : maxAmount);
  };

  function handleTimeChange(e) {
    const value = e.target.value;
    const timeFormat = /^[0-9:]*$/;

    if (timeFormat.test(value)) {
      setTime(value);
    }
    timeFormat.test(time);
  }

  function handleChangeAmount(e) {
    const value = e.target.value;
    const amountFormat = /^[0-9]*$/;
    const inputValue =
      !amountFormat.test(value) || value === "" ? "" : Number(value);
    setAmount(inputValue);
  }

  const handleBlur = () => {
    const roundedAmount = Math.round(amount / 50) * 50;
    const clampedAmount = Math.min(roundedAmount, 5000);
    setAmount(clampedAmount);
  };

  const generateTimeOptions = () => {
    const options = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 5) {
        const hourFormatted = hour < 10 ? `0${hour}` : hour;
        const minuteFormatted = minute < 10 ? `0${minute}` : minute;
        options.push(`${hourFormatted}:${minuteFormatted}`);
      }
    }
    return options;
  };

  useEffect(() => {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const roundedMinute = Math.floor(currentMinute / 5) * 5; // округлюємо до найближчих 5 хвилин
    const timeString = `${currentHour < 10 ? `0${currentHour}` : currentHour}:${
      roundedMinute < 10 ? `0${roundedMinute}` : roundedMinute
    }`;
    setTime(timeString);
  }, []);

  const timeOptions = generateTimeOptions();

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeModal]);

  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  };

  const now = new Date();
  const forDate = now.toISOString().slice(0, 10) + ` ${time}`; //.split("T")[0];

  const handleSubmit = () => {
    if (amount <= 0) {
      toast.error("Water amount cannot be below 0");
      return;
    }
    const newNote = {
      //time: time,
      waterVolume: amount,
      date: forDate,
    };
    dispatch(addWater(newNote));
    toast.success("Water was successfully added");
    
    closeModal();
  };

  return (
    <div className={css.backdrop} onClick={handleBackdropClick}>
      <Formik initialValues={{ amount: 50, time }} onSubmit={handleSubmit}>
        <Form>
          <div className={css.container}>
            <div className={css.iconclose}>
              <h2 className={css.title}>App water</h2>
              <button
                type="button"
                className={css.closeIcon}
                onClick={closeModal}
              >
                <IoMdClose size={24} />
              </button>
            </div>
            <p className={css.text}>Choose a value:</p>
            <p className={css.texttwo}>Amount of water:</p>
            <div className={css.amountbox}>
              <button
                type="button"
                className={css.minusIcon}
                onClick={decrementAmount}
              >
                <HiMinus size={24} />
              </button>

              <div className={css.result}> {amount}ml</div>

              <button
                type="button"
                className={css.plusIcon}
                onClick={incrementAmount}
              >
                <HiPlus size={13.5} />
              </button>
            </div>

            <label className={css.recording}> Recording time:</label>
            <select
              className={css.input}
              id="time"
              name="time"
              value={time}
              placeholder="hh:mm"
              onChange={handleTimeChange}
            >
              {timeOptions.map((timeOption) => (
                <option key={timeOption} value={timeOption}>
                  {timeOption}
                </option>
              ))}
            </select>
            <label className={css.enter}>
              Enter the value of the water used:
            </label>
            <Field
              className={css.input}
              type="number"
              name="amount"
              max={5000}
              value={amount}
              onChange={handleChangeAmount}
              onBlur={handleBlur}
            />
            <div className={css.flexbox}>
              <p className={css.resulttwo}>{amount || 0}ml</p>
              <button className={css.saveButton} type="submit">
                Save
              </button>
            </div>
          </div>
        </Form>
      </Formik>
    </div>
  );
}
