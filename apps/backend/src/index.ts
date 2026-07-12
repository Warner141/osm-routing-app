import express from "express";
const app = express();
console.log("Backend Initialized");

app.get("/api/", (req, res) => {
  res.send("Test");
});
