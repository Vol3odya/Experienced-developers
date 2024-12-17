// import { useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { getWaterFromToday } from "../../redux/todayWaterList/operations.js";

export default function TodayWaterList() {
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getWaterFromToday());
  // }, [dispatch]);

  // const handleDelete = dispatch(delete)

  return (
    <div>
      <h2>Today</h2>
      <p>No notes yet</p>
      <button type="button">Delete</button>
      <button type="button">Add water</button>
    </div>
  );
}