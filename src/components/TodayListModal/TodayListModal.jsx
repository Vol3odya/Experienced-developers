import css from "../TodayListModal/TodayListModal.module.css";
import { IoMdClose } from "react-icons/io";
<<<<<<< Updated upstream
import { addWater } from "../../redux/water/operations.js";
=======

>>>>>>> Stashed changes
import { Field, Form, Formik } from "formik";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { HiMinus } from "react-icons/hi2";
import { HiPlus } from "react-icons/hi";

export default function TodayListModal({ closeModal }) {
  const [amount, setAmount] = useState(0);
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
    setAmount((prev) => Math.max(prev - 50, 0));
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

  const now = new Date();
  const day = String(now.getDate()).padStart(2, "0");
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const year = String(now.getFullYear());

  const forDate = `${day}.${month}.${year}`;

  const handleSubmit = () => {
    const newNote = {
      time: time,
      amount: amount,
      date: forDate,
    };
<<<<<<< Updated upstream
    dispatch(addWater(newNote));
    console.log(newNote);
  };

  return (
    <div className={css.backdrop}>
      <Formik initialValues={{ amount: 0, time }} onSubmit={handleSubmit}>
        <Form>
          <div className={css.container}>
            <div className={css.iconclose}>
              <h2 className={css.title}>App water</h2>
              <button
                type="button"
                className={css.closeIcon}
                onClick={closeModal}
              >
                <IoMdClose size={13.5} />
              </button>
            </div>
            <p className={css.text}>Choose a value:</p>
            <p>Amount of water:</p>
            <div className={css.amountbox}>
              <button
                type="button"
                className={css.plusIcon}
                onClick={incrementAmount}
              >
                <HiPlus size={13.5} />
              </button>

              <div className={css.result}> {amount}ml</div>
              <button
                type="button"
                className={css.minusIcon}
                onClick={decrementAmount}
              >
                <HiMinus size={24} />
=======
    // dispatch(addWater(newNote));
    console.log(newNote);

    // буде запит на додавання води post
  };

  // const handleSubmit = (values) => {
  //   const newNote = {
  //     date: values.date,
  //     waterVolume: values.waterVolume,
  //   };
  //   dispatch(addWater(newNote));
  //   onClose();
  // };

  // onSubmit={(values) => {
  //   dispatch(addWater(values));
  //   const notify = () => toast("Successfully added!");
  //   notify();
  //   onClose();
  // }}
  // validationSchema={schema}

  // const handleBackdropClick = (event) => {
  //   if (event.target === event.currentTarget) {
  //     closeModal();
  //   }
  // };

  return (
    <div className={css.backdrop}>
      <Formik initialValues={{ amount: 0, time }} onSubmit={handleSubmit}>
        <Form>
          <div className={css.container}>
            <div className={css.iconclose}>
              <h2 className={css.title}>App water</h2>
              <button
                type="button"
                className={css.closeIcon}
                onClick={closeModal}
              >
                <IoMdClose />
              </button>
            </div>
            <p className={css.text}>Choose a value:</p>
            <p>Amount of water:</p>
            <div className={css.amountbox}>
              <button type="button" onClick={incrementAmount}>
                +
              </button>

              <div> {amount}ml</div>
              <button type="button" onClick={decrementAmount}>
                -
>>>>>>> Stashed changes
              </button>
            </div>

            <label className={css.recording}> Recording time:</label>
            <Field
              className={css.input}
              id="time"
              name="time"
              value={time}
              onChange={handleTimeChange}
              placeholder="hh:mm"
            />
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
            />
            <div className={css.flexbox}>
<<<<<<< Updated upstream
              <p className={css.result}>{amount || 0}ml</p>
=======
              <p>{amount || 0}ml</p>
>>>>>>> Stashed changes
              <button className={css.saveButton} type="submit">
                Save
              </button>{" "}
            </div>
          </div>
        </Form>
      </Formik>
    </div>
  );
}
