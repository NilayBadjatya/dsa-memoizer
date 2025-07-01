import React from "react";
import { createRoot } from "react-dom/client";
import InjectedWidget from "./components/InjectedWidget";

const container = document.getElementById("dsa-injected-widget-root");
if (container) {
  const root = createRoot(container);
  root.render(<InjectedWidget />);
} 