// import css from "../TodayListModal/TodayListModal.module.css";
import { Form, Formik } from "formik";
import { useState, useEffect } from "react";

export default function AddWaterModal() {
  const [amount, setAmount] = useState(0);
  const [time, setTime] = useState("");

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
  const handleSubmit = (value, actions) => {
    console.log(value);
    actions.resetForm();
    // буде запит на додавання води post
  };

  return (
    <Formik initialValues={{ amount: 0, time }} onSubmit={handleSubmit}>
      <Form>
        <div>
          <p>Amount of water:</p>
        </div>

        <button type="button" onClick={incrementAmount}>
          +
        </button>
        <div> {amount}ml</div>
        <button type="button" onClick={decrementAmount}>
          -
        </button>
        <div> Recording time:</div>
        <input
          id="time"
          name="time"
          value={time}
          onChange={handleTimeChange}
          placeholder="hh:mm"
        />
        <div>Enter the value of the water used:</div>
        <input
          type="number"
          name="amount"
          max={5000}
          value={amount}
          onChange={handleChangeAmount}
        />
        <div>
          <p>{amount}ml</p>
          <button type="submit">Save</button>{" "}
        </div>
      </Form>
    </Formik>
  );
}