import React from "react";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

const AlertComp = (props) => {
  return (
    <>
      <Stack
        sx={{ width: "100%", zIndex: "9999", position: "relative" }}
        spacing={2}
      >
        {props.alert && (
          <Alert severity={props.alert.type}>
            <AlertTitle>{props.alert.msg}</AlertTitle>
          </Alert>
        )}
      </Stack>
    </>
  );
};

export default AlertComp;
