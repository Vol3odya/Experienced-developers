import DailyNorma from "../../components/DailyNorma/DailyNorma";
import MonthStatsTable from "../../components/MonthStatsTable/MonthStatsTable";
import TodayWaterList from "../../components/TodayWaterList/TodayWaterList";
import WaterRatioPanel from "../../components/WaterRatioPanel/WaterRatioPanel";
import { getWaterFromToday } from "../../redux/todayWaterList/operations.js";
import { fetchUser } from "../../redux/user/operations";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import css from "./HomePage.module.css";

export default function HomePage() {


  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser());
    dispatch(getWaterFromToday());
  }, [dispatch]);


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
