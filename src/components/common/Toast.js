import { makeStyles } from '@mui/styles';
import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const useStyles = makeStyles(() => ({
  // Toast styles can be updated here
  root: {},
}));

const Toast = () => {
  const classes = useStyles();
  return (
    <div>
      <ToastContainer className={classes.root} />
    </div>
  );
};

export default Toast;
