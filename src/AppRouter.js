import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import App from "./App";
import Join from "./components/Join";
import Login from "./components/Login";
import TodoInsert from "./components/TodoInsert";

const AppRouter = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/todo" element={<App />} />
          <Route path="/join" element={<Join />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default AppRouter;
