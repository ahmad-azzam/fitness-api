import App from "./App";
import dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT || 8000;

const app = new App().app;

app.listen(port, () => {
  console.log(`server listening on port localhost:${port}`);
});
