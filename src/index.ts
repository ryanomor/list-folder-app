import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import path from "path";

dotenv.config();

/* istanbul ignore next */
if (!process.env.PORT) {
  process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

export const server = app.listen(PORT, () => {});

app.use(express.static(path.join(__dirname, "../public")));
