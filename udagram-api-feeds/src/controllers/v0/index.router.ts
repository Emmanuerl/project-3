import { FeedRouter } from "./feed/routes/feed.router";
import { Router } from "express";

const router: Router = Router();

router.use("/feed", FeedRouter);

export const IndexRouter: Router = router;
