import Header from "../Header/Header";
import { Suspense } from "react";
import { useSelector } from "react-redux";
import { selectIsRefresh } from "../../redux/auth/selectors"; 
import Loader from "../Loader/Loader"; 
import css from "./SharedLayout.module.css";

export default function SharedLayout({ children }) {
  const isRefreshing = useSelector(selectIsRefresh);

  return (
    <div className={css.layout}>
      <Header />
      {isRefreshing && (
        <div className={css.loaderOverlay}>
          <Loader />
        </div>
      )}
      <Suspense fallback={<Loader />}>{children}</Suspense>
    </div>
  );
}
