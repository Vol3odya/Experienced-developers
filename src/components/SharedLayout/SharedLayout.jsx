import Header from "../Header/Header";
import { Suspense } from "react";

export default function SharedLayout({ children }) {
  return (
    <div>
      <Header />
      <Suspense fallback={null}>{children}</Suspense>
    </div>
  );
}
