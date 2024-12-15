import { lazy, Suspense, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import css from './App.module.css';
import Header from '../Header/Header';

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <div className={css.container}>
      <Header />
      <p>csfdddsff</p>
    </div>
  );
}
