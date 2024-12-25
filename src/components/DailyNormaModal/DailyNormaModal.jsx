import s from "./DailyNormaModal.module.css";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { IoMdClose } from "react-icons/io";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectIsLoading } from "../../redux/user/selectors.js";
import {selectUser} from "../../redux/auth/selectors.js"
import Loader from "../Loader/Loader.jsx";
import {refreshUser} from "../../redux/auth/operations.js"

export default function DailyNormaModal({ closeModal, updateWaterRate }) {
  const isLoading = useSelector(selectIsLoading);
  const [weight, setWeight] = useState("");
  const [activity, setActivity] = useState("");
  const [waterRate, setWaterRate] = useState("");
  const dispatch = useDispatch();
  //  юзер
  const user = useSelector(selectUser);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch, isLoading ]);

  // початкові значення форми
  const initialValues = {
    sex: user?.gender || "female",
    weightValue: weight || "0",
    timeValue: activity || "0",
    dailyNorma: waterRate || "2.0",
  };

  const [formValues, setFormValues] = useState(initialValues);

  useEffect(() => {
    const savedData = JSON.parse(sessionStorage.getItem("dailyNorma"));
    if (savedData) {
      setWeight(savedData.weight);
      setActivity(savedData.activity);
      setWaterRate(savedData.waterRate);

      setFormValues({
        sex: user.gender,
        weightValue: savedData.weight || "0",
        timeValue: savedData.activity || "0",
        dailyNorma: savedData.waterRate || "2.0",
      });
    }
  }, [user.gender]); //???

  // валідація форми
  const validationSchema = Yup.object({
    weightValue: Yup.number()
      .required("Weight is required")
      .positive("Weight must be positive")
      .integer("Weight must be an integer"),
    timeValue: Yup.number()
      .required("Time is required")
      .min(0, "Time must be zero or greater"),
    dailyNorma: Yup.number()
      .required("Your dayily norma is required")
      .positive("Dayily norma must be positive"),
  });

  // розрахунок денної норми води
  const calculateWaterVolume = ({ sex, weightValue, timeValue }) => {
    const weight = parseFloat(weightValue) || 0;
    const time = parseFloat(timeValue) || 0;

    if (sex === "female") {
      return weight * 0.03 + time * 0.4;
    } else {
      return weight * 0.04 + time * 0.6;
    }
  };

  // збереження денної норми
  const handleSubmit = async (values) => {
    try {
      const { dailyNorma, weightValue, timeValue } = values;
      updateWaterRate(dailyNorma);
      sessionStorage.setItem(
        "dailyNorma",
        JSON.stringify({
          weight: weightValue,
          activity: timeValue,
          waterRate: dailyNorma,
        })
      );

      closeModal();
    } catch (error) {
      console.error("Failed to update water rate:", error);
    }
  };

  // закриття модального вікна при натисканні на esc
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

  // закриття модального вікна при кліку на бекдроп
  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  };

  return (
    <div className={s.backdrop} onClick={handleBackdropClick}>
      <div className={s.modal}>
        <div className={s.top}>
          <h3 className={s.head}>My daily norma</h3>
          <button onClick={closeModal}>
            <IoMdClose className={s.closeIcon} />
          </button>
        </div>
        <div className={s.formulas}>
          <p>
            For girl: <span className={s.formula}>V=(M*0,03) + (T*0,4)</span>
          </p>
          <p>
            For man: <span className={s.formula}>V=(M*0,04) + (T*0,6)</span>
          </p>
        </div>
        <p className={s.formulaDescription}>
          <span className={s.asterisk}>*</span> V is the volume of the water
          norm in liters per day, M is your body weight, T is the time of active
          sports, or another type of activity commensurate in terms of loads (in
          the absence of these, you must set 0)
        </p>
        <h4 className={s.calc}>Calculate your rate:</h4>

        <Formik
          enableReinitialize
          initialValues={formValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, handleChange, setFieldValue }) => {
            const waterVolume = calculateWaterVolume(values);

            const handleFieldChange = (field, value) => {
              setFieldValue(field, value);
            };

            const handleFocus = (field) => {
              if (values[field] === "0") {
                handleFieldChange(field, "");
              }
            };

            const handleBlur = (field) => {
              if (values[field] === "") {
                handleFieldChange(field, "0");
              }
            };

            return (
              <Form>
                <div className={s.radio}>
                  <label>
                    <Field
                      className={s.radioBtn}
                      type="radio"
                      name="sex"
                      value="female"
                      onChange={handleChange}
                    />
                    For woman
                  </label>
                  <label>
                    <Field
                      className={s.radioBtn}
                      type="radio"
                      name="sex"
                      value="male"
                      onChange={handleChange}
                    />
                    For man
                  </label>
                </div>

                <label className={s.weight}>
                  Your weight in kilograms:
                  <Field
                    className={s.input}
                    type="input"
                    name="weightValue"
                    onFocus={() => handleFocus("weightValue")}
                    onBlur={() => handleBlur("weightValue")}
                    onChange={(e) =>
                      handleFieldChange("weightValue", e.target.value)
                    }
                  />
                  <ErrorMessage
                    className={s.error}
                    name="weightValue"
                    component="span"
                  />
                </label>

                <label className={s.time}>
                  The time of active participation in sports or other activities
                  with a high physical. load in hours:
                  <Field
                    className={s.input}
                    type="input"
                    name="timeValue"
                    onFocus={() => handleFocus("timeValue")}
                    onBlur={() => handleBlur("timeValue")}
                    onChange={(e) =>
                      handleFieldChange("timeValue", e.target.value)
                    }
                  />
                  <ErrorMessage
                    className={s.error}
                    name="timeValue"
                    component="span"
                  />
                </label>

                <div>
                  <p className={s.requiredAmount}>
                    The required amount of water in liters per day:{" "}
                    <span className={s.volume}>{waterVolume.toFixed(1)} L</span>
                  </p>
                </div>

                <label className={s.dailyNorma}>
                  Write down how much water you will drink:
                  <Field
                    className={s.input}
                    type="input"
                    name="dailyNorma"
                    // value={newRate}
                    step="0.1"
                    onFocus={() => handleFocus("dailyNorma")}
                    onBlur={() => handleBlur("dailyNorma")}
                    onChange={(e) =>
                      handleFieldChange(
                        "dailyNorma",
                        e.target.value
                        // setNewRate(e.target.value)
                      )
                    }
                  />
                  <ErrorMessage
                    className={s.error}
                    name="dailyNorma"
                    component="span"
                  />
                </label>

                <div className={s.btnWrap}>
                  {isLoading && <Loader />}
                  <button className={s.saveButton} type="submit">
                    {" "}
                    Save{" "}
                  </button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
}
