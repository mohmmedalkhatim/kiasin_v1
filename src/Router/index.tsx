import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import Area from "../pages/area";
import App from "../App";
import Databases from "../pages/sheets";
import MainPage from "../pages/main";


export let router = createBrowserRouter(
    createRoutesFromElements(
        <Route element={<App />}>
            <Route path="/" index element={<MainPage/> } />
            <Route path="/databases" index element={<Databases />} />
            <Route path="/area/:id" element={<Area />} />
        </Route>
    )
)