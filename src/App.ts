import express, { Application } from "express";
import ErrorMiddleware from "./middlewares/errors";
import MainRouter from "./router";
import cors from "cors";
import cookieParser from "cookie-parser";

class App {
  public app: Application;
  protected mainRouter: MainRouter;

  constructor() {
    this.app = express();
    this.mainRouter = new MainRouter();
    this.plugins();
    this.setupRoutes();
    this.setupErrorHandler();
  }

  protected plugins = () => {
    this.app.use(
      cors({ credentials: true, origin: ["http://localhost:3000"] })
    );
    this.app.use(cookieParser());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  };

  protected setupRoutes = () => {
    this.app.use("/api/v1", this.mainRouter.router);
  };

  protected setupErrorHandler = () => {
    this.app.use(ErrorMiddleware.errorHandler);
  };

  public start = (port: number) => {
    this.app.listen(port, () => {
      console.log(`server listening on port localhost:${port}`);
    });
  };
}

export default App;
