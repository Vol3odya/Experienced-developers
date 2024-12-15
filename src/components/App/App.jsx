import { lazy, Suspense, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import css from "./App.module.css";
import SettingModal from "../SettingModal/SettingModal";

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const userData = {
    photo: "",
    gender: "Man",
    name: "David",
    email: "david01@gmail.com",
  };

  return (
    <div>
      <button onClick={() => setIsModalOpen(true)}>Open Modal</button>
      {isModalOpen && (
        <SettingModal
          userData={userData}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default App;
