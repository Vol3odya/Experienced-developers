import WhyDrinkWater from "../../components/WhyDrinkWater/WhyDrinkWater.jsx";
import WaterConsumptionTracker from "../../components/WaterСonsumptionTracker/WaterСonsumptionTracker.jsx";
import css from "./WelcomePage.module.css";

export default function WelcomePage() {
  return (
    <div className={css.background}>
      <div className={css.container}>
        <div className={css.wrap}>
          <WaterConsumptionTracker />
          <WhyDrinkWater />
        </div>
      </div>
    </div>
  );
}
