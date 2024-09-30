import { Route, Routes } from "react-router-dom";
import { EventBoard } from "./EventBoard/EventBoard";
import { EventRegistrationPage } from "../pages/EventRegistrationPage";
import { ParticipantList } from "./ParticipantList/ParticipantList";
import style from "./App.module.css"

export const App = () => {
  return (
    <div className={style.mainWrapper}>
      <Routes>
        <Route path="/" element={<EventBoard />} />
        <Route path="/register/:eventId" element={<EventRegistrationPage />} />
        <Route path="/participants/:eventId" element={<ParticipantList />} />
      </Routes>
    </div>
  );
};


