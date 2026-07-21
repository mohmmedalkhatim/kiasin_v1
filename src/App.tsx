import { Outlet } from "react-router-dom";
import "./App.css";
import WindowControls from "./components/window_controller";
import Navbar from "./components/navbar";
import { useEffect } from "react";
import excel, { Workbook } from "exceljs"

function App() {
  useEffect(() => {
   let work = new Workbook()
   work.csv.read("")
  }, [])
  return (
    <main className="bg-dark-900 min-h-screen ">
      <WindowControls title="kiasin" />
      <div className="app_container relative">
        <Outlet />
      </div>
      <Navbar />
    </main>
  );
}

export default App;
