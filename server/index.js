const express = require("express");
const cors = require("cors");
const {basicRouter} = require("./routes/routes");

const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());
app.use("/api/base", basicRouter);

app.listen(port, () => {
    console.log(`Server listening on the port:${port}`);
});

module.exports = app;
