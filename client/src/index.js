import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { createStore } from "redux";
import { Provider } from "react-redux";
import myReducers from "./context/reducers";

//here we are using create store method, but in the latest version they are using configure store and using slice and redux toolkit
const myStore = createStore(
  myReducers,
  //just for working with react devtool chrome extension we have to confige this
  //so that our state is visible properly in our devtools
  //if we are using redux toolkit and configure store we dont have to metion this
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Router>
      <AnimatePresence>
        <Provider store={myStore}>
          <App />
        </Provider>
      </AnimatePresence>
    </Router>
  </React.StrictMode>
);
