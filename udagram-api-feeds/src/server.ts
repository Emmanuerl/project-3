import { IndexRouter } from "./controllers/v0/index.router";
import { V0_FEED_MODELS } from "./controllers/v0/model.index";
import cors from "cors";
import express from "express";
import morgan from "morgan";
import { sequelize } from "./sequelize";

(async () => {
  sequelize.addModels(V0_FEED_MODELS);

  console.debug("Initialize database connection...");
  await sequelize.sync();

  const app = express();
  const port = +process.env.PORT || 8080;

  app.use(express.json());

  app.use(
    morgan(function (tokens, req, res) {
      return [
        `METHOD::: ${tokens.method(req, res)}`,
        `URL::: ${tokens.url(req, res)}`,
        `STATUS::: ${tokens.status(req, res)}`,
        `CONTENT-LENGTH::: ${tokens.res(req, res, "content-length")}`,
        `DURATION::: ${tokens["response-time"](req, res)}ms`,
        `REQUEST ID::: ${Date.now()}`,
      ].join("\t");
    })
  );

  // We set the CORS origin to * so that we don't need to
  // worry about the complexities of CORS this lesson. It's
  // something that will be covered in the next course.
  app.use(
    cors({
      allowedHeaders: [
        "Origin",
        "X-Requested-With",
        "Content-Type",
        "Accept",
        "X-Access-Token",
        "Authorization",
      ],
      methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
      preflightContinue: true,
      origin: "*",
    })
  );

  app.use("/api/v0/", IndexRouter);

  // Start the Server
  app.listen(port, () => {
    console.log(`server running on port ${port}`);
  });
})();
