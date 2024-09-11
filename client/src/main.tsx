import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { CustomProvider } from "rsuite";

import App from "./App.tsx";
import "./index.css";
import "rsuite/dist/rsuite.min.css"; // or 'rsuite/styles/index.less';

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CustomProvider>
      <App />
    </CustomProvider>
  </StrictMode>
);
