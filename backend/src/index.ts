import express from "express";
import cors from "cors";

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ status: "Backend is up and running!" });
});

app.listen(port, () => {
  console.log(`Backend server running at http://localhost:${port}`);
});
