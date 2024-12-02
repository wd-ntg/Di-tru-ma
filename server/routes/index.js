import express from "express";

import controller from "../controller/index.js";

const router = express.Router();

const initRouter = (app) => {
  router.post("/fibonacci", controller.caculatorFibonacci);
  router.post("/factorial", controller.caculatorFactorial);
  router.post("/primenumbers", controller.caculatorPrimeNumbers);
  app.use("/api/caculator", router);
};

export default initRouter;