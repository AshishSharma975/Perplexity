import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app/App.jsx";
import "./app/index.css";
import { store } from "./app/app.store.js";
import { Provider } from "react-redux";

ReactDOM.createRoot(document.getElementById("root")).render(
    <Provider store={store}>
      <App />
    </Provider>
);