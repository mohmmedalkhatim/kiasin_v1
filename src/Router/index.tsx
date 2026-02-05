import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import Area from "../pages/area";
import App from "../App";
import AreasList from "../pages/area/areas_list";
import Databases from "../pages/Databases";


export let router = createBrowserRouter(
    createRoutesFromElements(
        <Route element={<App />}>
            <Route path="/" index element={<AreasList />} />
            <Route path="/databases" index element={<Databases />} />
            <Route path="/area/:id" element={<Area />} />
        </Route>
    )
)