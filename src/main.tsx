import ReactDOM from "react-dom/client";

import { App as App1_plain_object } from "./App1_plain_object";
import { App as App2_action_type } from "./App2_action_type";
import { App as App3_createAction } from "./App3_createAction";
import { App as App4_createReducer } from "./App4_createReducer";
import { App as App5_createSlice } from "./App5_createSlice";
import { App as App6_configureStore } from "./App6_configureStore";

import { App as Fetch1_Redux_Thunk } from "./Fetch1_Redux_Thunk";
import { App as Fetch2_createAsyncThunk } from "./Fetch2_createAsyncThunk";
import { App as Fetch3_RTK_Query } from "./Fetch3_RTK_Query";

const root = document.getElementById("root");

if (root) {
  ReactDOM.createRoot(root).render(
    <>
      <div>
        <h1>Simple Redux</h1>
        App1: plain_object
        <App1_plain_object />
        App2: action_type
        <App2_action_type />
        App3: createAction
        <App3_createAction />
        App4: createReducer
        <App4_createReducer />
        App5: createSlice
        <App5_createSlice />
        App6: configureStore
        <App6_configureStore />
      </div>
      <div>
        <h1>Fetch with Redux</h1>
        Fetch1: Redux_Thunk
        <Fetch1_Redux_Thunk />
        Fetch2: createAsyncThunk
        <Fetch2_createAsyncThunk />
        Fetch3: RTK_Query
        <Fetch3_RTK_Query />
      </div>
    </>
  );
}
