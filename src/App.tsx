import { Outlet } from "react-router-dom";
import "./App.css";
import WindowControls from "./components/window_controller";

function App() {
  return (
    <main className="container ">
      <WindowControls title="kiasin"/>
      <Outlet/>
    </main>
  );
}

export default App;
