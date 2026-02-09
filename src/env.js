import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// .env в корне проекта
dotenv.config({ path: path.join(__dirname, "../.env") });

console.log("ENV LOADED -> DEBUG_SKIP:", process.env.DEBUG_SKIP);
