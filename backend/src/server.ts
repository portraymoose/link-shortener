import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

import linkRoutes from "./routes/linkRoutes";
import redirectRoutes from "./routes/redirectRoutes";
import statsRoutes from "./routes/statsRoutes";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", linkRoutes);
app.use("/", redirectRoutes);
app.use("/api", statsRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
