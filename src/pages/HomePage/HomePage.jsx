import DailyNorma from "../../components/DailyNorma/DailyNorma";
import MonthStatsTable from "../../components/MonthStatsTable/MonthStatsTable";
import TodayWaterList from "../../components/TodayWaterList/TodayWaterList";
import WaterRatioPanel from "../../components/WaterRatioPanel/WaterRatioPanel";

import css from "./HomePage.module.css";

export default function HomePage() {
  return (
    <div className={css.container_photo}>
      <div className={`${css.container} ${css.body}`}>
        <div>
          <DailyNorma />
          <WaterRatioPanel className={css.ratio} />
        </div>
        <div className={css.calendar}>
          <TodayWaterList />
          <MonthStatsTable />
        </div>
      </div>
    </div>
  );
}
