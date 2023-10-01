import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

//contexts
import { ModalProvider, UserProvider } from "./contexts";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserProvider>
      <ModalProvider>
        <App />
      </ModalProvider>
    </UserProvider>
  </React.StrictMode>
);
