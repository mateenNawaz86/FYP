import React from "react";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

const AlertComp = (props) => {
  return (
    <>
      <Alert severity={props.alertType}>
        <AlertTitle>{props.title}</AlertTitle>
        {props.message}
      </Alert>
    </>
  );
};

export default AlertComp;
