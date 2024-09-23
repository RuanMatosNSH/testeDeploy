import { Router } from "express";
import {
  occCollectionOpenedController,
  occProductOpenedController,
  occSendWishlistController,
  occSendFormRequestController,
  occSendOrderResponsysController,
} from "../controllers";

const router = Router();

router.post("/productOpened", occProductOpenedController);
router.post("/collectionOpened", occCollectionOpenedController);
router.post("/sendWishlist", occSendWishlistController);
router.post("/sendFormRequest", occSendFormRequestController);
router.post("/sendOrderResponsysWebhook", occSendOrderResponsysController);

export default router;
