import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./Router";
import { Provider } from "react-redux";
import "./index.css";
import { store } from "./contexts/store";
import { DraggableHeader } from "./events/drag_handlers";




// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new DraggableHeader('window_header');
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
);
