import { Outlet } from "react-router-dom";
import "./App.css";
import WindowControls from "./components/window_controller";
import Navbar from "./components/navbar";

function App() {
  return (
    <main className="bg-dark-900 min-h-screen ">
      <WindowControls title="kiasin" />
      <div className="app_container">
        <Outlet />
      </div>
      <Navbar />
    </main>
  );
}

export default App;
