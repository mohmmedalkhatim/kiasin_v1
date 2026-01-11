import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import Area from "../pages/area";
import App from "../App";


export let router = createBrowserRouter(
    createRoutesFromElements(
        <Route element={<App />}>
            <Route path="/" index element={<Area />} />
        </Route>
    )
)