import css from "./WhyDrinkWater.module.css";

export default function WhyDrinkWater() {
  return (
    <div className={css.background}>
      <p className={css.title}>Why drink water</p>
      <ul className={css.list}>
        <li className={css.item}>Supply of nutrients to all organs</li>
        <li className={css.item}>Providing oxygen to the lungs</li>
        <li className={css.item}>Maintaining the work of the heart</li>
        <li className={css.item}>Release of processed substances</li>
        <li className={css.item}>
          Ensuring the stability of the internal environment
        </li>
        <li className={css.item}>Maintaining within the normal temperature</li>
        <li className={css.item}>
          Maintaining an immune system capable of resisting disease
        </li>
      </ul>
    </div>
  );
}
