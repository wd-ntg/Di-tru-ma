import { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import StaticMigration from "./pages/StaticMigration";
import DynamicMigration from "./pages/DynamicMigration";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StaticMigration />} />
        <Route path="/dynamic" element={<DynamicMigration />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
