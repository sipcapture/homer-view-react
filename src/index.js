import React from "react";
import { createRoot } from "react-dom/client";

import App from "./App";

const ROOT = document.getElementById("root");

// React 18 replaced ReactDOM.render with the createRoot API.
createRoot(ROOT).render(<App />);