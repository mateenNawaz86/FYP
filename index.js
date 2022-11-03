const express = require("express");

const app = express();
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`FYP server listening on port ${port}`);
});
