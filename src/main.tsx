import ReactDOM from "react-dom/client";

import App1 from "./App1";
import App2 from "./App2";
import AppSlice from "./AppSlice";

const root = document.getElementById("root");

if (root) {
  ReactDOM.createRoot(root).render(
    <>
      App1
      <App1 />
      App2
      <App2 />
      AppSlice
      <AppSlice />
    </>
  );
}
