import express from "express";
import cors from "cors";
import constituentRoutes from "./routes/constituent.routes";

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.use("/api/constituents", constituentRoutes);

app.listen(port, () => {
  console.log(`Backend service running at http://localhost:${port}`);
});
