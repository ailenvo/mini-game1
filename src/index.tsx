import * as React from "react";
import { render } from "react-dom";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import $ from "jquery";
(window as any).jQuery = $;
(window as any).$ = $;
(global as any).jQuery = $;
import App from "./App";

const rootElement = document.getElementById("root");
render(<App />, rootElement);
