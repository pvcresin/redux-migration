import ReactDOM from "react-dom/client";

import AppOld from "./AppOld";
import App from "./App";

const root = document.getElementById("root");

if (root) {
  ReactDOM.createRoot(root).render(
    <>
      <AppOld />
      <App />
    </>
  );
}
