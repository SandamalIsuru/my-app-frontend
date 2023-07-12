import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'react-tooltip/dist/react-tooltip.css';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

const root = ReactDOM.createRoot(document.getElementById('root'));

const theme = createTheme({
  components: {
    MuiPopover: {
      defaultProps: {
        container: root,
      },
    },
    MuiPopper: {
      defaultProps: {
        container: root,
      },
    },
  },
});
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
