const express = require("express");
const fs = require("fs");

const app = express();
const PORT = 3000;

function logRequest(method, url) {
  const time = new Date().toISOString().replace("T", " ").split(".")[0];
  fs.appendFileSync("logs.txt", `[${time}] ${method} ${url}\n`);
}

app.get("/visit", (req, res) => {
  logRequest(req.method, req.url);

  let count = 0;

  if (fs.existsSync("visits.txt")) {
    count = parseInt(fs.readFileSync("visits.txt", "utf-8")) || 0;
  }

  count += 1;
  fs.writeFileSync("visits.txt", count.toString());

  res.send(`Visit Count: ${count}`);
});

app.get("/count", (req, res) => {
  logRequest(req.method, req.url);

  if (!fs.existsSync("visits.txt")) {
    return res.send("No Visits Recorded");
  }

  const count = fs.readFileSync("visits.txt", "utf-8");
  res.send(`Total Visits: ${count}`);
});

app.get("/reset", (req, res) => {
  logRequest(req.method, req.url);

  fs.writeFileSync("visits.txt", "0");
  res.send("Visit Counter Reset Successfully");
});

app.use((req, res) => {
  logRequest(req.method, req.url);
  res.status(404).send("404 Route Not Found");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});