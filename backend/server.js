const express = require("express");
const path = require("path");

const sqlRoutes = require("./routes/sql");

const app = express();

app.use(express.json());

app.use(express.static(path.join(__dirname, "../frontend")));

app.use("/api", sqlRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
