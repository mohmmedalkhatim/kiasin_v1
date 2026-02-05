import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./Router";
import { Provider } from "react-redux";
import "./index.css";
import { store } from "./contexts/store";
import gsap from 'gsap';
import Lenis from 'lenis';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { load } from '@tauri-apps/plugin-store';
import Database from '@tauri-apps/plugin-sql';



export let DB: Database;

let root = document.getElementById("root") as HTMLElement

(async () => {
  DB = await Database.load(`sqlite:Database/test.db`);
  if (DB) {
    ReactDOM.createRoot(root).render(
      <React.StrictMode>
        <Provider store={store}>
          <RouterProvider router={router} />
        </Provider>
      </React.StrictMode>,
    );
  }
})()

const lenis = new Lenis({});

export const storage = load("event.json");


lenis.on('scroll', ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 3000);
});


gsap.ticker.lagSmoothing(0);

gsap.registerPlugin(ScrollTrigger);

