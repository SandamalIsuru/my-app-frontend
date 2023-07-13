import React, { useEffect } from "react";
import { AppContextProvider } from "./appContexts";
import AppRoutes from "./config/Routes";
import { light } from "./themes";
import { applyTheme } from "./themes/utils";

function App() {
  useEffect(() => {
    applyTheme(light);
  }, []);

  return (
    <AppContextProvider>
      <AppRoutes />
    </AppContextProvider>
  );
}

export default App;
