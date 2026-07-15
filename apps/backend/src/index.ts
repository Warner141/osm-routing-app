import express from "express";
import router from "./routes/route-index.js";

const PORT = 8080;

const app = express();
console.log("Backend Initialized");

app.listen(PORT);
app.use("/api/v1", router);
