import React, { createContext, useState } from 'react';

export const AppContext = createContext(null);

export const AppContextProvider = ({ children }) => {
  const [popup, setPopup] = useState(null);

  return (
    <AppContext.Provider value={{ popup, setPopup }}>
      {children}
    </AppContext.Provider>
  );
};
