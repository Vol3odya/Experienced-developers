import DailyNorma from "../../components/DailyNorma/DailyNorma";
import MonthStatsTable from "../../components/MonthStatsTable/MonthStatsTable";
import TodayWaterList from "../../components/TodayWaterList/TodayWaterList";
import WaterRatioPanel from "../../components/WaterRatioPanel/WaterRatioPanel";
import TodayListModal from "../../components/TodayListModal/TodayListModal";

import css from "./HomePage.module.css";

export default function HomePage() {
  return (
    <div className={css.container}>
      <DailyNorma />
      <WaterRatioPanel />
      <TodayWaterList />
      <MonthStatsTable />
      <TodayListModal />
    </div>
  );
}
