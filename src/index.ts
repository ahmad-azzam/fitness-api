import App from "./App";
import dotenv from "dotenv";

dotenv.config();

const port = (process.env.PORT || 8000) as number;

const app = new App();

app.start(port);
