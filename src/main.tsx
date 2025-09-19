import ReactDOM from "react-dom/client";

import { App as App1 } from "./App1";
import { App as App2 } from "./App2";
import { App as App3 } from "./App3";
import { App as App4 } from "./App4";
import { App as AppNew } from "./AppNew";

const root = document.getElementById("root");

if (root) {
  ReactDOM.createRoot(root).render(
    <>
      <div>
        <h1>Simple Redux</h1>
        App1
        <App1 />
        App2
        <App2 />
        App3
        <App3 />
        App4
        <App4 />
        AppNew
        <AppNew />
      </div>
      <div>
        <h1>fetch Data with Redux</h1>
      </div>
    </>
  );
}
