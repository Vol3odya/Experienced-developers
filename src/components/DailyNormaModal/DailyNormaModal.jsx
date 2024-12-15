import s from "./DailyNormaModal.module.css";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";

// className={s. }

export default function DailyNormaModal() {
  const initialValues = {
    sex: "female",
    weightValue: "0",
    timeValue: "0",
    dailyNorma: "2.0",
  };

  const validationSchema = Yup.object({
    weightValue: Yup.number()
      .required("Weight is required")
      .positive("Weight must be positive")
      .integer("Weight must be an integer"),
    timeValue: Yup.number()
      .required("Time is required")
      .positive("Time must be positive"),
    dailyNorma: Yup.number()
      .required("Your dayily norma is required")
      .positive("Dayily norma must be positive"),
  });

  return (
    <div>
      <div className={s.modal}>
        <div className={s.top}>
          <h3 className={s.head}>My daily norma</h3>
          <button></button>
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
          initialValues={initialValues}
          validationSchema={validationSchema}
          // onSubmit={handleSubmit}
          onSubmit={(values) => {
            console.log("Выбранное значение:", values);
          }}
        >
          <Form>
            <div className={s.radio}>
              <label>
                <Field
                  className={s.radioBtn}
                  type="radio"
                  name="sex"
                  value="female"
                />
                For woman
              </label>
              <label>
                <Field
                  className={s.radioBtn}
                  type="radio"
                  name="sex"
                  value="male"
                />
                For man
              </label>
            </div>

            <label className={s.weight}>
              Your weight in kilograms:
              <Field className={s.input} type="input" name="weightValue" />
            </label>

            <label className={s.activity}>
              The time of active participation in sports or other activities
              with a high physical. load in hours:
              <Field className={s.input} type="input" name="timeValue" />
            </label>

            <div>
              <p className={s.requiredAmount}>
                The required amount of water in liters per day:{" "}
                <span className={s.amount}>L</span>
              </p>
            </div>

            <label className={s.dailyNorma}>
              Write down how much water you will drink:
              <Field className={s.input} type="input" name="dailyNorma" />
            </label>
            <button className={s.saveButton} type="submit">
              {" "}
              Save{" "}
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
}
