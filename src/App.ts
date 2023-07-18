import express, { Application, NextFunction } from "express";
import AuthRouter from "./router/public/auth/AuthRouter";
import ErrorMiddleware from "./middlewares/errors";

class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.plugins();
    this.setupRoutes();
    this.setupErrorHandler();
  }

  protected plugins = () => {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  };

  protected setupRoutes = () => {
    this.app.use("/api/v1", AuthRouter);
  };

  protected setupErrorHandler = () => {
    this.app.use(ErrorMiddleware.errorHandler);
  };
}

export default App;
